import { useLayoutEffect, useRef, type RefObject } from 'react';

/**
 * Keeps the scroll position when moving to a page too short to scroll that
 * far (e.g. Contact), instead of the browser clamping it back towards the top.
 *
 * A spacer between the content and the footer is given just enough height to
 * hold the position, so the page ends exactly at the viewport's bottom edge
 * with the footer there. As the reader scrolls back up, the spacer shrinks by
 * the same amount, so there's never blank space to scroll into and the
 * footer stays in the flow (it never sits over content). Once the page could
 * have scrolled there by itself, the spacer is gone.
 */

/** The collapsed header's height: content is never scrolled above this */
const HEADER_MIN_HEIGHT = 60;

/**
 * Experimental: after landing on a page that needed room, wait a moment, then
 * glide back up to where the page can scroll by itself (the top, for a page
 * that fits the viewport), revealing the page nav and dropping the room. Any
 * scrolling, key or pointer input from the reader stops it. Skipped entirely
 * when the OS asks for reduced motion: the room stays, and shrinks as usual
 * when the reader scrolls up. `easing` picks a curve from `easings` below.
 */
const SETTLE = {
  enabled: true,
  delayMs: 500,
  durationMs: 2000,
  easing: 'expo',
} satisfies { easing: keyof typeof easings } & Record<string, unknown>;

let spacer: HTMLElement | null = null;
let content: HTMLElement | null = null;
let room = 0;
let lastScrollY = 0;
let pendingScroll: number | null = null;
let pendingSettleTo: number | null = null;
let settleTimer: number | null = null;
let settleFrame: number | null = null;

/**
 * The most pronounced ease-in-out: a very slow start that builds to a quick
 * middle, then a long, soft landing. Pairs with the site's other expo
 * easings (see shared/easing.ts)
 */
const easeInOutExpo = (t: number) => {
  if (t <= 0) {
    return 0;
  }
  if (t >= 1) {
    return 1;
  }
  return t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;
};

/**
 * Follows a quarter circle each way: eases in less sluggishly than expo,
 * builds to a steep middle, then lands with a firmer, shorter tail
 */
const easeInOutCirc = (t: number) =>
  t < 0.5
    ? (1 - Math.sqrt(1 - (2 * t) ** 2)) / 2
    : (Math.sqrt(1 - (-2 * t + 2) ** 2) + 1) / 2;

/**
 * Power curves: the higher the power, the slower the start, the steeper the
 * middle and the softer the landing. Quart (4th) sits between cubic and
 * quint; quint (5th) is the closest of these to expo
 */
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;

const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2;

const easings = {
  quart: easeInOutQuart,
  quint: easeInOutQuint,
  expo: easeInOutExpo,
  circ: easeInOutCirc,
};

const cancelSettle = () => {
  if (settleTimer !== null) {
    window.clearTimeout(settleTimer);
    settleTimer = null;
  }
  if (settleFrame !== null) {
    window.cancelAnimationFrame(settleFrame);
    settleFrame = null;
  }
};

/**
 * Glide to `settleTo` after the delay, or by default (and only when room was
 * needed) to wherever the page can scroll by itself. Without the animation
 * (reduced motion, or settling switched off), an explicit `settleTo` is
 * jumped to straight away, dropping any room; the default case is left as is.
 */
const scheduleSettle = (settleTo: number | null = null) => {
  cancelSettle();
  const animate =
    SETTLE.enabled &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!animate) {
    if (settleTo !== null) {
      scrollToWithRoom(settleTo);
    }
    return;
  }
  if (settleTo === null && room === 0) {
    return;
  }

  settleTimer = window.setTimeout(() => {
    settleTimer = null;
    const from = window.scrollY;
    // Furthest the page could scroll without any room
    const to =
      settleTo ??
      Math.max(
        document.documentElement.scrollHeight - room - window.innerHeight,
        0,
      );
    if (Math.abs(from - to) < 1) {
      return;
    }

    // Room shrinks along the way as each scroll event comes in (see `shrink`)
    const ease = easings[SETTLE.easing];
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / SETTLE.durationMs, 1);
      window.scrollTo({
        top: from + (to - from) * ease(t),
        behavior: 'instant',
      });
      settleFrame = t < 1 ? window.requestAnimationFrame(step) : null;
    };
    settleFrame = window.requestAnimationFrame(step);
  }, SETTLE.delayMs);
};

/** Reader input that should stop a settle that's waiting or under way */
const interruptEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'];

const setRoom = (px: number) => {
  room = Math.max(Math.round(px), 0);
  if (spacer) {
    spacer.style.height = `${room}px`;
  }
};

/** Scroll to `target`, adding just enough room below the content to get there */
export const scrollToWithRoom = (target: number) => {
  const viewport = window.innerHeight;
  const pageHeight = () => document.documentElement.scrollHeight;

  cancelSettle();
  setRoom(0);
  // Never so far that the content starts above the header: room is only for
  // keeping the page's top part where it was, not for scrolling into blank space
  const contentTop = content
    ? content.getBoundingClientRect().top + window.scrollY
    : 0;
  const limit = Math.max(
    pageHeight() - viewport,
    contentTop - HEADER_MIN_HEIGHT,
    0,
  );
  const top = Math.min(Math.max(target, 0), limit);

  // The content area stretches to fill the viewport on short pages, and that
  // stretch would swallow the room, so size the room from the page's height
  // without it
  let stretch = 0;
  if (content) {
    const stretched = content.offsetHeight;
    content.style.flexGrow = '0';
    stretch = stretched - content.offsetHeight;
    content.style.flexGrow = '';
  }
  setRoom(top + viewport - (pageHeight() - stretch));
  window.scrollTo({ top, behavior: 'instant' });
  lastScrollY = top;
};

/**
 * Where the next page should land, if not where we are now (the header nav
 * uses this to land just above the content), and optionally where it should
 * then settle (the logo settles to the top; see `scheduleSettle`)
 */
export const requestScroll = (
  target: number,
  { settleTo = null }: { settleTo?: number | null } = {},
) => {
  pendingScroll = target;
  pendingSettleTo = settleTo;
};

/** Settle the current page to `to`, as a navigation would (see `scheduleSettle`) */
export const settleScroll = (to: number) => {
  scheduleSettle(to);
};

/** Drop any room that's now below the viewport, so it can't be scrolled into */
const shrink = () => {
  lastScrollY = window.scrollY;
  if (room === 0) {
    return;
  }
  const belowViewport =
    document.documentElement.scrollHeight -
    (window.scrollY + window.innerHeight);
  if (belowViewport > 0) {
    setRoom(room - belowViewport);
  }
};

/**
 * Wires up the spacer and content elements. On every page change (before it
 * paints), lands at the requested position or keeps the current one, making
 * room for it if needed.
 */
export const useScrollRoom = (
  spacerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  pathname: string,
) => {
  const isFirstRenderRef = useRef(true);

  useLayoutEffect(() => {
    spacer = spacerRef.current;
    content = contentRef.current;
    // Also note the position as a link is clicked, in case a scroll event
    // hasn't been delivered yet: by the time the next page renders, the
    // browser may already have clamped it
    const rememberScroll = () => {
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', shrink, { passive: true });
    window.addEventListener('resize', shrink);
    document.addEventListener('click', rememberScroll, { capture: true });
    for (const type of interruptEvents) {
      window.addEventListener(type, cancelSettle, {
        capture: true,
        passive: true,
      });
    }
    return () => {
      window.removeEventListener('scroll', shrink);
      window.removeEventListener('resize', shrink);
      document.removeEventListener('click', rememberScroll, { capture: true });
      for (const type of interruptEvents) {
        window.removeEventListener(type, cancelSettle, { capture: true });
      }
      cancelSettle();
      spacer = null;
      content = null;
    };
  }, [spacerRef, contentRef]);

  useLayoutEffect(() => {
    // Leave the first load to the browser and React Router's own restoration
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      lastScrollY = window.scrollY;
      return;
    }
    const target = pendingScroll ?? lastScrollY;
    const settleTo = pendingSettleTo;
    pendingScroll = null;
    pendingSettleTo = null;
    scrollToWithRoom(target);
    scheduleSettle(settleTo);
  }, [pathname]);
};

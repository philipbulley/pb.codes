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

let spacer: HTMLElement | null = null;
let content: HTMLElement | null = null;
let room = 0;
let lastScrollY = 0;
let pendingScroll: number | null = null;

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

  // The content area stretches to fill the viewport on short pages, which
  // absorbs some of the room at first, so top up until the page is tall enough
  for (let i = 0; i < 3; i++) {
    const shortfall = top + viewport - pageHeight();
    if (shortfall <= 0) {
      break;
    }
    setRoom(room + shortfall);
  }
  window.scrollTo({ top, behavior: 'instant' });
  lastScrollY = top;
};

/**
 * Where the next page should land, if not where we are now (the header nav
 * uses this to land just above the content)
 */
export const requestScroll = (target: number) => {
  pendingScroll = target;
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
    return () => {
      window.removeEventListener('scroll', shrink);
      window.removeEventListener('resize', shrink);
      document.removeEventListener('click', rememberScroll, { capture: true });
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
    pendingScroll = null;
    scrollToWithRoom(target);
  }, [pathname]);
};

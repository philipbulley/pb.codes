import { useEffect, useRef, type RefObject } from 'react';
import { Link, useLocation } from 'react-router';
import Grid from '../shared/grid/grid';
import cx from '../shared/cx';
import {
  requestScroll,
  scrollToWithRoom,
  settleScroll,
} from '../shared/scroll-room';
import underline from '../shared/hover-underline.module.css';
import { getActiveNavOffset, navItems } from './nav';
import styles from './header.module.css';

/** Must match `--header-collapse-distance` in header.module.css */
const COLLAPSE_DISTANCE = 80;

/** How long the page nav's own animations run after navigating (see nav.tsx) */
const NAV_SETTLE_MS = 600;

interface HeaderProps {
  /** The page nav, whose position drives when the header's nav appears */
  navRef: RefObject<HTMLElement | null>;
}

/**
 * The header is `position: sticky` with a negative `top`, so it scrolls away
 * naturally until only its minimum height remains visible, then sticks.
 *
 * Two values are written as CSS custom properties every frame the page moves
 * (without re-rendering):
 * - `--collapse`: how far the header has collapsed, keeping the title centred
 *   in the visible part
 * - `--link-offset` (on each header nav link): how far below its rest
 *   position the link sits. Each link mirrors its own page nav link: as that
 *   one slides under the header, this one rises out of the header's bottom
 *   edge by the same share. It follows the scroll's own speed (a flick snaps
 *   it in, a slow scroll eases it in), and the lower, active link naturally
 *   arrives a little later
 */
const Header = ({ navRef }: HeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const headerNavRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  /**
   * The scroll position where the page nav link at `index` has gone fully
   * under the header and its header link has just come to rest: the header
   * nav fully in, the page nav just out of sight and the content starting
   * right below. Scrolling down a pixel more would start the header nav
   * moving. `isActive` says whether that page link will be the active one,
   * which sits lower. The page nav sits in the same place on every page, so
   * this is worked out before navigating.
   */
  const getSnapTarget = (index: number, isActive: boolean) => {
    const el = ref.current;
    const pageNav = navRef.current;
    const item = pageNav?.children[index];
    const pageLink = item?.querySelector('a');
    const headerLink = headerNavRef.current?.querySelectorAll('a')[index];
    if (!el || !pageNav || !item || !pageLink || !headerLink) {
      return null;
    }

    // The page link's top in the document once settled, ignoring its current
    // animation: its item starts at the top of the nav
    const pageTop =
      pageNav.getBoundingClientRect().top +
      window.scrollY +
      (pageLink.getBoundingClientRect().top -
        item.getBoundingClientRect().top) +
      (isActive ? getActiveNavOffset() : 0);

    // Inverse of `update` below: how far under the header the page link must
    // be for the header link to have just reached its rest position, with the
    // header collapsed (as it always is by then)
    const headerTop = -COLLAPSE_DISTANCE;
    const headerBottom = el.offsetHeight - COLLAPSE_DISTANCE;
    const restTop = headerTop + headerLink.offsetTop;
    const hiddenShare = (headerBottom - restTop) / headerLink.offsetHeight;
    const pageTopInView = headerBottom - hiddenShare * pageLink.offsetHeight;

    return Math.ceil(pageTop - pageTopInView);
  };

  // Header links are only reachable once scrolled well down the page, so
  // rather than keep that (possibly deep) position, land on the new page just
  // above its content
  const handleHeaderLinkClick = (index: number, isActive: boolean) => {
    // The clicked link will be the active one on the page it opens
    const target = getSnapTarget(index, true);
    if (target === null) {
      return;
    }
    if (isActive) {
      // Same page: nothing re-renders, so go there now
      scrollToWithRoom(target);
    } else {
      // Applied as the new page renders, before it paints, with room added if
      // the page is too short to scroll that far (see scroll-room.ts)
      requestScroll(target);
    }
  };

  useEffect(() => {
    const el = ref.current;
    const headerNav = headerNavRef.current;
    if (!el || !headerNav) {
      return;
    }

    const update = () => {
      const scrolled = Math.min(Math.max(window.scrollY, 0), COLLAPSE_DISTANCE);
      el.style.setProperty('--collapse', String(scrolled / COLLAPSE_DISTANCE));

      // Each header link pairs with the page nav link in the same position
      const pageLinks = navRef.current?.querySelectorAll('a') ?? [];
      const headerLinks = headerNav.querySelectorAll<HTMLElement>('a');
      const headerRect = el.getBoundingClientRect();

      let anyVisible = false;
      headerLinks.forEach((link, i) => {
        const page = pageLinks[i]?.getBoundingClientRect();
        // Where the link sits at rest, ignoring its transform (its offset
        // parent is the header)
        const restTop = headerRect.top + link.offsetTop;
        const hiddenOffset = headerRect.bottom - restTop;
        if (!page || page.height === 0) {
          link.style.setProperty('--link-offset', `${hiddenOffset}px`);
          return;
        }

        // However much of the page link has gone under the header, the same
        // share of this link shows above the header's bottom edge, top first.
        // It keeps tracking the scroll past that until it reaches its rest
        // position, so every link ends level
        const hiddenShare = Math.max(
          (headerRect.bottom - page.top) / page.height,
          0,
        );
        const top = headerRect.bottom - hiddenShare * link.offsetHeight;
        const offset = Math.min(Math.max(top - restTop, 0), hiddenOffset);
        link.style.setProperty('--link-offset', `${offset}px`);
        anyVisible ||= offset < hiddenOffset;
      });
      // Out of reach while fully hidden: no focus, clicks or screen readers
      headerNav.inert = !anyVisible;
    };

    let frame: number | null = null;
    const scheduleUpdate = () => {
      frame ??= window.requestAnimationFrame(() => {
        frame = null;
        update();
      });
    };

    // After navigating, the page nav's links animate into new positions
    // without the page scrolling, so keep following them until they settle
    let settleFrame: number | null = null;
    const settleUntil = performance.now() + NAV_SETTLE_MS;
    const followSettle = () => {
      update();
      settleFrame =
        performance.now() < settleUntil
          ? window.requestAnimationFrame(followSettle)
          : null;
    };
    followSettle();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      if (settleFrame !== null) {
        window.cancelAnimationFrame(settleFrame);
      }
    };
  }, [navRef, pathname]);

  return (
    <div className={styles.header} ref={ref}>
      <Grid className={styles.grid}>
        <Link
          className={styles.title}
          to="/"
          // Home opens no further down than where the header nav has just come
          // to rest (as the header nav lands; home has no active link), with
          // room if needed, then settles to the top so the bio and nav come
          // into view: glided like Contact's settle, or straight to the top
          // with reduced motion. Scrolling is handled in scroll-room.ts
          // rather than reset by the router
          preventScrollReset
          onClick={() => {
            if (pathname === '/') {
              settleScroll(0);
              return;
            }
            const restPoint = getSnapTarget(0, false) ?? window.scrollY;
            requestScroll(Math.min(window.scrollY, restPoint), {
              settleTo: 0,
            });
          }}
        >
          pb.codes
        </Link>
        <div className={styles.nav} ref={headerNavRef}>
          {navItems.map(({ to, label }, index) => {
            const isActive = pathname.startsWith(to);

            return (
              <Link
                key={to}
                className={cx(
                  styles.navLink,
                  underline.link,
                  isActive ? styles.active : underline.inactive,
                )}
                to={to}
                // Scrolling is handled here instead (see handleHeaderLinkClick)
                preventScrollReset
                onClick={() => {
                  handleHeaderLinkClick(index, isActive);
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </Grid>
    </div>
  );
};

export default Header;

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type MouseEvent,
  type RefObject,
} from 'react';
import { Link, useLocation } from 'react-router';
import Grid from '../shared/grid/grid';
import cx from '../shared/cx';
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
  // Where to scroll once the page a header link points to has rendered
  const pendingScrollRef = useRef<number | null>(null);
  const { pathname } = useLocation();

  /**
   * The scroll position where the page nav link at `index`, once it's the
   * active one, has gone fully under the header and `headerLink` has just
   * come to rest: the header nav fully in, the page nav just out of sight and
   * the content starting right below. The page nav sits in the same place on
   * every page, so this is worked out before navigating.
   */
  const getSnapTarget = (index: number, headerLink: HTMLElement) => {
    const el = ref.current;
    const pageNav = navRef.current;
    const item = pageNav?.children[index];
    const pageLink = item?.querySelector('a');
    if (!el || !pageNav || !item || !pageLink) {
      return null;
    }

    // The page link's top in the document once it settles as the active link,
    // ignoring its current animation: its item starts at the top of the nav
    const pageTop =
      pageNav.getBoundingClientRect().top +
      window.scrollY +
      (pageLink.getBoundingClientRect().top -
        item.getBoundingClientRect().top) +
      getActiveNavOffset();

    // Inverse of `update` below: how far under the header the page link must
    // be for the header link to have just reached its rest position
    const headerRect = el.getBoundingClientRect();
    const restTop = headerRect.top + headerLink.offsetTop;
    const hiddenShare = (headerRect.bottom - restTop) / headerLink.offsetHeight;
    const pageTopInView =
      headerRect.bottom - hiddenShare * pageLink.offsetHeight;

    return Math.ceil(pageTop - pageTopInView);
  };

  // Header links are only reachable once scrolled well down the page, so
  // rather than keep that (possibly deep) position, land on the new page just
  // above its content
  const handleHeaderLinkClick = (
    index: number,
    isActive: boolean,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const target = getSnapTarget(index, event.currentTarget);
    if (isActive && target !== null) {
      // Same page: nothing re-renders, so go there now
      window.scrollTo({ top: target, behavior: 'instant' });
    } else {
      pendingScrollRef.current = target;
    }
  };

  // Before the new page paints, so it never shows at the old scroll position
  useLayoutEffect(() => {
    if (pendingScrollRef.current !== null) {
      window.scrollTo({ top: pendingScrollRef.current, behavior: 'instant' });
      pendingScrollRef.current = null;
    }
  }, [pathname]);

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
        <Link className={styles.title} to="/">
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
                onClick={(event) => {
                  handleHeaderLinkClick(index, isActive, event);
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

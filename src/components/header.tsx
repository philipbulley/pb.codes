import { useEffect, useRef, type RefObject } from 'react';
import { Link, useLocation } from 'react-router';
import Grid from '../shared/grid/grid';
import cx from '../shared/cx';
import underline from '../shared/hover-underline.module.css';
import { navItems } from './nav';
import styles from './header.module.css';

/** Must match `--header-collapse-distance` in header.module.css */
const COLLAPSE_DISTANCE = 80;

/** How long the page nav's own animations run after navigating (see nav.tsx) */
const NAV_SETTLE_MS = 600;

/**
 * How much of a page nav link's extra drop (the active one sits lower) delays
 * its header link: 0 = all rise together, 1 = each waits for its own page link
 */
const NAV_STAGGER = 0.5;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

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
 * - `--link-reveal` (on each header nav link): how far the page nav has slid
 *   under the header. Each link rises into place in step with it, so it
 *   follows the scroll's own speed: a flick snaps it in, a slow scroll eases
 *   it in
 */
const Header = ({ navRef }: HeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const headerNavRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

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
      const pageRects = [...(navRef.current?.querySelectorAll('a') ?? [])].map(
        (link) => link.getBoundingClientRect(),
      );
      const headerLinks = headerNav.querySelectorAll<HTMLElement>('a');
      const top = Math.min(...pageRects.map((rect) => rect.top));
      const bottom = Math.max(...pageRects.map((rect) => rect.bottom));
      const headerBottom = el.getBoundingClientRect().bottom;

      // Every link finishes (1) once the last page link is under the header,
      // so they always end level. Each starts (0) once its own page link
      // begins to go under, scaled by NAV_STAGGER: the lower, active link
      // starts a little later and catches up
      let anyRevealed = false;
      headerLinks.forEach((link, i) => {
        const pageTop = pageRects[i]?.top ?? top;
        const start = top + (pageTop - top) * NAV_STAGGER;
        const reveal =
          bottom > start
            ? clamp01((headerBottom - start) / (bottom - start))
            : 0;
        link.style.setProperty('--link-reveal', String(reveal));
        anyRevealed ||= reveal > 0;
      });
      // Out of reach while fully hidden: no focus, clicks or screen readers
      headerNav.inert = !anyRevealed;
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
          {navItems.map(({ to, label }) => {
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
                preventScrollReset
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

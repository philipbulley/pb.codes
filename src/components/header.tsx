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
 * - `--nav-reveal`: how far the page nav has slid under the header. The
 *   header's nav rises into place in step with it, so it follows the scroll's
 *   own speed: a flick snaps it in, a slow scroll eases it in
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

      // From the page nav's top edge meeting the header's bottom edge (0) to
      // its last link disappearing under it (1)
      const links = navRef.current?.querySelectorAll('a') ?? [];
      let top = Infinity;
      let bottom = -Infinity;
      for (const link of links) {
        const rect = link.getBoundingClientRect();
        top = Math.min(top, rect.top);
        bottom = Math.max(bottom, rect.bottom);
      }
      const headerBottom = el.getBoundingClientRect().bottom;
      const reveal =
        bottom > top ? clamp01((headerBottom - top) / (bottom - top)) : 0;
      el.style.setProperty('--nav-reveal', String(reveal));
      // Out of reach while fully hidden: no focus, clicks or screen readers
      headerNav.inert = reveal === 0;
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

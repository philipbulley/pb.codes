import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Grid from '../shared/grid/grid';
import styles from './header.module.css';

/** Must match `--header-collapse-distance` in header.module.css */
const COLLAPSE_DISTANCE = 80;

/**
 * The header is `position: sticky` with a negative `top`, so it scrolls away
 * naturally until only its minimum height remains visible, then sticks. Scroll
 * progress is written to `--collapse` (without re-rendering) so the title stays
 * centred within the visible part of the header as it collapses.
 */
const Header = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    let frame: number | null = null;
    const update = () => {
      frame = null;
      const scrolled = Math.min(Math.max(window.scrollY, 0), COLLAPSE_DISTANCE);
      el.style.setProperty('--collapse', String(scrolled / COLLAPSE_DISTANCE));
    };
    const handleScroll = () => {
      frame ??= window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className={styles.header} ref={ref}>
      <Grid className={styles.grid}>
        <Link className={styles.link} to="/">
          pb.codes
        </Link>
      </Grid>
    </div>
  );
};

export default Header;

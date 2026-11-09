import type { Ref } from 'react';
import { Link } from 'react-router';
import { motion, type Variants } from 'motion/react';
import Grid from '../shared/grid/grid';
import cx from '../shared/cx';
import { easeOutExpo } from '../shared/easing';
import { matches, minWidth } from '../shared/media';
import underline from '../shared/hover-underline.module.css';
import styles from './nav.module.css';

/** The site's sections, shared by this nav and the header's compact nav */
export const navItems = [
  { to: '/projects', label: 'Projects.' },
  { to: '/about', label: 'About.' },
  { to: '/contact', label: 'Contact.' },
];

interface NavProps {
  currentPath: string;
  /** The header measures this to know when the nav has scrolled under it */
  ref?: Ref<HTMLDivElement>;
}

const Nav = ({ currentPath, ref }: NavProps) => (
  <Grid className={styles.grid} ref={ref}>
    {navItems.map(({ to, label }) => {
      const isActive = currentPath.startsWith(to);

      return (
        <motion.div
          key={to}
          className={styles.item}
          variants={navItemVariants}
          initial="init"
          animate={isActive ? 'active' : 'inactive'}
        >
          <Link
            className={cx(
              styles.link,
              underline.link,
              !isActive && underline.inactive,
            )}
            to={to}
            // Keep the reader where they are (and the header as collapsed as
            // it was) when switching sections, rather than jumping to the top
            preventScrollReset
          >
            {label}
            <motion.div
              className={styles.underline}
              variants={underlineVariants}
            />
          </Link>
        </motion.div>
      );
    })}
  </Grid>
);

export default Nav;

/**
 * How far a link that becomes active from now will drop below the others,
 * for the current viewport width. Browser only (reads the viewport width)
 */
export const getActiveNavOffset = () => (matches(minWidth.sm) ? 50 : 0);

/**
 * The drop the current active link actually has (or is animating to). It's
 * chosen once when its animation starts and kept if the viewport is later
 * resized across the breakpoint, so this can differ from getActiveNavOffset
 */
let activeOffset: number | null = null;
export const getCurrentActiveNavOffset = () =>
  activeOffset ?? getActiveNavOffset();

const navItemTransition = { ease: easeOutExpo, duration: 0.5 };
const navItemVariants: Variants = {
  init: {
    y: 0,
    opacity: 0,
  },
  // Resolved when the animation starts, so `matches` only runs in the browser
  active: () => {
    activeOffset = getActiveNavOffset();
    return {
      y: activeOffset,
      opacity: 1,
      transition: navItemTransition,
    };
  },
  inactive: {
    y: 0,
    opacity: 1,
    transition: navItemTransition,
  },
};

const underlineTransition = { ease: easeOutExpo, duration: 5 };
const underlineVariants: Variants = {
  active: { width: '100%', transition: underlineTransition },
  inactive: { width: 0, transition: { duration: 0 } },
};

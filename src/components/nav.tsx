import { Link } from 'react-router';
import { motion, type Variants } from 'motion/react';
import Grid from '../shared/grid/grid';
import cx from '../shared/cx';
import { easeOutExpo } from '../shared/easing';
import { matches, minWidth } from '../shared/media';
import styles from './nav.module.css';

const items = [
  { to: '/projects', label: 'Projects.' },
  { to: '/about', label: 'About.' },
  { to: '/contact', label: 'Contact.' },
];

const Nav = ({ currentPath }: { currentPath: string }) => (
  <Grid className={styles.grid}>
    {items.map(({ to, label }) => {
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
            className={cx(styles.link, !isActive && styles.inactive)}
            to={to}
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

const navItemTransition = { ease: easeOutExpo, duration: 0.5 };
const navItemVariants: Variants = {
  init: {
    y: 0,
    opacity: 0,
  },
  // Resolved when the animation starts, so `matches` only runs in the browser
  active: () => ({
    y: matches(minWidth.sm) ? 50 : 0,
    opacity: 1,
    transition: navItemTransition,
  }),
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

import type { ComponentProps } from 'react';
import { motion, type Variants } from 'motion/react';
import Grid from '../shared/grid/grid';
import styles from './home.module.css';

const IndexPage = () => (
  <motion.div
    className={styles.container}
    variants={containerVariants}
    initial="init"
    animate="show"
  >
    <Grid>
      <Paragraph>
        <span className={styles.badge}>Latest</span>
        NatWest — Mettle
      </Paragraph>

      <Paragraph>Loves web app dev and user interface</Paragraph>

      <Paragraph>
        <a href="mailto:hello@pb.codes">hello@pb.codes</a>
      </Paragraph>
    </Grid>
  </motion.div>
);

export default IndexPage;

/**
 * Two timings for the columns' entrance:
 * - slow, for a fresh visit: a pause, then each column fading in in turn
 * - quick (the Contact page's links' timing), when arriving from another page
 *   further down the page, so the columns are in place as it settles back up
 *   to the top (see shared/scroll-room.ts)
 */
const timings = {
  slow: {
    delayChildren: 1,
    staggerChildren: 0.5,
    transition: { type: 'tween', duration: 1 },
  },
  quick: {
    delayChildren: 0,
    staggerChildren: 0.1,
    // Motion's default for opacity, which Contact's links use, applied to the
    // nudge as well (motion would otherwise spring it)
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.35, 1] },
  },
} as const;

// Variants written as functions are resolved as the entrance starts, after the
// page has been scrolled into place, so this sees where the page landed
const getTiming = () => (window.scrollY > 0 ? timings.quick : timings.slow);

const containerVariants: Variants = {
  init: {},
  // Delay lives here rather than on the children: in motion a child's own
  // `delay` replaces its stagger offset instead of adding to it
  show: () => {
    const { delayChildren, staggerChildren } = getTiming();
    return { transition: { delayChildren, staggerChildren } };
  },
};

const paragraphVariants: Variants = {
  init: {
    opacity: 0,
    y: '-5px',
  },
  show: () => ({
    opacity: 1,
    y: '0px',
    transition: getTiming().transition,
  }),
};

const Paragraph = (props: ComponentProps<typeof motion.p>) => (
  <motion.p
    className={styles.paragraph}
    variants={paragraphVariants}
    {...props}
  />
);

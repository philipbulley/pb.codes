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

const containerVariants: Variants = {
  init: {},
  // Delay lives here rather than on the children: in motion a child's own
  // `delay` replaces its stagger offset instead of adding to it
  show: { transition: { delayChildren: 1, staggerChildren: 0.5 } },
};

const paragraphVariants: Variants = {
  init: {
    opacity: 0,
    y: '-5px',
  },
  show: {
    opacity: 1,
    y: '0px',
    transition: { type: 'tween', duration: 1 },
  },
};

const Paragraph = (props: ComponentProps<typeof motion.p>) => (
  <motion.p
    className={styles.paragraph}
    variants={paragraphVariants}
    {...props}
  />
);

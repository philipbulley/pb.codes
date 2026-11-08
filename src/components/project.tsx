import type { ComponentProps } from 'react';
import { motion, type Variants } from 'motion/react';
import cx from '../shared/cx';
import styles from './project.module.css';

const Project = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cx(styles.project, className)} {...props} />
);
export default Project;

export const Heading = (props: ComponentProps<'h2'>) => (
  <h2 className={styles.heading} {...props} />
);

const fade: Variants = {
  out: { opacity: 0 },
  in: { opacity: 1 },
};

/**
 * Wraps a project's content and fades its children in, one after another,
 * whenever it scrolls into view (and back out again when it leaves).
 */
export const Reveal = (props: ComponentProps<typeof motion.div>) => (
  <motion.div
    initial="out"
    whileInView="in"
    variants={{ in: { transition: { staggerChildren: 0.1 } }, out: {} }}
    {...props}
  />
);

export const Paragraph = (props: ComponentProps<typeof motion.p>) => (
  <motion.p className={styles.paragraph} variants={fade} {...props} />
);

// Same as Paragraph, for content that can't live inside a <p> (e.g. lists)
export const Block = (props: ComponentProps<typeof motion.div>) => (
  <motion.div className={styles.paragraph} variants={fade} {...props} />
);

export const Date = (props: ComponentProps<typeof motion.div>) => (
  <motion.div className={styles.date} variants={fade} {...props} />
);

export const List = (props: ComponentProps<'ul'>) => <ul {...props} />;

const listItemVariants: Variants = {
  ...fade,
  in: { opacity: 1, transition: { duration: 0.5 } },
};

export const ListItem = (props: ComponentProps<typeof motion.li>) => (
  <motion.li variants={listItemVariants} {...props} />
);

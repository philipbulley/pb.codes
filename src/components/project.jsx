import React from 'react';
import { motion } from 'motion/react';
import cx from '../shared/cx';
import styles from './project.module.css';

const Project = ({ className, ...props }) => (
  <div className={cx(styles.project, className)} {...props} />
);
export default Project;

export const Heading = props => <h2 className={styles.heading} {...props} />;

const fade = {
  out: { opacity: 0 },
  in: { opacity: 1 },
};

/**
 * Wraps a project's content and fades its children in, one after another,
 * whenever it scrolls into view (and back out again when it leaves).
 */
export const Reveal = ({ children }) => (
  <motion.div
    initial="out"
    whileInView="in"
    variants={{ in: { transition: { staggerChildren: 0.1 } }, out: {} }}
  >
    {children}
  </motion.div>
);

export const Paragraph = props => (
  <motion.p className={styles.paragraph} variants={fade} {...props} />
);

// Same as Paragraph, for content that can't live inside a <p> (e.g. lists)
export const Block = props => (
  <motion.div className={styles.paragraph} variants={fade} {...props} />
);

export const Date = props => (
  <motion.div className={styles.date} variants={fade} {...props} />
);

export const List = ({ children, ...rest }) => <ul {...rest}>{children}</ul>;

export const ListItem = props => (
  <motion.li
    variants={{ ...fade, in: { ...fade.in, transition: { duration: 0.5 } } }}
    {...props}
  />
);

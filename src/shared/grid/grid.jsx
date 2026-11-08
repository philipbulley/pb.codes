import React from 'react';
import cx from '../cx';
import styles from './grid.module.css';

/** The site's 12 column grid */
const Grid = ({ className, debug, ...props }) => (
  <div className={cx(styles.grid, debug && styles.debug, className)} {...props} />
);

export default Grid;

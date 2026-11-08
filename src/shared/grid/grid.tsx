import type { ComponentProps } from 'react';
import cx from '../cx';
import styles from './grid.module.css';

type GridProps = ComponentProps<'div'> & {
  /** Tints the grid to show which breakpoint is active */
  debug?: boolean;
};

/** The site's 12 column grid */
const Grid = ({ className, debug = false, ...props }: GridProps) => (
  <div
    className={cx(styles.grid, debug && styles.debug, className)}
    {...props}
  />
);

export default Grid;

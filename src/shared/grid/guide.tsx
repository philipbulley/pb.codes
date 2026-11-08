import { useEffect, useState } from 'react';
import Grid from './grid';
import styles from './guide.module.css';

/**
 * A dev overlay of the grid's columns: ⌘; toggles it, and ⌘' toggles tinting
 * the grid to show which breakpoint is active.
 */
const GridGuide = ({ opacity = 0.5 }: { opacity?: number }) => {
  const [show, setShow] = useState(false);
  const [fill, setFill] = useState(false);

  useEffect(() => {
    const handleKeyDown = ({ code, metaKey }: KeyboardEvent) => {
      if (!metaKey) {
        return;
      }

      if (code === 'Semicolon') {
        setShow((isShown) => !isShown);
      } else if (code === 'Quote' && show) {
        setFill((isFilled) => !isFilled);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.container} style={{ opacity }}>
      <Grid className={styles.grid} debug={fill}>
        {Array.from({ length: 12 }, (_, i) => (
          <div className={styles.column} key={i}>
            {i + 1}
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default GridGuide;

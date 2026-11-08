import React from 'react';
import romanize from 'romanize';
import Grid from '../shared/grid/grid';
import useToday from '../shared/use-today';
import styles from './footer.module.css';

const Footer = () => (
  <Grid>
    <div className={styles.footer}>
      <div className={styles.company}>
        <div className={styles.copyright}>
          © {romanize(useToday().getFullYear())} pb.codes
        </div>
      </div>
    </div>
  </Grid>
);

export default Footer;

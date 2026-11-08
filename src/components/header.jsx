import React from 'react';
import { Link } from 'react-router';
import Grid from '../shared/grid/grid';
import styles from './header.module.css';

const Header = () => (
  <div className={styles.header}>
    <Grid className={styles.grid}>
      <Link className={styles.link} to="/">
        pb.codes
      </Link>
    </Grid>
  </div>
);

export default Header;

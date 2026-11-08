import React from 'react';
import Grid from '../shared/grid/grid';
import styles from './bio.module.css';

const Bio = () => (
  <div className={styles.bio}>
    <Grid>
      <div className={styles.text}>
        <strong>I'm Philip Bulley.</strong> An experienced London-based
        freelance front-end developer specialising in web app development. Loves
        TypeScript, JavaScript, React & GraphQL.
      </div>
    </Grid>
  </div>
);

export default Bio;

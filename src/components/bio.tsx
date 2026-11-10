import Grid from '../shared/grid/grid';
import useToday from '../shared/use-today';
import yearsOfExperience from '../shared/years-of-experience';
import styles from './bio.module.css';

const Bio = () => {
  const years = yearsOfExperience(useToday());

  return (
    <div className={styles.bio}>
      <Grid>
        <div className={styles.text}>
          <strong>I'm Philip Bulley.</strong> A London-based developer with{' '}
          {years} years of experience in web technologies, now building mobile
          apps with React Native. Loves TypeScript, React & GraphQL.
        </div>
      </Grid>
    </div>
  );
};

export default Bio;

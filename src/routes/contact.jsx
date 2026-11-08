import React from 'react';
import { motion } from 'motion/react';
import Grid from '../shared/grid/grid';
import cx from '../shared/cx';
import styles from './contact.module.css';

const Contact = () => (
  <Grid>
    <motion.div
      className={styles.text}
      variants={{ init: {}, show: { transition: { staggerChildren: 0.1 } } }}
      initial="init"
      animate="show"
    >
      Please say
      <Anchor big href="mailto:hello@pb.codes">
        hello@pb.codes
      </Anchor>
      or find me on
      <Anchor href="https://www.linkedin.com/in/philipbulley">LinkedIn</Anchor>
      <Anchor href="https://twitter.com/milkisevil">Twitter</Anchor>
      <Anchor href="https://github.com/philipbulley">GitHub</Anchor>
      <Anchor href="https://stackoverflow.com/users/619602/philip-bulley">
        Stack Overflow
      </Anchor>
    </motion.div>
  </Grid>
);

export default Contact;

const Anchor = ({ big, ...props }) => (
  <motion.a
    className={cx(styles.anchor, big && styles.big)}
    variants={{ init: { opacity: 0 }, show: { opacity: 1 } }}
    {...props}
  />
);

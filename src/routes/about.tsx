import type { ComponentProps } from 'react';
import { motion, type Variants } from 'motion/react';
import Grid from '../shared/grid/grid';
import useToday from '../shared/use-today';
import commodore64Src from '../images/commodore-64-c.jpg';
import styles from './about.module.css';

// Industry experience since 1999, ticking over each August
const yearsSince1999 = (date: Date) =>
  date.getFullYear() - 1999 - (date.getMonth() < 7 ? 1 : 0);

const About = () => {
  const years = yearsSince1999(useToday());

  return (
    <motion.div variants={containerVariants} initial="init" animate="show">
      <Grid>
        <SubHeading>A love for application development.</SubHeading>
        <SubHeading>A passion for user interface.</SubHeading>
        <div className={styles.text}>
          <Paragraph>
            With {years} years of industry experience, I've developed a keen eye
            for visual design and an intuitive approach to application
            architecture. I apply well-known software development patterns
            whilst being an advocate of KISS, DRY (sometimes WET) and YAGNI
            principles.
          </Paragraph>

          <Paragraph>
            My career spans the entire stack from dev ops to back-end to
            front-end to UX design. Whilst I have a solid full-stack
            understanding, I’m most at home working on the front-end at the
            intersection of clean performant code and effective, engaging user
            interface design.
          </Paragraph>

          <Paragraph>
            During my career, my advertising work has won awards at the highest
            level; I’ve co-founded two tech start-ups;{' '}
            <strong>
              most recently, I’ve relished the challenges of working within
              complex FinTech domains, delivering apps that shine in both form
              and function.
            </strong>
          </Paragraph>

          <Paragraph>
            It's fair to say that things have come a long way since Santa
            delivered this beauty on Christmas Day 1989!{' '}
            <a href="https://en.wikipedia.org/wiki/Commodore_64">
              <img
                className={styles.image}
                src={commodore64Src}
                width={750}
                height={362}
                alt="A Commodore 64 C computer"
              />
            </a>
          </Paragraph>
        </div>
      </Grid>
    </motion.div>
  );
};

export default About;

const containerVariants: Variants = {
  init: {},
  show: { transition: { staggerChildren: 0.3 } },
};

const fade: Variants = {
  init: { opacity: 0 },
  show: { opacity: 1 },
};

const SubHeading = (props: ComponentProps<typeof motion.h2>) => (
  <motion.h2 className={styles.subHeading} variants={fade} {...props} />
);

const paragraphVariants: Variants = {
  ...fade,
  show: { opacity: 1, transition: { duration: 1, ease: 'linear' } },
};

const Paragraph = (props: ComponentProps<typeof motion.p>) => (
  <motion.p variants={paragraphVariants} {...props} />
);

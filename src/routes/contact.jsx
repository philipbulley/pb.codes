import React from 'react';
import styled, { css } from 'styled-components';
import Grid from '../shared/grid/grid';
import query from '../shared/media';
import { motion } from 'motion/react';

const Contact = () => (
  <Grid>
    <ContactText initial="init" animate="show">
      Please say
      <Anchor $big href="mailto:hello@pb.codes">
        hello@pb.codes
      </Anchor>
      or find me on
      <Anchor href="https://www.linkedin.com/in/philipbulley">LinkedIn</Anchor>
      <Anchor href="https://twitter.com/milkisevil">Twitter</Anchor>
      <Anchor href="https://github.com/philipbulley">GitHub</Anchor>
      <Anchor href="https://stackoverflow.com/users/619602/philip-bulley">
        Stack Overflow
      </Anchor>
    </ContactText>
  </Grid>
);

export default Contact;

const ContactText = styled(motion.div).attrs({
  variants: { init: {}, show: { transition: { staggerChildren: 0.1 } } },
})`
  text-align: right;
  grid-column: span 12;
  color: ${({ theme }) => theme.color.two};

  ${query.md} {
    grid-column: 9 / span 4;
  }
`;

const Anchor = styled(motion.a).attrs({
  variants: { init: { opacity: 0 }, show: { opacity: 1 } },
})`
  display: block;
  font-weight: ${({ theme }) => theme.font.weightDemiBold};
  color: ${({ theme }) => theme.color.accent};
  margin: 0 0 40px 0;
  text-decoration: none;

  ${({ $big }) =>
    $big &&
    css`
      font-size: 24px;
      margin: 0 0 60px 0;
      font-weight: ${({ theme }) => theme.font.weightBold};
    `};
`;

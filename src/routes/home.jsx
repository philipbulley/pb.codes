import React from 'react';
import styled from 'styled-components';
import Grid from '../shared/grid/grid';
import { motion } from 'motion/react';
import query from '../shared/media';

const IndexPage = () => (
  <Container variants={containerVariants} initial="init" animate="show">
    <Grid>
      <Paragraph>
        <Badge>Latest</Badge>
        NatWest — Mettle
      </Paragraph>

      <Paragraph>Loves web app dev and user interface</Paragraph>

      <Paragraph>
        <a href="mailto:hello@pb.codes">hello@pb.codes</a>
      </Paragraph>
    </Grid>
  </Container>
);

export default IndexPage;

const Container = styled(motion.div)`
  display: none;
  margin-top: -100px;

  ${query.sm} {
    display: block;
  }
`;

const containerVariants = {
  init: {},
  // Delay lives here rather than on the children: in motion a child's own
  // `delay` replaces its stagger offset instead of adding to it
  show: { transition: { delayChildren: 1, staggerChildren: 0.5 } },
};

const paragraphVariants = {
  init: {
    opacity: 0,
    y: '-5px',
  },
  show: {
    opacity: 1,
    y: '0px',
    transition: { type: 'tween', duration: 1 },
  },
};

const Paragraph = styled(motion.p).attrs({ variants: paragraphVariants })`
  opacity: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.color.two};

  &:nth-child(1) {
    grid-column: 1 / span 3;
  }

  &:nth-child(2) {
    grid-column: 6 / span 3;
  }

  &:nth-child(3) {
    text-align: right;
    grid-column: 10 / span 3;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Badge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.color.three};
  color: ${({ theme }) => theme.color.white};
  border-radius: 2px;
  font-size: 13px;
  line-height: 1.5;
  padding: 0 6px;
  margin: 0 5px 0 0;
`;

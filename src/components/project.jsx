import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';

const inTiming = '100ms ease-out';
const outTiming = '200ms ease-out';
const Project = styled.div`
  margin: 0 0 100px;

  a {
    display: inline-block;
    position: relative;
    color: ${({ theme }) => theme.color.accent};
    font-weight: ${({ theme }) => theme.font.weightDemiBold};
    text-decoration: none;
    padding: 3px;
    transition: background ${outTiming}, color ${outTiming};

    &:hover {
      color: ${({ theme }) => theme.color.white};
      transition: background ${inTiming}, color ${inTiming};
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.color.accent};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform ${outTiming};
    }

    &:hover:before {
      color: ${({ theme }) => theme.color.white};
      transform: scaleX(1);
      transition: transform ${inTiming};
    }
  }
`;
export default Project;

export const Heading = styled.h2`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.font.weightBold};
  margin: 0 0 30px;
`;

const fade = {
  out: { opacity: 0 },
  in: { opacity: 1 },
};

/**
 * Wraps a project's content and fades its children in, one after another,
 * whenever it scrolls into view (and back out again when it leaves).
 */
export const Reveal = ({ children }) => (
  <motion.div
    initial="out"
    whileInView="in"
    variants={{ in: { transition: { staggerChildren: 0.1 } }, out: {} }}
  >
    {children}
  </motion.div>
);

const ParagraphStyled = styled(motion.p)`
  margin: 0 0 30px;
`;
export const Paragraph = props => (
  <ParagraphStyled variants={fade} {...props} />
);

// Same as Paragraph, for content that can't live inside a <p> (e.g. lists)
const BlockStyled = styled(motion.div)`
  margin: 0 0 30px;
`;
export const Block = props => <BlockStyled variants={fade} {...props} />;

const DateStyled = styled(motion.div)`
  margin: 0 0 12px;
`;
export const Date = props => <DateStyled variants={fade} {...props} />;

export const List = ({ children, ...rest }) => <ul {...rest}>{children}</ul>;

export const ListItem = props => (
  <motion.li
    variants={{ ...fade, in: { ...fade.in, transition: { duration: 0.5 } } }}
    {...props}
  />
);

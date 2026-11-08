import React from 'react';
import { Link as LinkComponent } from 'react-router';
import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import _Grid from '../shared/grid/grid';
import { easeOutExpo } from '../shared/easing';
import query, { matches, minWidth } from '../shared/media';

const items = [
  { to: '/projects', label: 'Projects.' },
  { to: '/about', label: 'About.' },
  { to: '/contact', label: 'Contact.' },
];

const Nav = ({ currentPath }) => (
  <Grid>
    {items.map(({ to, label }) => (
      <NavItem
        key={to}
        variants={navItemVariants}
        initial="init"
        animate={currentPath.startsWith(to) ? 'active' : 'inactive'}
      >
        <Link to={to}>
          {label}
          <Underline variants={underlineVariants} />
        </Link>
      </NavItem>
    ))}
  </Grid>
);

export default Nav;

const navItemTransition = { ease: easeOutExpo, duration: 0.5 };
const navItemVariants = {
  init: {
    y: 0,
    opacity: 0,
  },
  // Resolved when the animation starts, so `matches` only runs in the browser
  active: () => ({
    y: matches(minWidth.sm) ? 50 : 0,
    opacity: 1,
    transition: navItemTransition,
  }),
  inactive: {
    y: 0,
    opacity: 1,
    transition: navItemTransition,
  },
};

const NavItem = styled(motion.div)`
  ${({ theme }) => css`
    display: inline-block;
    font-weight: ${theme.font.weightDemiBold};
    font-size: 20px;

    a {
      text-decoration: none;
      color: ${theme.color.one};
    }

    &:nth-child(1) {
      grid-column: 1 / span 4;
    }

    &:nth-child(2) {
      text-align: center;
      grid-column: 5 / span 4;
    }

    &:nth-child(3) {
      text-align: right;
      grid-column: 9 / span 4;
    }

    ${query.sm} {
      font-size: 24px;
      text-align: left;

      grid-column-end: span 4;

      &:nth-child(2) {
        text-align: left;
        grid-column: 6 / span 3;
      }

      &:nth-child(3) {
        grid-column: 9 / span 4;
      }
    }
  `};
`;

const underlineTransition = { ease: easeOutExpo, duration: 5 };
const underlineVariants = {
  active: { width: '100%', transition: underlineTransition },
  inactive: { width: 0, transition: { duration: 0 } },
};

const Underline = styled(motion.div)`
  width: 0;
  margin-top: 3px;
  height: 4px;
  background-color: ${({ theme }) => theme.color.accent};
`;

const Link = styled(LinkComponent)`
  display: inline-block;
`;

const Grid = styled(_Grid)`
  margin-top: 70px;
  margin-bottom: 90px;

  ${query.sm} {
    margin-top: 50px;
    margin-bottom: 130px;
  }
`;

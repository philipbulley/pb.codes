import React from 'react';
import styled from 'styled-components';
import _Grid from '../shared/grid/grid';
import { Link } from 'react-router';

const Header = () => (
  <HeaderStyled>
    <Grid>
      <StyledLink to={'/'}>pb.codes</StyledLink>
    </Grid>
  </HeaderStyled>
);

export default Header;

const HeaderStyled = styled.div`
  grid-column: span 12;
  width: 100%;
  height: 140px;
  color: white;
  background-color: ${({ theme }) => theme.color.accent};
  font-weight: ${({ theme }) => theme.font.weightBold};
`;

const Grid = styled(_Grid)`
  height: 100%;
`;

const StyledLink = styled(Link)`
  grid-column: span 12;
  align-self: center;
  text-decoration: none;
  color: ${({ theme }) => theme.color.white};
  font-size: 24px;
`;

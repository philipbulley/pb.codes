import React from 'react';
import styled from 'styled-components';

const Header = ({ siteTitle }) => <HeaderStyled>pb.codes</HeaderStyled>;

export default Header;

const HeaderStyled = styled.div`
  width: 100%;
  height: 140px;
  color: white;
  background-color: black;
`;
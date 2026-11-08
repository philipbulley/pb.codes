import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Header from './header';
import Nav from './nav';
import Bio from './bio';
import GridGuide from '../shared/grid/guide';
import Footer from './footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Header />
      <Bio />
      <GridGuide />
      <Nav currentPath={pathname} />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > * {
    flex: 0 1 auto;
  }
`;

const Main = styled.div`
  flex: 1 0 auto;
`;

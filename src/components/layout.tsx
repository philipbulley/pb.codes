import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import Header from './header';
import Nav from './nav';
import Bio from './bio';
import GridGuide from '../shared/grid/guide';
import Footer from './footer';
import { getAccentColor } from '../shared/theme';
import styles from './layout.module.css';

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  // The header shows its own nav once this one has scrolled under it
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles.container}
      style={{ '--color-accent': getAccentColor(pathname) } as CSSProperties}
    >
      <Header navRef={navRef} />
      <Bio />
      <GridGuide />
      <Nav currentPath={pathname} ref={navRef} />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

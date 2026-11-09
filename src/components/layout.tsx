import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import Header from './header';
import Nav from './nav';
import Bio from './bio';
import GridGuide from '../shared/grid/guide';
import Footer from './footer';
import { getAccentColor } from '../shared/theme';
import { useScrollRoom } from '../shared/scroll-room';
import styles from './layout.module.css';

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  // The header shows its own nav once this one has scrolled under it
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  useScrollRoom(spacerRef, mainRef, pathname);

  return (
    <div
      className={styles.container}
      style={{ '--color-accent': getAccentColor(pathname) } as CSSProperties}
    >
      <Header navRef={navRef} />
      <Bio />
      <GridGuide />
      <Nav currentPath={pathname} ref={navRef} />
      <div className={styles.main} ref={mainRef}>
        {children}
      </div>
      {/* Room to keep the scroll position on short pages (see scroll-room.ts) */}
      <div className={styles.spacer} ref={spacerRef} aria-hidden />
      <Footer />
    </div>
  );
};

export default Layout;

import React from 'react';
import { useLocation } from 'react-router-dom';

import { NavLink } from '@models';
import { Children, Link, Container } from './Nav.css';

export interface Props {
  children?: React.ReactNode;
  className?: string;
}

export interface NavLinks {
  [index: string]: { title: string; to: string };
}

const navLinks: NavLink[] = [
  { title: 'Home', to: '/', base: 'index' },
  { title: 'About me', to: '/about', base: 'about' },
  { title: 'CV / Resumé', to: '/cv', base: 'cv' },
  { title: 'Projects', to: '/projects', base: 'projects' },
  { title: 'Now', to: '/now', base: 'now' },
];

export const pathRoot = (pathname: string): string => {
  const splitPathname: string[] = pathname
    .split('/')
    .filter((str: string) => str.length > 0);

  return splitPathname[0] ?? 'index';
};

const Nav = ({ children, className }: Props): React.ReactNode => {
  const { pathname } = useLocation();
  const root: string = pathRoot(pathname);

  return (
    <Container aria-label="Navigation" role="navigation" className={className}>
      {navLinks.map(
        ({ base, title, to }: NavLink): React.ReactNode => (
          <Link active={root === base ? 1 : 0} key={to} to={to}>
            {title}
          </Link>
        ),
      )}
      <Children>{children}</Children>
    </Container>
  );
};

export default Nav;

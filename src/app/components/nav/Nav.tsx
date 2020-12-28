import React from 'react';
import { useLocation } from 'react-router-dom';
import { JSXChildren, NavLinkProps } from 'models';
import { normalisePathname } from 'utils';
import { ChildrenSt, LinkSt, NavSt } from './Nav.css';

export interface Props {
  children?: JSXChildren;
  className?: string;
}

const navLinks: NavLinkProps[] = [
  { title: 'Home', to: '/', base: 'index' },
  { title: 'About me', to: '/about/', base: 'about' },
  { title: 'CV / Resumé', to: '/cv/', base: 'cv' },
  { title: 'Projects', to: '/projects/', base: 'projects' },
  { title: 'Now', to: '/now/', base: 'now' },
];

export const pathRoot = (pathname: string): string => {
  const splitPathname: string = normalisePathname(pathname).split('/')[0];

  return splitPathname === '' ? 'index' : splitPathname;
};

const Nav = ({ children, className }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const root: string = pathRoot(pathname);

  return (
    <NavSt className={className}>
      {navLinks.map(
        ({ base, title, to }: NavLinkProps): JSX.Element => (
          <LinkSt active={root === base ? 'true' : undefined} key={to} to={to}>
            {title}
          </LinkSt>
        )
      )}
      <ChildrenSt>{children}</ChildrenSt>
    </NavSt>
  );
};

export default Nav;

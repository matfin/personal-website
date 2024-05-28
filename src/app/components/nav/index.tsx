import { useLocation } from 'react-router-dom';

import { NavLink } from '@models/interfaces';
import { pathRoot } from '@utils/general';
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

const Nav = ({ children, className }: Props): React.ReactNode => {
  const { pathname } = useLocation();
  const pathBase: string = pathRoot(pathname);

  return (
    <Container aria-label="Navigation" role="navigation" className={className}>
      {navLinks.map(
        ({ base, title, to }: NavLink): React.ReactNode => (
          <Link key={to} to={to} className={base === pathBase ? 'active' : ''}>
            {title}
          </Link>
        ),
      )}
      <Children>{children}</Children>
    </Container>
  );
};

export default Nav;

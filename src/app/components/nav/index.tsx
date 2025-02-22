import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx/lite';

import type { NavLink } from '@models/interfaces';
import { pathRoot } from '@utils/general';
import classNames from './Nav.module.css';

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
    <nav
      className={clsx(classNames.container, className)}
      aria-label="Navigation"
    >
      {navLinks.map(
        ({ base, title, to }: NavLink): React.ReactNode => (
          <Link
            key={to}
            to={to}
            className={clsx(
              classNames.link,
              base === pathBase && classNames.active,
            )}
          >
            {title}
          </Link>
        ),
      )}
      <div className={classNames.children}>{children}</div>
    </nav>
  );
};

export default Nav;

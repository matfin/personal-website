import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LinkSt,
  NavSt,
} from './Nav.css';

export interface IProps {
  children?: any,
  className?: string,
}

export const Nav = ({ className }: IProps) => {
  const { pathname } = useLocation();

  return (
    <NavSt className={className}>
      <LinkSt isactive={(pathname === '/').toString()} to="/">
        Home
      </LinkSt>
      <LinkSt isactive={(pathname === '/cv').toString()} to="/cv">
        CV
      </LinkSt>
      <LinkSt isactive={(pathname === '/projects').toString()} to="/projects">
        Projects
      </LinkSt>
      <LinkSt isactive={(pathname === '/now').toString()} to="/now">
        Now
      </LinkSt>
    </NavSt>
  );
};

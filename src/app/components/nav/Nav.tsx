import React from 'react';
import { LinkSt, NavSt } from './Nav.css';

export interface IProps {
  children?: any,
  className?: string,
}

export const Nav = ({ className }: IProps) => (
  <NavSt className={className}>
    <LinkSt to="/">
      Home
    </LinkSt>
    <LinkSt to="/cv">
      CV
    </LinkSt>
    <LinkSt to="/projects">
      Projects
    </LinkSt>
  </NavSt>
);

import React from 'react';
import { ChildrenSt, LinkSt, NavSt } from './Nav.css';

export interface IProps {
  children?: any;
  className?: string;
  [key: string]: any;
}

export const Nav = ({ children, className }: IProps) => (
  <NavSt className={className}>
    <LinkSt exact to="/">
      Home
    </LinkSt>
    <LinkSt to="/cv">CV / Resumé</LinkSt>
    <LinkSt to="/projects">Projects</LinkSt>
    <LinkSt to="/now">Now</LinkSt>
    <ChildrenSt>{children}</ChildrenSt>
  </NavSt>
);

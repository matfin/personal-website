import React from 'react';
import { JSXChildren } from 'common/models';
import { ChildrenSt, LinkSt, NavSt } from './Nav.css';

export interface Props {
  children?: JSXChildren;
  className?: string;
}

const Nav = ({ children, className }: Props): JSX.Element => (
  <NavSt className={className}>
    <LinkSt exact to="/">
      Home
    </LinkSt>
    <LinkSt to="/about">About me</LinkSt>
    <LinkSt to="/cv">CV / Resumé</LinkSt>
    <LinkSt to="/projects">Projects</LinkSt>
    <LinkSt to="/now">Now</LinkSt>
    <ChildrenSt>{children}</ChildrenSt>
  </NavSt>
);

export default Nav;

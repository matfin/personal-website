import React from 'react';
import HeaderSt from './Header.css';

export interface IProps {
  children?: any,
  className?: string,
}

const Header = ({ children, className }: IProps) => (
  <HeaderSt className={className}>
    {children}
  </HeaderSt>
);

export default Header;

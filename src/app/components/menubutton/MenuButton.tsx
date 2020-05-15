import React from 'react';
import { LinePlacement, LineSt, MenuButtonSt } from './MenuButton.css';

export interface IProps {
  className?: string,
  navRevealed: boolean,
  onClick(): void,
}

export const MenuButton = ({ className, onClick, navRevealed }: IProps): JSX.Element => (
  <MenuButtonSt data-testid="menubutton" className={className} onClick={onClick}>
    <LineSt placement={LinePlacement.TOP} revealed={navRevealed} />
    <LineSt placement={LinePlacement.MIDDLE} revealed={navRevealed} />
    <LineSt placement={LinePlacement.BOTTOM} revealed={navRevealed} />
  </MenuButtonSt>
);

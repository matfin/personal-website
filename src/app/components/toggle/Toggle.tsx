import React from 'react';
import { ToggleValue } from 'common/interfaces';
import { ToggleIndicatorSt, ToggleTrackSt } from './Toggle.css';

export interface IProps {
  className?: string,
  value: ToggleValue,
  onToggle?(value: ToggleValue): void,
};

export const Toggle = ({ className, value, onToggle }: IProps): JSX.Element => {
  const onToggleTrackClick = (): void => {
    onToggle && onToggle(value === ToggleValue.ON ? ToggleValue.OFF : ToggleValue.ON);
  }

  return (
    <ToggleTrackSt
      aria-label="Light / Dark theme toggle"
      className={className}
      data-testid="toggle"
      onClick={onToggleTrackClick}
    >
      <ToggleIndicatorSt data-testid="indicator" switchedOn={value === ToggleValue.ON} />
    </ToggleTrackSt>
  );
};

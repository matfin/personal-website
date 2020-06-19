import React from 'react';
import { ToggleValue } from 'common/interfaces';
import { ToggleIndicatorSt, ToggleTrackSt } from './Toggle.css';

export interface IProps {
  className?: string,
  label: string,
  value: ToggleValue,
  onToggle(value: ToggleValue): void,
}

export const Toggle = ({
  className,
  label,
  value,
  onToggle,
}: IProps): JSX.Element => {
  const onToggleTrackClick = (): void => {
    onToggle(value === ToggleValue.ON ? ToggleValue.OFF : ToggleValue.ON);
  };

  return (
    <ToggleTrackSt
      aria-label={label}
      className={className}
      data-testid="toggle"
      onClick={onToggleTrackClick}
    >
      <ToggleIndicatorSt data-testid="indicator" switchedon={value === ToggleValue.ON} />
    </ToggleTrackSt>
  );
};

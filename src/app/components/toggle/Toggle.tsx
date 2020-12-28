import React from 'react';
import { ToggleValue } from 'models';
import { ToggleIndicatorSt, ToggleTrackSt } from './Toggle.css';

export interface Props {
  className?: string;
  label: string;
  value: ToggleValue;
  onToggle(value: ToggleValue): void;
}

const Toggle = ({ className, label, value, onToggle }: Props): JSX.Element => {
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
      <ToggleIndicatorSt
        data-testid="indicator"
        switchedon={value === ToggleValue.ON}
      />
    </ToggleTrackSt>
  );
};

export default Toggle;

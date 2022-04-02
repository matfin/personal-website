import React from 'react';
import { ToggleValue } from 'models';
import { ToggleIndicatorSt, ToggleTrackSt } from './Toggle.css';

export interface Props {
  className?: string;
  value: ToggleValue;
  onToggle(value: ToggleValue): void;
}

const Toggle = ({ className, value, onToggle }: Props): JSX.Element => {
  const onToggleTrackClick = (): void => {
    onToggle(value === ToggleValue.ON ? ToggleValue.OFF : ToggleValue.ON);
  };

  return (
    <ToggleTrackSt
      className={className}
      data-testid="toggle"
      onClick={onToggleTrackClick}
    >
      <ToggleIndicatorSt
        data-testid="indicator"
        switchedon={value === ToggleValue.ON}
        aria-checked={value === ToggleValue.ON ? 'true' : 'false'}
      />
    </ToggleTrackSt>
  );
};

export default Toggle;

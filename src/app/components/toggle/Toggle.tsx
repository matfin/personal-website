import React from 'react';
import { ToggleValue } from 'models';
import { ToggleIndicatorSt, ToggleTrackSt } from './Toggle.css';

export interface Props {
  className?: string;
  value: ToggleValue;
  onToggle(value: ToggleValue): void;
  rest?: unknown;
}

const Toggle = ({
  className,
  value,
  onToggle,
  ...rest
}: Props): JSX.Element => {
  const ariaPressed: boolean = value === ToggleValue.ON;
  const isSwitchedOn = value === ToggleValue.ON;

  const onToggleTrackClick = (): void => {
    onToggle(value === ToggleValue.ON ? ToggleValue.OFF : ToggleValue.ON);
  };

  return (
    <ToggleTrackSt
      aria-pressed={ariaPressed}
      className={className}
      data-testid="toggle"
      onClick={onToggleTrackClick}
      {...rest}
    >
      <ToggleIndicatorSt
        data-testid="indicator"
        $switchedon={isSwitchedOn}
        aria-hidden={true}
      />
    </ToggleTrackSt>
  );
};

export default Toggle;

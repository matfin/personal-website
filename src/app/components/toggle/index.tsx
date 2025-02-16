import { clsx } from 'clsx/lite';

import { ToggleValue } from '@models/enums';
import classNames from './Toggle.module.css';
// import { ToggleIndicator, ToggleTrack } from './Toggle.css';

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
}: Props): React.ReactNode => {
  const ariaPressed: boolean = value === ToggleValue.ON;
  const isSwitchedOn = value === ToggleValue.ON;

  const onToggleTrackClick = (): void => {
    onToggle(value === ToggleValue.ON ? ToggleValue.OFF : ToggleValue.ON);
  };

  return (
    <div
      aria-pressed={ariaPressed}
      data-testid="toggle"
      onClick={onToggleTrackClick}
      className={clsx(classNames.toggleTrack, className)}
      {...rest}
    >
      <div
        aria-hidden
        data-testid="indicator"
        className={clsx(
          classNames.toggleIndicator,
          isSwitchedOn && classNames.on,
        )}
      />
    </div>
  );
};

export default Toggle;

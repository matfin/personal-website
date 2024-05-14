import { ToggleValue } from '@models';
import { ToggleIndicator, ToggleTrack } from './Toggle.css';

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
    <ToggleTrack
      aria-pressed={ariaPressed}
      className={className}
      data-testid="toggle"
      onClick={onToggleTrackClick}
      {...rest}
    >
      <ToggleIndicator
        data-testid="indicator"
        $switchedon={isSwitchedOn}
        aria-hidden={true}
      />
    </ToggleTrack>
  );
};

export default Toggle;

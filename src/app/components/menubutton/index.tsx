import { isTouchDevice } from '@utils/general';
import { LinePlacement } from '@models/enums';
import { Container, Line } from './MenuButton.css';

export interface Props {
  className?: string;
  navrevealed?: string;
  onClick(e: React.MouseEvent | React.TouchEvent): void;
}

const MenuButton = ({
  className,
  onClick,
  navrevealed,
}: Props): React.ReactNode => {
  const shouldUseTouch: boolean = isTouchDevice();

  return (
    <Container
      aria-label="Menu"
      data-testid="menubutton"
      className={className}
      onClick={!shouldUseTouch ? onClick : undefined}
      onTouchStart={shouldUseTouch ? onClick : undefined}
    >
      <Line $placement={LinePlacement.TOP} $revealed={navrevealed} />
      <Line $placement={LinePlacement.MIDDLE} $revealed={navrevealed} />
      <Line $placement={LinePlacement.BOTTOM} $revealed={navrevealed} />
    </Container>
  );
};

export default MenuButton;

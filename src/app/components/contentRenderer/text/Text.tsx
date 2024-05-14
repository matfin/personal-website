import { MainHeading, SubHeading, NormalText } from './Text.css';

export interface Props {
  as: string;
  children: React.ReactNode;
}

const Text = ({ as, children }: Props): React.ReactNode => {
  switch (as) {
    case 'h1': {
      return <MainHeading>{children}</MainHeading>;
    }
    case 'h2':
    case 'h3': {
      return <SubHeading>{children}</SubHeading>;
    }
    default: {
      return <NormalText as={as}>{children}</NormalText>;
    }
  }
};

export default Text;

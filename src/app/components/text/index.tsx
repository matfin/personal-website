import { MainHeading, SubHeading, ThirdHeading, NormalText } from './Text.css';

export interface Props {
  children: React.ReactNode;
  className?: string;
  type: string;
}

const Text = ({ children, className, type }: Props): React.ReactNode => {
  switch (type) {
    case 'h1': {
      return <MainHeading className={className}>{children}</MainHeading>;
    }
    case 'h2':
    case 'h3': {
      return (
        <SubHeading className={className} as={type}>
          {children}
        </SubHeading>
      );
    }
    case 'h4': {
      return (
        <ThirdHeading as={type} className={className}>
          {children}
        </ThirdHeading>
      );
    }
    default: {
      return (
        <NormalText as={type} className={className}>
          {children}
        </NormalText>
      );
    }
  }
};

export default Text;

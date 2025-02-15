import { clsx } from 'clsx/lite';

import classNames from './Text.module.css';

export interface Props {
  children: React.ReactNode;
  className?: string;
  type: string;
}

const Text = ({ children, className, type }: Props): React.ReactNode => {
  console.log(type);
  switch (type) {
    case 'h1': {
      return (
        <h1
          className={clsx(
            className,
            'headingTypography',
            classNames.mainHeading,
          )}
        >
          {children}
        </h1>
      );
    }
    case 'h2':
      return (
        <h2
          className={clsx(
            className,
            'subHeadingTypography',
            classNames.subHeading,
          )}
        >
          {children}
        </h2>
      );
    case 'h3': {
      return (
        <h3
          className={clsx(
            className,
            'thirdHeadingTypography',
            classNames.subHeading,
          )}
        >
          {children}
        </h3>
      );
    }
    case 'h4': {
      return (
        <h4
          className={clsx(
            className,
            'thirdHeadingTypography',
            classNames.subHeading,
          )}
        >
          {children}
        </h4>
      );
    }
    default: {
      return (
        <span className={clsx(className, classNames.NormalText)}>
          {children}
        </span>
      );
    }
  }
};

export default Text;

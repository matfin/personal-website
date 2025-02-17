import { clsx } from 'clsx/lite';

import classNames from './Text.module.css';

export type Props = {
  type?: React.ElementType;
  children: React.ReactNode;
  className?: string;
};

export const classesToApply = (
  type: React.ElementType,
  className?: string,
): string => {
  switch (type) {
    case 'h1': {
      return clsx(className, 'h1', classNames.mainHeading);
    }
    case 'h2': {
      return clsx(className, 'h2', classNames.subHeading);
    }
    case 'h3': {
      return clsx(className, 'h3', classNames.subHeading);
    }
    case 'h4': {
      return clsx(className);
    }
    default: {
      return clsx(className, 'text', classNames.normalText);
    }
  }
};

const Text = ({
  type: Tag = 'div',
  children,
  className,
}: Props): React.ReactNode => {
  return <Tag className={classesToApply(Tag, className)}>{children}</Tag>;
};

export default Text;

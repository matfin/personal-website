import { clsx } from 'clsx/lite';

import Text from '@components/text';
import classNames from './Topic.module.css';

export interface Props {
  className?: string;
  title: string;
}

const Topic = ({ className, title }: Props): React.ReactNode => (
  <Text type="li" className={clsx(classNames.topic, className)}>
    {title}
  </Text>
);

export default Topic;

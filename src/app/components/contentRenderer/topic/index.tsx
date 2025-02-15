import { clsx } from 'clsx/lite';
import classNames from './Topic.module.css';

export interface Props {
  className?: string;
  title: string;
}

const Topic = ({ className, title }: Props): React.ReactNode => (
  <li className={clsx(classNames.topic, className)}>{title}</li>
);

export default Topic;

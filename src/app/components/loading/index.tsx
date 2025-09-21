import { LoadingSpinner } from '@components/svgicons';
import { clsx } from 'clsx/lite';
import classNames from './Loading.module.css';

export type Props = {
  className?: string;
};

const Loading = ({ className }: Props): React.ReactNode => (
  <div className={clsx(className, classNames.container)}>
    <LoadingSpinner className={classNames.loadingSpinner} />
  </div>
);

export default Loading;

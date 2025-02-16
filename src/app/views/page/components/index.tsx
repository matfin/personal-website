import { Link } from 'react-router-dom';
import clsx from 'clsx/lite';

import classNames from './Components.module.css';

export const ErrorMessage = ({ error }: { error: Error }): React.ReactNode => (
  <div className={classNames.error}>{error.toString()}</div>
);

export const BackButton = ({ href }: { href: string }): React.ReactNode => (
  <Link
    className={clsx(classNames.backButton, 'commonButton')}
    arial-label="back"
    data-testid="backbutton"
    to={href}
  />
);

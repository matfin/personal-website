import { ErrorSt, BackSt } from './components.style';

export const ErrorMessage = ({ error }: { error: Error }): React.ReactNode => (
  <ErrorSt>{error.toString()}</ErrorSt>
);

export const BackButton = ({ href }: { href: string }): React.ReactNode => (
  <BackSt arial-label="back" data-testid="backbutton" to={href} />
);

import { ClosingTag } from '@components/svgicons';
import Text from '@components/text';
import { clsx } from 'clsx/lite';
import classNames from './Footer.module.css';

export type Props = {
  className?: string;
};

const Footer = ({ className }: Props): React.ReactNode => (
  <footer className={clsx(className, classNames.container)}>
    <Text type="p" className={classNames.footerText}>
      Made by a human
    </Text>
    <ClosingTag className={classNames.closingTag} />
  </footer>
);

export default Footer;

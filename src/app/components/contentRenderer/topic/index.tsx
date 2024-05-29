import { Container } from './Topic.css';

export interface Props {
  className?: string;
  title: string;
}

const Topic = ({ className, title }: Props): React.ReactNode => (
  <Container type="li" className={className}>
    {title}
  </Container>
);

export default Topic;

import { Topic as TopicModel } from '@models';
import { Container } from './Topic.css';

export interface Props extends TopicModel {
  className?: string;
}

const Topic = ({ className, description, title }: Props): React.ReactNode => (
  <Container title={description} className={className}>
    {title}
  </Container>
);

export default Topic;

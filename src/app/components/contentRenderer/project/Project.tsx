import { Project as ProjectModel } from '@models';
import { Container, Title, Description } from './Project.css';

export interface Props extends ProjectModel {
  className?: string;
}

const Project = ({
  className,
  description,
  slug,
  title,
}: Props): React.ReactNode => (
  <Container to={`/projects/${slug}/`} className={className}>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Container>
);

export default Project;

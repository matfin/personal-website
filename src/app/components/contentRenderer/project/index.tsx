import { Project as ProjectModel } from '@models/interfaces';
import { Container, Description, Title } from './Project.css';

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
    <Title type="h3">{title}</Title>
    <Description type="p">{description}</Description>
  </Container>
);

export default Project;

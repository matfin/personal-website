import * as React from 'react';
import { Project as ProjectModel } from 'models';
import { ProjectSt, TitleSt, DescriptionSt } from './Project.css';

export interface Props extends ProjectModel {
  className?: string;
}

const Project = ({
  className,
  description,
  slug,
  title,
}: Props): React.ReactNode => (
  <ProjectSt to={`/projects/${slug}/`} className={className}>
    <TitleSt>{title}</TitleSt>
    <DescriptionSt>{description}</DescriptionSt>
  </ProjectSt>
);

export default Project;

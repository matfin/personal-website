import * as React from 'react';
import { ProjectProps } from 'models';
import { ProjectSt, TitleSt, DescriptionSt } from './Project.css';

export interface Props extends ProjectProps {
  className?: string;
}

const Project = ({
  className,
  description,
  slug,
  title,
}: Props): JSX.Element => (
  <ProjectSt to={`/projects/${slug}/`} className={className}>
    <TitleSt>{title}</TitleSt>
    <DescriptionSt>{description}</DescriptionSt>
  </ProjectSt>
);

export default Project;

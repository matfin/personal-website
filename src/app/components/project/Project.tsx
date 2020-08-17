import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { IProject } from 'common/interfaces';
import { ProjectSt, TitleSt, DescriptionSt } from './Project.css';

export interface IProps extends IProject {
  className?: string;
}

const Project = ({
  className,
  description,
  slug,
  title,
}: IProps): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <ProjectSt to={`${url}/${slug}`} className={className}>
      <TitleSt>{title}</TitleSt>
      <DescriptionSt>{description}</DescriptionSt>
    </ProjectSt>
  );
};

export default Project;

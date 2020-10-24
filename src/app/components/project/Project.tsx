import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ProjectProps } from 'common/models';
import { ProjectSt, TitleSt, DescriptionSt } from './Project.css';

export interface Props extends ProjectProps {
  className?: string;
}

const Project = ({
  className,
  description,
  slug,
  title,
}: Props): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <ProjectSt to={`${url}/${slug}`} className={className}>
      <TitleSt>{title}</TitleSt>
      <DescriptionSt>{description}</DescriptionSt>
    </ProjectSt>
  );
};

export default Project;

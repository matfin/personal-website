import * as React from 'react';
import { IProject } from 'common/interfaces';
import {
  ProjectSt,
  TitleSt,
  DescriptionSt,
  UrlSt,
} from './Project.css';

export interface IProps extends IProject {
  className?: string
};

export const Project = ({
  className,
  description,
  title,
  url,
}: IProps): JSX.Element => (
  <ProjectSt className={className}>
    <TitleSt>
      {title}
    </TitleSt>
    <DescriptionSt>
      {description}
    </DescriptionSt>
    {url && (
      <UrlSt href={url}>
        {url}
      </UrlSt>
    )}
  </ProjectSt>
);

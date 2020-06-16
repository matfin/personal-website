import * as React from 'react';
import { ITopic } from 'common/interfaces';
import TopicSt from './Topic.css';

export interface IProps extends ITopic {
  className?: string,
}

export const Topic = ({ className, description, title }: IProps): JSX.Element => (
  <TopicSt title={description} className={className}>{title}</TopicSt>
);

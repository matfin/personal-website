import * as React from 'react';
import { Topic as TopicModel } from 'models';
import TopicSt from './Topic.css';

export interface Props extends TopicModel {
  className?: string;
}

const Topic = ({ className, description, title }: Props): React.ReactNode => (
  <TopicSt title={description} className={className}>
    {title}
  </TopicSt>
);

export default Topic;

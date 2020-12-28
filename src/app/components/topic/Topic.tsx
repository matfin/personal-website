import * as React from 'react';
import { TopicProps } from 'models';
import TopicSt from './Topic.css';

export interface Props extends TopicProps {
  className?: string;
}

const Topic = ({ className, description, title }: Props): JSX.Element => (
  <TopicSt title={description} className={className}>
    {title}
  </TopicSt>
);

export default Topic;

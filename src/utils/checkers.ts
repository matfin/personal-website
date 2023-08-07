import {
  ContentItemProps,
  PositionProps,
  ProjectProps,
  TopicProps,
} from 'models';

export const isContentItem = (
  contentItem: ContentItemProps,
): contentItem is ContentItemProps =>
  (contentItem as ContentItemProps).tagName !== undefined;

export const isTopic = (topic: TopicProps): topic is TopicProps =>
  (topic as TopicProps).category !== undefined;

export const isPosition = (
  position: PositionProps,
): position is PositionProps => (position as PositionProps).role !== undefined;

export const isProject = (project: ProjectProps): project is ProjectProps =>
  (project as ProjectProps).description !== undefined;

import { IContentItem, IPosition, IProject, ITopic } from 'common/interfaces';

export const isContentItem = (contentItem: any): contentItem is IContentItem =>
  (contentItem as IContentItem).tagName !== undefined;

export const isTopic = (topic: any): topic is ITopic =>
  (topic as ITopic).category !== undefined;

export const isPosition = (position: any): position is IPosition =>
  (position as IPosition).role !== undefined;

export const isProject = (project: any): project is IProject =>
  (project as IProject).description !== undefined;

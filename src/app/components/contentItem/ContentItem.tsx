import * as React from 'react';
import { ContentTypes, IContentItem, ITopic, IPosition, IProject } from 'common/interfaces';
import {
  isContentItem,
  isTopic,
  isPosition,
  isProject,
} from 'common/utils';
import {
  HeadingSt,
  ParagraphSt,
  SectionSt,
  ListSt,
  ListItemSt,
  PositionSt,
  ProjectSt,
  SubHeadingSt,
  TopicSt,
} from './ContentItem.css';

export interface IProps extends IContentItem {
  className?: string,
  key?: string,
}

export const renderTag = (tagName: string, content: any, key?: string): JSX.Element => {
  switch(tagName) {
    case 'section': {
      return <SectionSt key={key}>{content}</SectionSt>;
    }
    case 'p': {
      return <ParagraphSt key={key}>{content}</ParagraphSt>;
    }
    case 'h1': {
      return <HeadingSt key={key}>{content}</HeadingSt>;
    }
    case 'h2': {
      return <SubHeadingSt key={key}>{content}</SubHeadingSt>;
    }
    case 'ul': {
      return <ListSt key={key}>{content}</ListSt>;
    }
    case 'li': {
      return <ListItemSt key={key}>{content}</ListItemSt>;
    }
    case 'topics': {
      return <ListSt key={key}>{content}</ListSt>;
    }
    case 'jobs':
    case 'projects': {
      return <SectionSt key={key}>{content}</SectionSt>
    }
  }

  return <span>{content}</span>;
}

export const renderTopic = (topic: ITopic): JSX.Element => {
  return <TopicSt {...topic} key={topic.title} />;
};

export const renderPosition = (position: IPosition): JSX.Element => (
  <PositionSt
    {...position}
    key={`${position.company}-${position.location}`}
  />
);

export const renderProject = (project: IProject): JSX.Element => (
  <ProjectSt
    {...project}
    key={project.title}
  />
);

export const renderContent = (item: ContentTypes, key?: string): JSX.Element => {
  if (isContentItem(item)) {
    const { content, tagName } = item;

    if (Array.isArray(content)) {
      return renderTag(
        tagName,
        content.map((contentItem: ContentTypes, idx: number) => renderContent(contentItem, `${tagName}-${idx}`)),
        key
      );
    }

    return renderTag(tagName, content, key);
  } else if (isTopic(item)) {
    return renderTopic(item);
  } else if (isPosition(item)) {
    return renderPosition(item);
  } else if (isProject(item)) {
    return renderProject(item);
  }

  return <span>Unknown element</span>;
};

export const ContentItem = (contentItem: IProps): JSX.Element => renderContent(contentItem);

import * as React from 'react';
import {
  ContentTypes,
  IContentItem,
  ITopic,
  IPosition,
  IProject,
} from 'common/interfaces';
import {
  isContentItem,
  isLink,
  isTopic,
  isPosition,
  isProject,
  splitContent,
  toLinkObject,
} from 'common/utils';
import { Position } from 'app/components/position/Position';
import {
  HeadingSt,
  ImageContainerSt,
  LinkSt,
  ListSt,
  ListItemSt,
  ParagraphSt,
  PictureSt,
  ProjectSt,
  SectionSt,
  SubHeadingSt,
  TiledListSt,
  TileSt,
  TopicSt,
  TopicsSt,
} from './ContentItem.css';

export interface IProps extends IContentItem {
  className?: string,
  key?: string,
}

export const processContent = (content: string): any => {
  const split: string[] = splitContent(content);
  const processed = split.map((item: string) => {
    if (isLink(item)) {
      return <LinkSt {...toLinkObject(item)} key={item} />;
    }

    return item;
  });

  return processed;
};

export const renderTag = (tagName: string, content: any, key?: string): JSX.Element => {
  switch (tagName) {
    case 'section': {
      return <SectionSt key={key}>{content}</SectionSt>;
    }
    case 'img': {
      return (
        <ImageContainerSt key={key}>
          <PictureSt {...content} />
        </ImageContainerSt>
      );
    }
    case 'p': {
      return (
        <ParagraphSt key={key}>
          {processContent(content)}
        </ParagraphSt>
      );
    }
    case 'h1': {
      return <HeadingSt key={key}>{content}</HeadingSt>;
    }
    case 'h2':
    case 'h3': {
      return <SubHeadingSt key={key}>{content}</SubHeadingSt>;
    }
    case 'ul': {
      return <ListSt key={key}>{content}</ListSt>;
    }
    case 'li': {
      return (
        <ListItemSt key={key}>
          {processContent(content)}
        </ListItemSt>
      );
    }
    case 'topics': {
      return <TopicsSt key={key}>{content}</TopicsSt>;
    }
    case 'jobs': {
      return <SectionSt key={key}>{content}</SectionSt>;
    }
    case 'projects': {
      return <TiledListSt key={key}>{content}</TiledListSt>;
    }
    default: {
      return <span>{content}</span>;
    }
  }
};

export const renderTopic = (topic: ITopic): JSX.Element => (
  <TopicSt {...topic} key={topic.title} />
);

export const renderPosition = (position: IPosition): JSX.Element => (
  <Position
    {...position}
    key={`${position.company}-${position.location}`}
  />
);

export const renderProject = (project: IProject): JSX.Element => (
  <TileSt key={project.title}>
    <ProjectSt {...project} />
  </TileSt>
);

export const renderContent = (item: ContentTypes, key?: string): JSX.Element => {
  if (isContentItem(item)) {
    const { content, tagName } = item;

    if (Array.isArray(content)) {
      return renderTag(
        tagName,
        content.map((contentItem: ContentTypes, idx: number) => renderContent(contentItem, `${tagName}-${idx}`)),
        key,
      );
    }

    return renderTag(tagName, content, key);
  }

  if (isTopic(item)) {
    return renderTopic(item);
  }

  if (isPosition(item)) {
    return renderPosition(item);
  }

  if (isProject(item)) {
    return renderProject(item);
  }

  return <span>Unknown element</span>;
};

export const ContentItem = (contentItem: IProps): JSX.Element => renderContent(contentItem);

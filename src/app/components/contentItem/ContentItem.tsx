import * as React from 'react';
import {
  ContentTypes,
  ContentItemProps,
  ImageProps,
  PositionProps,
  ProjectProps,
  TopicProps,
} from 'models';
import {
  isContentItem,
  isLink,
  isTopic,
  isPosition,
  isProject,
  splitContent,
  toLinkObject,
} from 'utils';
import Position from 'app/components/position/Position';
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

export interface Props extends ContentItemProps {
  className?: string;
  key?: string;
}

export const processContent = (content: string): (string | JSX.Element)[] => {
  const split: string[] = splitContent(content);
  const processed = split.map((item: string) => {
    if (isLink(item)) {
      return <LinkSt {...toLinkObject(item)} key={item} />;
    }

    return item;
  });

  return processed;
};

export const renderTag = (
  tagName: string,
  content: ContentItemProps,
  key?: string
): JSX.Element => {
  switch (tagName) {
    case 'section': {
      return <SectionSt key={key}>{content}</SectionSt>;
    }
    case 'img': {
      return (
        <ImageContainerSt key={key}>
          <PictureSt {...((content as unknown) as ImageProps)} />
        </ImageContainerSt>
      );
    }
    case 'p': {
      return (
        <ParagraphSt key={key}>
          {processContent((content as unknown) as string)}
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
          {processContent((content as unknown) as string)}
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

export const renderTopic = (topic: TopicProps): JSX.Element => (
  <TopicSt {...topic} key={topic.title} />
);

export const renderPosition = (position: PositionProps): JSX.Element => (
  <Position {...position} key={`${position.company}-${position.location}`} />
);

export const renderProject = (project: ProjectProps): JSX.Element => (
  <TileSt key={project.title}>
    <ProjectSt {...project} />
  </TileSt>
);

export const renderContent = (
  item: ContentTypes,
  key?: string
): JSX.Element => {
  if (isContentItem(item as ContentItemProps)) {
    const { content, tagName } = item as ContentItemProps;

    if (Array.isArray(content)) {
      return renderTag(
        tagName,
        content.map(
          (contentItem: ContentTypes, idx: number): JSX.Element =>
            renderContent(contentItem, `${tagName}-${idx}`)
        ),
        key
      );
    }

    return renderTag(tagName, content as ContentItemProps, key);
  }

  if (isTopic(item as TopicProps)) {
    return renderTopic(item as TopicProps);
  }

  if (isPosition(item as PositionProps)) {
    return renderPosition(item as PositionProps);
  }

  if (isProject(item as ProjectProps)) {
    return renderProject(item as ProjectProps);
  }

  return <span>Unknown element</span>;
};

const ContentItem = (contentItem: Props): JSX.Element =>
  renderContent(contentItem);

export default ContentItem;

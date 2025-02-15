import { memo } from 'react';

import type {
  ContentItem,
  Image,
  Position,
  Project as ProjectModel,
  Topic,
} from '@models/interfaces';
import { isLink, splitContent, toLinkObject } from '@utils/general';
import Text from '@components/text';
import Job from '@components/contentRenderer/position';
import Project from '@components/contentRenderer/project';
import InlineLink from '@components/contentRenderer/inlinelink';
import TopicItem from '@components/contentRenderer/topic';
import Picture from '@components/contentRenderer/picture';
import classNames from './ContentWrapper.module.css';

type TagName =
  | React.ElementType
  | 'section'
  | 'jobs'
  | 'ul'
  | 'topics'
  | 'projects'
  | 'li'
  | 'job'
  | 'topic'
  | 'img'
  | 'project';

export interface Props {
  tagName: TagName;
  content?: ContentItem;
  children?: React.ReactNode;
}

const processContent = (content: string): React.ReactNode => {
  const split: string[] = splitContent(content);
  const processed = split.map((item: string) => {
    if (isLink(item)) {
      return (
        <InlineLink
          className={classNames.link}
          {...toLinkObject(item)}
          key={item}
        />
      );
    }

    return item;
  });

  return processed;
};

const ContentWrapper = ({
  tagName,
  content,
  children,
}: Props): React.ReactNode => {
  switch (tagName) {
    case 'section':
    case 'jobs': {
      return <section>{children}</section>;
    }
    case 'ul': {
      return <ul className={classNames.list}>{children}</ul>;
    }
    case 'topics': {
      return <ul className={classNames.topics}>{children}</ul>;
    }
    case 'projects': {
      return <ul className={classNames.projects}>{children}</ul>;
    }
    case 'li': {
      return (
        <Text className="list-item" type="li">
          {processContent(content as unknown as string)}
        </Text>
      );
    }
    case 'job': {
      return <Job {...(content as unknown as Position)} />;
    }
    case 'topic': {
      return (
        <TopicItem
          className={classNames.topicItem}
          {...(content as unknown as Topic)}
        />
      );
    }
    case 'img': {
      return (
        <div className={classNames.photoContainer}>
          <Picture
            className={classNames.photoImage}
            {...(content as unknown as Image)}
          />
        </div>
      );
    }
    case 'project': {
      return (
        <li className={classNames.projectTile}>
          <Project {...(content as unknown as ProjectModel)} />
        </li>
      );
    }
    default: {
      return (
        <Text type={tagName}>
          {processContent(content as unknown as string)}
        </Text>
      );
    }
  }
};

const MemoContentWrapper = memo(ContentWrapper);

export default MemoContentWrapper;

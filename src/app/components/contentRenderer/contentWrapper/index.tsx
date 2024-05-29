import { memo } from 'react';

import {
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
import {
  List,
  ListItem,
  Link,
  Photo,
  PhotoContainer,
  Projects,
  ProjectTile,
  TopicItem,
  Topics,
} from './ContentWrapper.css';

export interface Props {
  tagName: string;
  content?: ContentItem;
  children?: React.ReactNode;
}

const processContent = (content: string): React.ReactNode => {
  const split: string[] = splitContent(content);
  const processed = split.map((item: string) => {
    if (isLink(item)) {
      return <Link {...toLinkObject(item)} key={item} />;
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
      return <List>{children}</List>;
    }
    case 'topics': {
      return <Topics>{children}</Topics>;
    }
    case 'projects': {
      return <Projects>{children}</Projects>;
    }
    case 'li': {
      return (
        <ListItem type="li">
          {processContent(content as unknown as string)}
        </ListItem>
      );
    }
    case 'job': {
      return <Job {...(content as unknown as Position)} />;
    }
    case 'topic': {
      return <TopicItem {...(content as unknown as Topic)} />;
    }
    case 'img': {
      return (
        <PhotoContainer>
          <Photo {...(content as unknown as Image)} />
        </PhotoContainer>
      );
    }
    case 'project': {
      return (
        <ProjectTile>
          <Project {...(content as unknown as ProjectModel)} />
        </ProjectTile>
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

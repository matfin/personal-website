import Picture from '@components/contentRenderer/picture';
import Job from '@components/contentRenderer/position';
import ProcessContent from '@components/contentRenderer/processContent';
import Project from '@components/contentRenderer/project';
import TopicItem from '@components/contentRenderer/topic';
import Text from '@components/text';
import type {
  Content,
  Image,
  Position,
  Project as ProjectModel,
  TagName,
  Topic,
} from '@models/types';
import classNames from './ContentWrapper.module.css';

export type Props = {
  tagName: TagName;
  content?: Content;
  children?: React.ReactNode;
};

type ComponentMapKey =
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

const componentMap: Record<ComponentMapKey, React.FC<Props>> = {
  section: ({ children }) => <section>{children}</section>,
  jobs: ({ children }) => <section>{children}</section>,
  ul: ({ children }) => <ul className={classNames.list}>{children}</ul>,
  topics: ({ children }) => <ul className={classNames.topics}>{children}</ul>,
  projects: ({ children }) => (
    <ul className={classNames.projects}>{children}</ul>
  ),
  li: ({ content }) => (
    <Text className="list-item" type="li">
      <ProcessContent
        classNames={{ link: classNames.link }}
        content={content as string}
      />
    </Text>
  ),
  job: ({ content }) => <Job {...(content as Position)} />,
  topic: ({ content }) => (
    <TopicItem className={classNames.topicItem} {...(content as Topic)} />
  ),
  img: ({ content }) => (
    <div className={classNames.photoContainer}>
      <Picture className={classNames.photoImage} {...(content as Image)} />
    </div>
  ),
  project: ({ content }) => (
    <li className={classNames.projectTile}>
      <Project {...(content as ProjectModel)} />
    </li>
  ),
};

const ContentWrapper = ({
  tagName,
  content,
  children,
}: Props): React.ReactNode => {
  if (componentMap[tagName as ComponentMapKey]) {
    const Component = componentMap[tagName as ComponentMapKey];

    return (
      <Component tagName={tagName} content={content}>
        {children}
      </Component>
    );
  }

  return (
    <Text type={tagName as React.ElementType}>
      <ProcessContent
        classNames={{ link: classNames.link }}
        content={content as string}
      />
    </Text>
  );
};

export default ContentWrapper;

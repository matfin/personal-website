export type TagName =
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

export type StaticReqProps = {
  url: string;
};

export type Image = {
  name: string;
  fileType: string;
  title: string;
};

export type Topic = {
  category: string;
  deprecated: boolean;
  description: string;
  slug: string;
  title: string;
};

export type Project = {
  description: string;
  releaseDate?: string;
  slug: string;
  title: string;
  topics?: string[];
};

export type Position = {
  company: string;
  endDate?: string;
  location: string;
  role: string;
  startDate: string;
  tasks: string[];
  topics: Topic[];
};

export type SingleContent =
  | Position
  | ContentItem
  | Image
  | Project
  | Topic
  | string;

export type Content = SingleContent | SingleContent[];

export type ContentItem = {
  id: string;
  tagName: TagName;
  content: Content;
};

export type Page = {
  description: string;
  slug: string;
  title: string;
  root: ContentItem | null;
};

export type Link = {
  text: string;
  title?: string;
  url: string;
};

export type PathNesting = {
  isNested: boolean;
  parts: string[];
};

export type NavLink = {
  base: string;
  title: string;
  to: string;
};

export type NavLinks = Record<string, { title: string; to: string }>;

export type FetchError = {
  errorMessage: string;
};

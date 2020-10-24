export type ContentTypes =
  | ContentItemProps
  | ImageProps
  | TopicProps
  | PositionProps
  | ProjectProps
  | string;

export interface CategoryProps {
  title: string;
  description?: string;
}

export interface TopicProps {
  logoPath?: string;
  category: string;
  deprecated?: boolean;
  description: string;
  slug: string;
  title: string;
}

export interface LinkProps {
  text: string;
  title?: string;
  url: string;
}

export interface ImageProps {
  fileType: string;
  name: string;
  title: string;
}

export interface ContentItemProps {
  content: ContentTypes | ContentTypes[];
  id?: string;
  tagName: string;
}

export interface PageProps {
  contents: ContentItemProps[];
  description: string;
  slug: string;
  title: string;
}

export interface PositionProps {
  company: string;
  endDate?: string; // TODO better type safety
  location: string;
  role: string;
  startDate: string; // TODO better type safety
  tasks: string[];
  topics: TopicProps[];
}

export interface ProjectProps {
  description: string;
  releaseDate?: string; // TODO better type safety
  slug: string;
  title: string;
  topics?: string[];
}

export interface CacheDictionaryProps {
  [index: string]: string;
}

export interface PathNestingProps {
  isNested: boolean;
  parts: string[];
}

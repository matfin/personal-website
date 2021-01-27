import { ContentTypes } from './types';

export interface StaticReqProps {
  url: string;
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
  content:
    | ContentTypes
    | ContentTypes[]
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
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

export interface PathNestingProps {
  isNested: boolean;
  parts: string[];
}

export interface NavLinkProps {
  base: string;
  title: string;
  to: string;
}

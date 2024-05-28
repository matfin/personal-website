export interface StaticReqProps {
  url: string;
}

export interface Image {
  name: string;
  fileType: string;
  title: string;
}

export interface Topic {
  category: string;
  deprecated: boolean;
  description: string;
  slug: string;
  title: string;
}

export interface Project {
  description: string;
  releaseDate?: string;
  slug: string;
  title: string;
  topics?: string[];
}

export interface Position {
  company: string;
  endDate?: string;
  location: string;
  role: string;
  startDate: string;
  tasks: string[];
  topics: Topic[];
}

export type SingleContent =
  | Position
  | ContentItem
  | Image
  | Project
  | Topic
  | string;
export type Content = SingleContent | SingleContent[];

export interface ContentItem {
  id: string;
  tagName: string;
  content: Content;
}

export interface Page {
  description: string;
  slug: string;
  title: string;
  root: ContentItem | null;
}

export interface Link {
  text: string;
  title?: string;
  url: string;
}

export interface PathNesting {
  isNested: boolean;
  parts: string[];
}

export interface NavLink {
  base: string;
  title: string;
  to: string;
}

export interface FetchError {
  errorMessage: string;
}

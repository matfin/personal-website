export interface IAppConfig {
  readonly appIconSizes: number[];
  readonly apiUrl: string;
  readonly cacheName: string;
  readonly canonicalUrl: string;
  readonly enableCache: boolean;
  readonly port: string;
}

export type ContentTypes =
  | IContentItem
  | IImage
  | ITopic
  | IPosition
  | IProject
  | string;

export interface ICategory {
  title: string;
  description?: string;
}

export interface ITopic {
  logoPath?: string;
  category: string;
  deprecated?: boolean;
  description: string;
  slug: string;
  title: string;
}

export interface ILink {
  text: string;
  title?: string;
  url: string;
}

export interface IImage {
  fileType: string;
  name: string;
  title: string;
}

export interface IContentItem {
  content: ContentTypes;
  id?: string;
  tagName: string;
}

export interface IPage {
  contents: IContentItem[];
  description: string;
  slug: string;
  title: string;
}

export interface IPosition {
  company: string;
  endDate?: string; // TODO better type safety
  location: string;
  role: string;
  startDate: string; // TODO better type safety
  tasks: string[];
  topics: ITopic[];
}

export interface IProject {
  description: string;
  releaseDate?: string; // TODO better type safety
  slug: string;
  title: string;
  topics?: string[];
}

export interface CacheDictionary {
  [index: string]: string;
}

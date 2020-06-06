export interface IAppConfig {
  readonly apiUrl: string;
  readonly canonicalUrl: string;
  readonly appIconSizes: number[];
  readonly cacheName: string;
  readonly port: string;
  enableCache: boolean;
}

export type ContentTypes = IContentItem | ITopic | IPosition | IProject | string;

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
  text: string,
  title?: string,
  url: string,
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
  releaseDate: string; // TODO better type safety
  slug: string;
  title: string;
  topics: string[];
  url?: string;
}

export interface CacheDictionary {
  [index: string]: string,
}

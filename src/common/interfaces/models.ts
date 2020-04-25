export interface IAppConfig {
  readonly appIconSizes: number[],
  readonly baseUrl: string;
  readonly cacheName: string;
  enableCache: boolean,
}

export interface IContentItem {
  tagName: string,
  content: string | IContentItem,
}

export interface ITopic {
  title: string,
  description: string,
}

export interface IPage {
  contents: IContentItem[],
  description: string,
  slug: string,
  title: string,
}

export interface IJob {
  contents: IContentItem[],
  endDate?: Date,
  role: string,
  startDate: Date,
  topics: ITopic[],
}



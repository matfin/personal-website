import type { Page } from '@models/types';

export type PageState = {
  error: Error | null;
  pending: boolean;
  page: Page | null;
};

import { Page } from '@models';

export interface PageState {
  error: Error | null;
  pending: boolean;
  page: Page | null;
}

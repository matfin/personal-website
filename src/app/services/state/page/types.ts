import { Page } from '@models/interfaces';

export interface PageState {
  error: Error | null;
  pending: boolean;
  page: Page | null;
}

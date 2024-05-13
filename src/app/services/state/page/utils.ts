import type { PayloadAction } from '@reduxjs/toolkit';

import { normaliseContent } from '@utils';
import { ContentItem, Page } from '@models';

export const normalisePageContent = ({
  payload,
}: PayloadAction<Page>): Page | null => {
  const root: ContentItem | null = payload?.root
    ? normaliseContent(payload.root)
    : null;
  const page: Page | null = payload ? { ...payload, root } : null;

  return page;
};

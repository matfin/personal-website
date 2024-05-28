import type { PayloadAction } from '@reduxjs/toolkit';

import { normaliseContent } from '@utils/mappers';
import { ContentItem, Page } from '@models/interfaces';

export const normalisePageContent = ({
  payload,
}: PayloadAction<Page>): Page | null => {
  const root: ContentItem | null = payload?.root
    ? normaliseContent(payload.root)
    : null;
  const page: Page | null = payload ? { ...payload, root } : null;

  return page;
};

import { ContentItem } from '@models/interfaces';
import type { Content } from '@models/interfaces';

export const normaliseContent = (node?: ContentItem): ContentItem | null =>
  node
    ? {
        ...node,
        id: crypto.randomUUID(),
        content: Array.isArray(node.content)
          ? node.content.map(
              (content: Content): ContentItem =>
                normaliseContent(content as ContentItem)!,
            )
          : node.content,
      }
    : null;

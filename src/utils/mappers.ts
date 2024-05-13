import { ContentItem } from '@models';
import type { Content } from '@models';

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

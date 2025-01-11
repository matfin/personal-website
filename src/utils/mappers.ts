import type { ContentItem, Content } from '@models/interfaces';

export const normaliseContent = (node?: ContentItem): ContentItem | null =>
  node
    ? {
        ...node,
        id: crypto.randomUUID(),
        content: Array.isArray(node.content)
          ? node.content
              .map((content: Content): ContentItem | null =>
                normaliseContent(content as ContentItem),
              )
              .filter((item): item is ContentItem => item !== null)
          : node.content,
      }
    : null;

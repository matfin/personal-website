import type { ContentItem } from '@models/types';
import ContentWrapper from './contentWrapper';

export type Props = {
  root: ContentItem | null;
};

const ContentRenderer = ({ root }: Props): React.ReactNode | null => {
  const hasNestedContent: boolean = Array.isArray(root?.content);

  if (!root) {
    return null;
  }

  if (hasNestedContent) {
    return (
      <>
        {(root?.content as ContentItem[]).map(
          (item: ContentItem): React.ReactNode => (
            <ContentWrapper
              key={item.id}
              content={item.content as ContentItem}
              tagName={item.tagName}
            >
              <ContentRenderer key={item.id} root={item} />
            </ContentWrapper>
          ),
        )}
      </>
    );
  }

  return <>{root.content}</>;
};

export default ContentRenderer;

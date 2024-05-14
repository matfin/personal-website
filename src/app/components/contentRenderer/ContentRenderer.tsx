import { ContentItem } from '@models';
import ContentWrapper from './contentWrapper';

export interface Props {
  root: ContentItem | null;
}

const ContentRenderer = ({ root }: Props): React.ReactNode => {
  const hasNestedContent: boolean = Array.isArray(root?.content);

  return (
    <>
      {hasNestedContent ? (
        (root?.content as ContentItem[]).map(
          (item: ContentItem): React.ReactNode => (
            <ContentWrapper
              key={item.id}
              content={item.content as ContentItem}
              tagName={item.tagName}
            >
              <ContentRenderer key={item.id} root={item} />
            </ContentWrapper>
          ),
        )
      ) : (
        <>{root?.content}</>
      )}
    </>
  );
};

export default ContentRenderer;

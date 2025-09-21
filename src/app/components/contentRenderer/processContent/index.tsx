import InlineLink from '@components/contentRenderer/inlinelink';
import { isLink, splitContent, toLinkObject } from '@utils/general';

type Props<T> = {
  classNames?: Record<string, string>;
  content: T;
};

const ProcessContent = <T extends string>({
  classNames,
  content,
}: Props<T>): React.ReactNode => {
  const split: string[] = splitContent(content);

  const processed = split.map((item: string) => {
    if (isLink(item)) {
      return (
        <InlineLink
          className={classNames?.link}
          {...toLinkObject(item)}
          key={item}
        />
      );
    }

    return item;
  });

  return <>{processed}</>;
};

export default ProcessContent;

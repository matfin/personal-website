import usePage from '@hooks/usePage';

import Meta from '@components/meta';
import { BackButton, ErrorMessage } from './components';
import ContentRenderer from '@components/contentRenderer';
import Footer from '@components/footer';
import { LoadingSpinner } from './Page.css';

const Page = (): React.ReactNode => {
  const { error, page, pending, isNested, parts } = usePage();

  return pending ? (
    <LoadingSpinner />
  ) : (
    <>
      <Meta
        description={page?.description}
        title={page?.title}
        slug={page?.slug}
      />
      {isNested && <BackButton href={`/${[parts[0]]}/`} />}
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <ContentRenderer root={page?.root ?? null} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;

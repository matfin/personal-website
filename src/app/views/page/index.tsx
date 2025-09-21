import ContentRenderer from '@components/contentRenderer';
import Footer from '@components/footer';
import Loading from '@components/loading';
import Meta from '@components/meta';
import usePage from '@hooks/usePage';
import { BackButton, ErrorMessage } from './components';
import classNames from './Page.module.css';

const Page = (): React.ReactNode => {
  const { error, page, pending, isNested, parts } = usePage();

  return pending ? (
    <Loading className={classNames.loadingSpinner} />
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

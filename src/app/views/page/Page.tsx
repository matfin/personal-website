import React, { useEffect } from 'react';
import { IContentItem, IPage } from 'common/interfaces';
import { ContentItem } from 'app/components/contentItem/ContentItem';
import PageSt from './Page.css';

export interface IProps {
  error: any,
  pending: boolean,
  page: IPage,
  slug: string,
  fetchPage(slug: string): void,
  resetPage(): void,
};

const pageContents = ({ contents }: IPage): JSX.Element[] =>
  contents.map((item: IContentItem, key: number): JSX.Element => (
    <ContentItem {...item} key={`${key}`} />
  )
);

const loadingSpinner = (): JSX.Element => <div>Loading!</div>;
const errorMessage = (error: any): JSX.Element => <div>{error.toString()}</div>;

const Page = ({
  error,
  pending,
  page,
  slug,
  fetchPage,
  resetPage,
}: IProps): JSX.Element => {

  useEffect((): any => {
    fetchPage(slug);

    return resetPage;
  }, [slug]);

  return (
    <PageSt>
      {pending && loadingSpinner()}
      {error && errorMessage(error)}
      {!pending && page && pageContents(page)}
    </PageSt>
  );
};

export default Page;

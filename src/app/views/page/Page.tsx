import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IPage } from 'common/interfaces';
import PageSt from './Page.css';

export interface IProps {
  error: any,
  pending: boolean,
  page: IPage,
  fetchPage(slug: string): void,
  resetPage(): void,
};

const Page = ({
  error,
  pending,
  page,
  fetchPage,
  resetPage,
}: IProps): JSX.Element => {
  const { slug } = useParams();

  useEffect((): any => {
    fetchPage(slug || 'home');

    return resetPage;
  }, [slug]);

  return (
    <PageSt>{page?.title}</PageSt>
  );
};

export default Page;

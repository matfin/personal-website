import React, { useEffect, useState } from 'react';
import { IContentItem, IPage } from 'common/interfaces';
import { ContentItem } from 'app/components/contentItem/ContentItem';
import {
  BurgerSt,
  ErrorSt,
  FooterSt,
  NavSt,
  LoadingSt,
  MainSt,
  PageSt,
  SideSt,
} from './Page.css';

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
const loadingSpinner = (): JSX.Element => <LoadingSt>Loading!</LoadingSt>;
const errorMessage = (error: any): JSX.Element => <ErrorSt>{error.toString()}</ErrorSt>;

const Page = ({
  error,
  pending,
  page,
  slug,
  fetchPage,
  resetPage,
}: IProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const toggleMenu = (): void => setShowMenu(!showMenu);
  const hideMenu = (): void => setShowMenu(false);

  useEffect((): any => {
    setShowMenu(false);
    fetchPage(slug);

    return resetPage;
  }, [slug]);

  return (
    <>
      <BurgerSt onClick={toggleMenu}>
        🍔
      </BurgerSt>
      <PageSt navRevealed={showMenu}>
        <SideSt revealed={showMenu} onClick={hideMenu}>
          <NavSt />
          <FooterSt />
        </SideSt>
        <MainSt onClick={hideMenu}>
          {pending && loadingSpinner()}
          {!pending && error && errorMessage(error)}
          {!pending && page && pageContents(page)}
        </MainSt>
      </PageSt>
    </>
  );
};

export default Page;

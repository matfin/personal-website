import React, { useEffect, useState } from 'react';
import { Meta } from 'app/components/meta/Meta';
import { setBodyOverflow } from 'common/utils';
import { IContentItem, IPage } from 'common/interfaces';
import { ContentItem } from 'app/components/contentItem/ContentItem';
import { Nav } from 'app/components/nav/Nav';
import {
  BurgerSt,
  ErrorSt,
  FooterSt,
  LoadingSt,
  MainSt,
  PageSt,
  SideContainerSt,
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

  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
    setBodyOverflow(!!showMenu);
  };

  const hideMenu = (): void => {
    setShowMenu(false);
    document.body.style.overflow = 'auto';
  };

  useEffect((): any => {
    setShowMenu(false);
    fetchPage(slug);

    return resetPage;
  }, [slug]);

  return (
    <>
      <BurgerSt navRevealed={showMenu} onClick={toggleMenu} />
      <PageSt navRevealed={showMenu}>
        <SideSt revealed={showMenu} onClick={hideMenu}>
          <SideContainerSt>
            <Nav />
          </SideContainerSt>
        </SideSt>
        {
          pending ? (
            <LoadingSt />
          ) : (
            <>
              <Meta
                description={page?.description}
                title={page?.title}
                slug={page?.slug}
              />
              <MainSt onClick={hideMenu}>
                {!pending && error && errorMessage(error)}
                {!pending && page && pageContents(page)}
              </MainSt>
              <FooterSt />
            </>
          )
        }
      </PageSt>
    </>
  );
};

export default Page;

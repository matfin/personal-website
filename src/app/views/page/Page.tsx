import React, { useEffect, useState } from 'react';
import { Meta } from 'app/components/meta/Meta';
import { setBodyOverflow } from 'common/utils';
import {
  IContentItem,
  IPage,
  ToggleValue,
  ThemeType,
} from 'common/interfaces';
import { ContentItem } from 'app/components/contentItem/ContentItem';
import { Nav } from 'app/components/nav/Nav';
import { Toggle } from 'app/components/toggle/Toggle';
import {
  BurgerSt,
  ErrorSt,
  FooterSt,
  LoadingSt,
  MainSt,
  PageSt,
  SideSt,
} from './Page.css';

export interface IProps {
  currentTheme: ThemeType,
  error: any,
  pending: boolean,
  page: IPage,
  slug: string,
  fetchPage(slug: string): void,
  resetPage(): void,
  switchTheme(theme: ThemeType): void,
}

const pageContents = ({ contents }: IPage): JSX.Element[] => (
  contents.map((item: IContentItem): JSX.Element => (
    <ContentItem {...item} key={item.id} />
  ))
);

const errorMessage = (error: any): JSX.Element => <ErrorSt>{error.toString()}</ErrorSt>;

const Page = ({
  currentTheme,
  error,
  pending,
  page,
  slug,
  fetchPage,
  resetPage,
  switchTheme,
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

  const toggleTheme = (toggleValue: ToggleValue): void => {
    if (toggleValue === ToggleValue.ON) {
      switchTheme(ThemeType.NIGHT);
    } else {
      switchTheme(ThemeType.DAY);
    }
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
        <SideSt
          aria-label="Sidebar with navigation"
          revealed={showMenu}
          onClick={hideMenu}
        >
          <Nav
            aria-label="Navigation"
            role="navigation"
          >
            <Toggle
              data-testid="toggle"
              label="Theme"
              value={currentTheme === ThemeType.DAY ? ToggleValue.OFF : ToggleValue.ON}
              onToggle={toggleTheme}
            />
          </Nav>
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
              <MainSt
                aria-label="Main content"
                onClick={hideMenu}
              >
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

import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Meta from 'app/components/meta/Meta';
import { normalisePathname, pathNesting, setBodyOverflow } from 'utils';
import { ContentItemProps, PageProps, ToggleValue, ThemeType } from 'models';
import ContentItem from 'app/components/contentItem/ContentItem';
import Nav from 'app/components/nav/Nav';
import Toggle from 'app/components/toggle/Toggle';
import {
  BackSt,
  BurgerSt,
  ErrorSt,
  FooterSt,
  LoadingSt,
  MainSt,
  PageSt,
  SideSt,
} from './Page.css';

export interface Props {
  currentTheme: ThemeType;
  error: Error | null;
  pending: boolean;
  page: PageProps | null;
  fetchPageRequest(slug: string): void;
  resetPage(): void;
  switchTheme(theme: ThemeType): void;
}

const pageContents = ({ contents }: PageProps): React.ReactElement[] =>
  contents.map(
    (item: ContentItemProps): React.ReactElement => (
      <ContentItem {...item} key={item.id} />
    ),
  );

const errorMessage = (error: Error): React.ReactElement => (
  <ErrorSt>{error.toString()}</ErrorSt>
);

const backButton = (href: string): React.ReactElement => (
  <BackSt arial-label="back" data-testid="backbutton" to={href} />
);

const Page = ({
  currentTheme,
  error,
  pending,
  page,
  fetchPageRequest,
  resetPage,
  switchTheme,
}: Props): React.ReactElement => {
  const { pathname } = useLocation();
  const { isNested, parts } = pathNesting(normalisePathname(pathname));
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = useCallback((): void => {
    setShowMenu((showMenu: boolean) => !showMenu);
    setBodyOverflow(!!showMenu);
  }, [setShowMenu, showMenu]);

  const hideMenu = useCallback((): void => {
    setShowMenu(false);
    setBodyOverflow(true);
  }, []);

  const toggleTheme = useCallback(
    (toggleValue: ToggleValue): void => {
      const theme: ThemeType =
        toggleValue === ToggleValue.ON ? ThemeType.NIGHT : ThemeType.DAY;

      switchTheme(theme);
    },
    [switchTheme],
  );

  useEffect((): (() => void) => {
    const slug: string = normalisePathname(pathname);

    setShowMenu(false);
    fetchPageRequest(slug || 'index');
    window.scrollTo(0, 0);

    return resetPage;
  }, [pathname, fetchPageRequest, resetPage]);

  return (
    <>
      <BurgerSt
        navrevealed={showMenu ? 'true' : undefined}
        onClick={toggleMenu}
      />
      <PageSt navrevealed={showMenu ? 'true' : undefined}>
        <SideSt
          aria-label="Sidebar with navigation"
          $revealed={showMenu}
          onClick={hideMenu}
        >
          <Nav>
            <Toggle
              data-testid="toggle"
              aria-label="Toggle theme"
              value={
                currentTheme === ThemeType.DAY
                  ? ToggleValue.OFF
                  : ToggleValue.ON
              }
              onToggle={toggleTheme}
            />
          </Nav>
        </SideSt>
        {pending ? (
          <LoadingSt />
        ) : (
          <>
            <Meta
              description={page?.description}
              title={page?.title}
              slug={page?.slug}
            />
            <MainSt
              $nested={isNested}
              aria-label="Main content"
              onClick={hideMenu}
            >
              {isNested && backButton(`/${parts[0]}/`)}
              {!pending && error && errorMessage(error)}
              {!pending && page && pageContents(page)}
            </MainSt>
            <FooterSt />
          </>
        )}
      </PageSt>
    </>
  );
};

export default Page;

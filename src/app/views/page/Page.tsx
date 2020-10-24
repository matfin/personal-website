import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Meta from 'app/components/meta/Meta';
import { pathNesting, setBodyOverflow } from 'common/utils';
import {
  ContentItemProps,
  PageProps,
  ToggleValue,
  ThemeType,
} from 'common/models';
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
  fetchPage(slug: string): void;
  resetPage(): void;
  switchTheme(theme: ThemeType): void;
}

const pageContents = ({ contents }: PageProps): JSX.Element[] =>
  contents.map(
    (item: ContentItemProps): JSX.Element => (
      <ContentItem {...item} key={item.id} />
    )
  );

const errorMessage = (error: Error): JSX.Element => (
  <ErrorSt>{error.toString()}</ErrorSt>
);

const backButton = (href: string): JSX.Element => (
  <BackSt arial-label="back" data-testid="backbutton" to={href} />
);

const Page = ({
  currentTheme,
  error,
  pending,
  page,
  fetchPage,
  resetPage,
  switchTheme,
}: Props): JSX.Element => {
  const { pathname } = useLocation();
  const { isNested, parts } = pathNesting(pathname);
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

  useEffect((): (() => void) => {
    const slug = pathname.substring(1);

    setShowMenu(false);
    fetchPage(slug || 'home');
    window.scrollTo(0, 0);

    return resetPage;
  }, [pathname]);

  return (
    <>
      <BurgerSt navRevealed={showMenu} onClick={toggleMenu} />
      <PageSt navRevealed={showMenu}>
        <SideSt
          aria-label="Sidebar with navigation"
          revealed={showMenu}
          onClick={hideMenu}
        >
          <Nav aria-label="Navigation" role="navigation">
            <Toggle
              data-testid="toggle"
              label="Theme"
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
              nested={isNested}
              aria-label="Main content"
              onClick={hideMenu}
            >
              {isNested && backButton(`/${parts[0]}`)}
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

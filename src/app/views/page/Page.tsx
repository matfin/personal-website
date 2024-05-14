import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { usePage, useApp } from '@hooks';

import Meta from '@components/meta';
import { normalisePathname, pathNesting, setBodyOverflow } from '@utils';
import { ToggleValue, ThemeType } from '@models';
import { BackButton, ErrorMessage } from './components';
import Nav from '@components/nav';
import ContentRenderer from '@components/contentRenderer';
import Toggle from '@components/toggle';
import {
  BurgerSt,
  FooterSt,
  LoadingSt,
  MainSt,
  PageSt,
  SideSt,
} from './Page.css';

const Page = (): React.ReactNode => {
  const { pathname } = useLocation();
  const normalisedPathname: string = normalisePathname(pathname);

  const { isNested, parts } = pathNesting(normalisedPathname);
  const { error, page, pending } = usePage(normalisedPathname);
  const { currentTheme, toggleTheme } = useApp();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = useCallback((): void => {
    setShowMenu((showMenu: boolean) => !showMenu);
    setBodyOverflow(!!showMenu);
  }, [setShowMenu, showMenu]);

  const hideMenu = useCallback((): void => {
    setShowMenu(false);
    setBodyOverflow(true);
  }, []);

  useEffect((): void => {
    setShowMenu(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <BurgerSt
        data-testid="menubutton"
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
              {isNested && <BackButton href={`/${[parts[0]]}/`} />}
              {error && <ErrorMessage error={error} />}
              {!error && page?.root && <ContentRenderer root={page.root} />}
            </MainSt>
            <FooterSt />
          </>
        )}
      </PageSt>
    </>
  );
};

export default Page;

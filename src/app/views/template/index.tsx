import { useCallback, useState } from 'react';

import { ToggleValue, ThemeType } from '@models/enums';
import { setBodyOverflow } from '@utils/general';
import useApp from '@hooks/useApp';
import usePage from '@hooks/usePage';
import Nav from '@components/nav';
import Toggle from '@components/toggle';
import { Aside, Container, Main, MenuBurger } from './Template.css';

interface Props {
  children?: React.ReactNode;
}

const Template = ({ children }: Props): React.ReactNode => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { currentTheme, toggleTheme } = useApp();
  const { isNested } = usePage();

  const toggleMenu = useCallback((): void => {
    setShowMenu((showMenu: boolean) => !showMenu);
    setBodyOverflow(!!showMenu);
  }, [showMenu]);

  const hideMenu = useCallback((): void => {
    setShowMenu(false);
    setBodyOverflow(true);
  }, []);

  return (
    <>
      <MenuBurger
        data-testid="menubutton"
        navrevealed={showMenu ? 'true' : undefined}
        onClick={toggleMenu}
      />
      <Container $navrevealed={showMenu ? 'true' : undefined}>
        <Aside
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
        </Aside>
        <Main $nested={isNested} onClick={hideMenu} aria-label="Main content">
          {children}
        </Main>
      </Container>
    </>
  );
};

export default Template;

import { useCallback, useState } from 'react';
import { clsx } from 'clsx/lite';

import { setBodyOverflow } from '@utils/general';
import usePage from '@hooks/usePage';
import Nav from '@components/nav';
import MenuButton from '@components/menubutton';
import classNames from './Template.module.css';

interface Props {
  children?: React.ReactNode;
}

const Template = ({ children }: Props): React.ReactNode => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
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
      <MenuButton
        className={clsx('common-button', classNames.menuBurger)}
        data-testid="menubutton"
        navrevealed={showMenu ? 'true' : undefined}
        onClick={toggleMenu}
      />
      <div
        className={clsx(
          classNames.container,
          showMenu && classNames.navRevealed,
        )}
      >
        <aside
          data-testid="aside"
          className={clsx(classNames.aside, showMenu && classNames.revealed)}
          aria-label="Sidebar with navigation"
          onClick={hideMenu}
          onKeyDown={hideMenu}
        >
          <Nav />
        </aside>
        <main
          className={clsx(classNames.main, isNested && classNames.nested)}
          onClick={hideMenu}
          onKeyDown={hideMenu}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Template;

'use client';

import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import MenuIcon from '@components/icons/menu-icon';
import HomeIcon from '@components/icons/home-icon';
import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';
import { useTranslation } from 'src/app/i18n/client';
import AccountIcon from '@components/icons/account-icon';
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});
const MobileMenu = dynamic(() => import('@layouts/header/mobile-menu'));

export default function BottomNavigation({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'home');
  const { openSidebar, closeSidebar, displaySidebar, toggleMobileSearch } =
    useUI();

  const dir = getDirection(lang);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <>
      <div className="lg:hidden fixed z-30 -bottom-0.5  flex items-center justify-between shadow-bottomNavigation body-font bg-brand-light w-full h-16 px-4 md:px-6 lg:px-8 text-brand-muted pb-0.5">
        <Link
          href={`/${lang}${ROUTES.HOME}`}
          className="flex flex-col items-center"
        >
          <HomeIcon />
          Asosiy
        </Link>

        <button
          className="relative flex flex-col items-center justify-center h-auto shrink-0 focus:outline-none"
          onClick={toggleMobileSearch}
          aria-label="Search Button"
        >
          <SearchIcon />
          Search
        </button>
        <button
          aria-label="Menu"
          className="flex flex-col items-center justify-center outline-none gap-1 shrink-0 focus:outline-none"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
          Kategoriya
        </button>
        <Link
          className="flex items-center flex-col "
          href={`/${lang}${ROUTES.ORDERS}`}
        >
          <AccountIcon lang={lang} />
          Account
        </Link>
      </div>
      <Drawer
        className="w-[375px]"
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        // @ts-ignore
        level={null}
        contentWrapperStyle={contentWrapperCSS}
        {...motionProps}
      >
        <MobileMenu lang={lang} />
      </Drawer>
    </>
  );
}

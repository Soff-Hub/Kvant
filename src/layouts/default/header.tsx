import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { useActiveScroll } from '@utils/use-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import MenuIcon from '@components/icons/menu-icon';
import HeaderMenu from '@layouts/header/header-menu';
import LanguageSwitcher from '@components/ui/language-switcher';
import cn from 'classnames';
import Search from '@components/common/search';
import AccountIcon from '@components/icons/account-icon';
import { FiMenu } from 'react-icons/fi';
import CategoryDropdownMenu from '@components/category/category-dropdown-menu';
import { useTranslation } from 'src/app/i18n/client';
import Link from 'next/link';
import { getToken } from '@framework/utils/get-token';
import AccountWishlistIcon from '@components/icons/account-wishlist';
import { useCartWishtlists } from '@contexts/wishtlist/wishst.context';

const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

interface HeaderProps {
  lang: string;
  className?: string;
}
const Header = ({ className, lang }: HeaderProps) => {
  const { openSidebar, displaySearch, displayMobileSearch } = useUI();
  const siteSearchRef = useRef() as DivElementRef;
  const { t } = useTranslation(lang, 'common');
  const siteHeaderRef = useRef() as DivElementRef;
  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
  const [isClient, setIsClient] = useState(Boolean(false));
  const { items } = useCartWishtlists();

  useActiveScroll(siteHeaderRef);

  const token = getToken();

  function handleMobileMenu() {
    return openSidebar();
  }

  function handleCategoryMenu() {
    setCategoryMenu(!categoryMenu);
  }
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <header
        id="siteHeader"
        ref={siteHeaderRef}
        className={cn(
          'header-one sticky-header sticky top-0 z-50 lg:relative w-full',
          displayMobileSearch && 'active-mobile-search',
          className,
        )}
      >
        <div className="innerSticky z-20 w-full transition duration-200 ease-in-out  body-font bg-white">
          <Search
            lang={lang}
            searchId="mobile-search"
            className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
          />
          <div className="top-bar  text-sm text-fill-base border-b border-black/10"></div>
          <div className="border-b border-black/10">
            <Container>
              <div className="flex items-center justify-between  py-2 md:py-4">
                <div className="relative flex-shrink-0 lg:hidden">
                  <button
                    aria-label="Menu"
                    className="bg-brand rounded focus:outline-none flex-shrink-0 text-sm  text-skin-inverted px-2.5 md:px-3 lg:px-[18px] py-2 md:py-2.5 lg:py-3 flex items-center transition-all hover:border-skin-four"
                    onClick={handleMobileMenu}
                  >
                    <MenuIcon />
                  </button>
                </div>
                <Logo lang={lang} className="logo ps-3 md:ps-0 lg:mx-0" />
                {/* End of logo */}

                <Search
                  searchId="top-bar-search"
                  lang={lang}
                  className="hidden lg:flex lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[800px] lg:mx-10"
                />
                {/* End of search */}

                <div className="text-brand-icon-header flex text-sm space-x-5 xl:space-x-10 lg:max-w-[33%]">
                  <CartButton className="hidden lg:flex" lang={lang} />

                  <button type="button" className="relative p-2 text-sm ">
                    <div className="svg-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                      </svg>
                    </div>

                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
                      8
                    </div>
                  </button>
                </div>
                <LanguageSwitcher lang="en" />
                <div className="hidden lg:flex items-center  accountButton">
                  <AccountIcon />
                  {isClient &&
                    (!token ? (
                      <div className="flex flex-col ml-4">
                        <Link
                          className="text-sm  "
                          href={`/${lang}${ROUTES.LOGIN}`}
                        >
                          {t('Входить')}
                        </Link>
                        <Link
                          className="text-sm "
                          href={`/${lang}${ROUTES.SIGN_UP}`}
                        >
                          {t('Pегистр')}
                        </Link>
                      </div>
                    ) : (
                      <></>
                    ))}
                </div>
              </div>
            </Container>
          </div>
          <div className="hidden navbar  lg:block bg-white border-b border-black/10">
            <Container>
              <div className="flex justify-between items-center">
                <Logo
                  lang={lang}
                  className="navbar-logo w-0 opacity-0 transition-all duration-200 ease-in-out"
                />
                {/* End of logo */}
                <div className="categories-header-button relative  flex-shrink-0 w-52 xl:w-60">
                  <button
                    className="text-brand-dark text-sm border-black/10 min-h-[48px] focus:outline-none w-full font-semibold py-2 flex items-center"
                    onClick={handleCategoryMenu}
                  >
                    <FiMenu className="text-2xl me-3" />
                    {t('Просмотреть все категории')}
                  </button>
                  {categoryMenu && <CategoryDropdownMenu lang={lang} />}
                </div>
                <HeaderMenu
                  data={site_header.menu}
                  className="flex transition-all duration-200 ease-in-out"
                  lang={lang}
                />
                {/* End of main menu */}
                {displaySearch && (
                  <div className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                    <Search
                      ref={siteSearchRef}
                      className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                      lang={lang}
                    />
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>
      </header>
      {categoryMenu && (
        <div
          className="shadow_bkg_show fixed w-full h-full inset-0 bg-black/60 z-40"
          onClick={handleCategoryMenu}
        ></div>
      )}
    </>
  );
};

export default Header;

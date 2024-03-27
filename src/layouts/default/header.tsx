import React, { useEffect, useRef, useState } from 'react';
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
import { AccouttWishlist } from '@components/product/wishlist-product';
import CartButton from '@components/cart/cart-button';

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

interface HeaderProps {
  lang: string;
  className?: string;
}
const Header = ({ className, lang }: HeaderProps) => {
  const { displaySearch, displayMobileSearch } = useUI();
  const siteSearchRef = useRef() as DivElementRef;
  const { t } = useTranslation(lang, 'home');
  const siteHeaderRef = useRef() as DivElementRef;
  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
  const [isClient, setIsClient] = useState(Boolean(false));

  useActiveScroll(siteHeaderRef);

  const token = getToken();

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
    
                <Logo lang={lang} className="logo  md:ps-0 lg:mx-0" />
                {/* End of logo */}

                <Search
                  searchId="top-bar-search"
                  lang={lang}
                  className={`hidden lg:flex lg:max-w-[450px] xl:max-w-[800px] 2xl:max-w-[800px] ${isClient && token ? 'm-0' : 'lg:mx-10'}} `}
                />
                <div className="">
                  <CartButton />
                </div>

                <AccouttWishlist lang={lang}  />

                <LanguageSwitcher lang={lang} />

                <div className="hidden lg:flex items-center  accountButton">
                  <AccountIcon lang={lang} />

                  {isClient &&
                    (!token ? (
                      <div className="flex flex-col ml-4">
                        <Link
                          className="text-sm  "
                          href={`/${lang}${ROUTES.LOGIN}`}
                        >
                          {t('Входь')}
                        </Link>
                        <Link
                          className="text-sm "
                          href={`/${lang}${ROUTES.SIGN_UP}`}
                        >
                          {t('Регистрация')}
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
                <div className="categories-header-button relative  flex-shrink-0 min-w-72 xl:w-60">
                  <button
                    className="text-brand-dark text-sm border-black/10 min-h-[48px] focus:outline-none w-full font-semibold py-2 flex items-center"
                    onClick={handleCategoryMenu}
                  >
                    <FiMenu className="text-2xl me-3" />
                    {isClient && t('Все категории')}
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

'use client';

import Link from '@components/ui/link';
import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';
import { useTranslation } from 'src/app/i18n/client';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Logo from '@components/ui/logo';
import { useLogoutMutation } from '@framework/auth/use-logout';
import { getToken } from '@framework/utils/get-token';

const MobileMenu = dynamic(() => import('@layouts/header/mobile-menu'));

export default function BottomNavigation({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'home');
  const { openSidebar, closeSidebar, displaySidebar, toggleMobileSearch } =
    useUI();
  const dir = getDirection(lang);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  const [open, setOpen] = useState<any>(null);
  const [isClient, setIsClient] = useState(Boolean(false));
  const { mutate: logout } = useLogoutMutation(lang);
  const token = getToken();

  function handleMobileMenu() {
    setOpen('kategoriya');
    return openSidebar();
  }
  function handleMobileMenu2() {
    setOpen('menu');
    return openSidebar();
  }
  function handleMobileMenu3() {
    setOpen('account');
    return openSidebar();
  }
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="lg:hidden fixed z-30 -bottom-0.5  flex items-center justify-between shadow-bottomNavigation body-font bg-brand-light w-full h-16 px-4 md:px-6 lg:px-8 text-brand-muted pb-0.5">
        <button
          aria-label="Menu"
          className="flex flex-col items-center justify-center gap-0.5"
          onClick={handleMobileMenu2}
        >
          <span className="text-[22px] h-[22px]">
            <i className="fa-solid fa-bars"></i>
          </span>
          {t('Меню')}
        </button>

        <button
          className="flex flex-col items-center justify-center gap-0.5"
          onClick={toggleMobileSearch}
          aria-label="Search Button"
        >
          <span className="text-[20px] h-[22px]">
            <i className="fa-solid fa-search"></i>
          </span>
          {t('Поиск')}
        </button>

        <button
          aria-label="Menu"
          className="flex flex-col items-center justify-center gap-0.5"
          onClick={handleMobileMenu}
        >
          <span className="text-[20px] h-[22px]">
            <i className="fa-solid fa-list"></i>
          </span>
          {t('Категория')}
        </button>
        <button
          aria-label="Menu"
          className="flex flex-col items-center justify-center gap-0.5"
          onClick={handleMobileMenu3}
        >
          <span className="text-[20px] h-[22px]">
            <i className="fa-regular fa-user"></i>
          </span>
          {t('Профиль')}
        </button>
      </div>
      <Drawer
        className={
          open === 'menu' || open === 'account' ? 'max-w-[300px]' : 'w-full'
        }
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        // @ts-ignore
        level={null}
        contentWrapperStyle={contentWrapperCSS}
        {...motionProps}
      >
        {open === 'kategoriya' && <MobileMenu lang={lang} />}
        {open === 'menu' && (
          <div className="flex flex-col justify-between w-full ">
            <div className="bg-gray-200 w-full border-b border-border-base flex justify-between items-center  relative ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 shrink-0 py-0.5">
              <div role="button" onClick={closeSidebar} className="inline-flex">
                <Logo lang={lang} />
              </div>

              <button
                className="flex items-center justify-center px-4 py-5 text-2xl transition-opacity md:px-5 lg:py-8 focus:outline-none hover:opacity-60"
                onClick={closeSidebar}
                aria-label="close"
              >
                <IoClose />
              </button>
            </div>

            <ul className="pl-5 mt-3 flex flex-col gap-3 text-[17px]">
              <li>
                <Link
                  href={`/${lang}`}
                  className="font-medium"
                  onClick={closeSidebar}
                >
                  {t('Главный')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  onClick={closeSidebar}
                  className="font-medium"
                >
                  {t('О нас')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact-us`}
                  onClick={closeSidebar}
                  className="font-medium"
                >
                  {t('Связаться с нами')}
                </Link>
              </li>
            </ul>
          </div>
        )}
        {open === 'account' && (
          <div className="flex flex-col justify-between w-full ">
            <div className="bg-gray-200 w-full border-b border-border-base flex justify-between items-center  relative ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 shrink-0 py-0.5">
              <div role="button" onClick={closeSidebar} className="inline-flex">
                <Logo lang={lang} />
              </div>

              <button
                className="flex items-center justify-center px-4 py-5 text-2xl transition-opacity md:px-5 lg:py-8 focus:outline-none hover:opacity-60"
                onClick={closeSidebar}
                aria-label="close"
              >
                <IoClose />
              </button>
            </div>

            {isClient &&
              (token ? (
                <ul className="pl-5 mt-3 flex flex-col gap-3 text-[17px]">
                  <li>
                    <Link
                      href={`/${lang}/my-account/orders`}
                      className="font-medium"
                      onClick={closeSidebar}
                    >
                      <span className="text-[20px] h-[22px]">
                        <i className="fa-brands fa-shopify ml-3"></i>
                      </span>{' '}
                      {t('Заказы')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${lang}/my-account/wishlist`}
                      className="font-medium"
                      onClick={closeSidebar}
                    >
                      <span className="text-[20px] h-[22px]">
                        <i className="fa-regular fa-heart ml-3"></i>
                      </span>{' '}
                      {t('Список желаний')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => (closeSidebar(), logout())}
                      href={`/${lang}`}
                      className="font-medium"
                    >
                      <span className="text-[20px] h-[22px]">
                        <i className="fa-solid fa-arrow-right-from-bracket ml-3"></i>
                      </span>{' '}
                      {t('Выйти')}
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="pl-5 mt-3 flex flex-col gap-3 text-[17px]">
                  <li>
                    <Link
                      className="font-medium"
                      href={`/${lang}${ROUTES.LOGIN}`}
                      onClick={closeSidebar}
                    >
                      <span className="text-[20px] h-[22px]">
                        <i className="fa-solid fa-user-shield ml-3"></i>
                      </span>{' '}
                      {t('Входь')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-medium"
                      href={`/${lang}${ROUTES.SIGN_UP}`}
                      onClick={closeSidebar}
                    >
                      <span className="text-[20px] h-[22px]">
                        <i className="fa-solid fa-user-pen ml-3"></i>
                      </span>{' '}
                      {t('Регистрация')}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/${lang}/my-account/wishlist`}
                      className="font-medium"
                      onClick={closeSidebar}
                    >
                      <span className="text-[20px] h-[22px]">
                        <i className="fa-regular fa-heart ml-3"></i>
                      </span>{' '}
                      {t('Список желаний')}
                    </Link>
                  </li>
                </ul>
              ))}
          </div>
        )}
      </Drawer>
    </>
  );
}

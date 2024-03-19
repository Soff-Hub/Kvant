import { useState } from 'react';
import Link from '@components/ui/link';
import { siteSettings } from '@settings/site-settings';
import Scrollbar from '@components/ui/scrollbar';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import cn from 'classnames';

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from 'react-icons/io5';
import { useTranslation } from 'src/app/i18n/client';
import { useCategoriesQuery } from '@framework/category/get-all-categories';

const social = [
  {
    id: 0,
    link: 'https://www.facebook.com/redqinc/',
    icon: <IoLogoFacebook />,
    className: 'facebook',
    title: 'text-facebook',
  },
  {
    id: 1,
    link: 'https://twitter.com/redqinc',
    icon: <IoLogoTwitter />,
    className: 'twitter',
    title: 'text-twitter',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
    icon: <IoLogoYoutube />,
    className: 'youtube',
    title: 'text-youtube',
  },
  {
    id: 3,
    link: 'https://www.instagram.com/redqinc/',
    icon: <IoLogoInstagram />,
    className: 'instagram',
    title: 'text-instagram',
  },
];

export default function MobileMenu({ lang }: { lang: string }) {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { site_header } = siteSettings;
  const { closeSidebar } = useUI();
  const { t } = useTranslation(lang, 'home');

  const { data } = useCategoriesQuery({
    limit: 20,
  });
  const data1: any = data && data;

  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];
    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }
    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    className = '',
  }: any) =>
    data.title && (
      <li className={`transition-colors duration-200 ${className}`}>
        <div className="relative flex items-center justify-between">
          <Link
            href={`/${lang}/${data?.slug}`}
            className="relative w-full py-4 transition duration-300 ease-in-out site_header.menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
          >
            <span className="block w-full" onClick={closeSidebar}>
              {t(data.title)}
            </span>
          </Link>
          {hasSubMenu?.length > 0 && (
            <div
              className="cursor-pointer w-full h-8 text-[17px] px-5 shrink-0 flex items-center justify-end text-brand-dark text-opacity-80 absolute ltr:right-0 rtl:left-0 top-1/2 transform -translate-y-1/2"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform ${
                  activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu?.length > 0 && (
          <SubMenu
            data={hasSubMenu}
            dept={dept}
            toggle={activeMenus.includes(menuName)}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, toggle, data }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;
    console.log(data);

    return (
      <ul className={cn('mobile-sub-menu', dept > 2 && 'ltr:-ml-4 rtl:-mr-4')}>
        {data?.map((item: any) => {
          return (
            <li
              className={`transition-colors duration-200 ${dept > 1 && 'ltr:pl-4 rtl:pr-4'} ${dept > 2 && 'ltr:pl-8 rtl:pr-8'}  `}
            >
              <div className="relative flex items-center justify-between">
                <Link
                  href={`/${lang}/${item?.slug}`}
                  className="relative w-full py-4 transition duration-300 ease-in-out site_header.menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
                >
                  <span className="block w-full" onClick={closeSidebar}>
                    {item?.title}
                  </span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="bg-gray-300 w-full border-b border-border-base flex justify-between items-center relative ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 shrink-0 py-0.5">
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

        <Scrollbar className="flex-grow mb-auto menu-scrollbar">
          <div className="flex flex-col px-0  text-brand-dark h-[calc(100vh_-_150px)]">
            <ul className="mobile-menu">
              {data1?.map((item: any) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${item?.id}`;

                return (
                  <ListMenu
                    dept={dept}
                    hasSubMenu={item?.children}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={item?.id}
                    data={item}
                  />
                );
              })}
            </ul>
          </div>
        </Scrollbar>

        <div className="flex items-center justify-center py-5 -mx-3 border-t text-brand-light border-border-base px-7 shrink-0">
          {social?.map((item, index) => (
            <Link
              href={item.link}
              className={`text-heading mx-3 transition duration-300 ease-in text-brand-dark text-opacity-60 hover:text-brand ${item.className}`}
              key={index}
            >
              <span className="sr-only">{t(`${item.title}`)}</span>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

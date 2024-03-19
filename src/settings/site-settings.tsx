import { RussianFlag } from '@components/icons/language/RusFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { USFlag } from '@components/icons/language/USFlag';
import siteLogo from 'public/assets/images/Kvant_horz_logo.svg';
import siteLogoBlack from 'public/assets/images/Kvant_horz_logo.svg';

export const siteSettings = {
  name: 'Kvant',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: 'SoffHub',
    websiteUrl: 'https://soffhub.uz/',
    address: '/en',
  },
  logo: {
    url: siteLogo,
    urlReverse: siteLogoBlack,
    alt: 'Razazoror',
    href: '/en',
    width: 195,
    height: 26,
  },
  defaultLanguage: 'ru',
  currencyCode: 'USD',
  site_header: {
    topmenu: [
      {
        id: 1,
        path: '/my-account/wishlist/',
        label: 'Список желаний',
      },
      {
        id: 2,
        path: '/checkout/',
        label: 'Проверить',
      },
      {
        id: 3,
        path: '/',
        label: 'menu-gift',
      },
    ],
    menu: [
      {
        id: 1,
        path: '/',
        label: 'Главный',
      },
      {
        id: 2,
        path: '/',
        label: 'Страницы',
        subMenu: [
          {
            id: 2,
            path: '/faq',
            label: 'ТСС',
          },
          {
            id: 6,
            path: '/checkout',
            label: 'Проверить',
          },
        ],
      },
      {
        id: 7,
        path: '/contact-us',
        label: 'Связаться с нами',
      },
    ],
    languageMenu: [
      {
        id: 'RU',
        name: 'RU',
        value: 'ru',
        icon: <RussianFlag />,
      },
      {
        id: 'UZ',
        name: 'UZ',
        value: 'uz',
        icon: <SAFlag />,
      },
      {
        id: 'en',
        name: 'ENG',
        value: 'en',
        icon: <USFlag />,
      },
    ],
  },
};

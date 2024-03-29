import siteLogo from 'public/assets/images/Kvant_horz_logo.svg';
import siteLogoBlack from 'public/assets/images/Kvant_horz_logo.svg';

export const siteSettings = {
  name: 'Kvant',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: 'SoffHub',
    websiteUrl: 'https://soffhub.uz/',
    address: '/ru',
  },
  logo: {
    url: siteLogo,
    urlReverse: siteLogoBlack,
    alt: 'Razazoror',
    href: '/ru',
    width: 195,
    height: 26,
  },
  defaultLanguage: 'ru',
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
        // label: 'menu-gift',
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
        path: '/about',
        label: 'О нас',
      },
      {
        id: 3,
        path: '/contact-us',
        label: 'Контакты',
      },
    ],
  },
};

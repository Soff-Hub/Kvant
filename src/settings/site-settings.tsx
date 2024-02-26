import { SAFlag } from '@components/icons/language/SAFlag';
import { USFlag } from '@components/icons/language/USFlag';
import siteLogo from 'public/assets/images/logo.svg';
import siteLogoBlack from 'public/assets/images/logo.svg';

export const siteSettings = {
  name: 'Kvant',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: 'Wikithemes, Inc.',
    websiteUrl: '#',
    address: '',
  },
  logo: {
    url: siteLogo,
    urlReverse: siteLogoBlack,
    alt: 'Razazoror',
    href: '/en',
    width: 195,
    height: 26,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    topmenu: [
      {
        id: 1,
        path: '/my-account/wishlist/',
        label: 'menu-wishlists',
      },
      {
        id: 2,
        path: '/checkout/',
        label: 'menu-checkout',
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
        label: 'menu-demos',
      },
      {
        id: 5,
        path: '/',
        label: 'menu-pages',
        subMenu: [
          {
            id: 2,
            path: '/faq',
            label: 'menu-faq',
          },
          {
            id: 6,
            path: '/checkout',
            label: 'menu-checkout',
          },
        ],
      },
      {
        id: 7,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'Arab',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'en',
        name: 'English',
        value: 'en',
        icon: <USFlag />,
      },
    ],
 
  },
};

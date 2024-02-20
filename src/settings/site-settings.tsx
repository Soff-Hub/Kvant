import { SAFlag } from '@components/icons/language/SAFlag';
import { USFlag } from '@components/icons/language/USFlag';
import siteLogo from 'public/assets/images/logo.svg';
import siteLogoBlack from 'public/assets/images/logo.svg';

export const siteSettings = {
  name: 'Razazoror',
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
        id: 2,
        path: '/search',
        label: 'menu-categories',
        type: 'mega',
        mega_categoryCol: 5,
        mega_bannerMode: 'none',
        mega_bannerImg: '/assets/images/mega/banner-menu.jpg',
        mega_bannerUrl: '/search',
        mega_contentBottom:
          '<strong>30% Off</strong> the shipping of your first order with the code: <strong>-SALE30</strong>',
        subMenu: [
          {
            id: 1,
            path: '/search',
            label: 'menu-fresh-vegetables',
            image: {
              id: 1,
              thumbnail: '/assets/images/category/collection_1.jpg',
              original: '/assets/images/category/collection_1.jpg',
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-home-audio',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-helicopters',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-toys',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-outdoor',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-organic',
              },
            ],
          },
          {
            id: 2,
            path: '/search',
            label: 'menu-diet-nutrition',
            image: {
              id: 1,
              thumbnail: '/assets/images/category/collection_2.jpg',
              original: '/assets/images/category/collection_2.jpg',
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-automotive',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-autocar',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-morecar',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-autosecurity',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-battereries',
              },
            ],
          },
          {
            id: 3,
            path: '/search',
            label: 'menu-healthy-foods',
            image: {
              id: 1,
              thumbnail: '/assets/images/category/collection_3.jpg',
              original: '/assets/images/category/collection_3.jpg',
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-vegetarian',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-kakogenic',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-mediterranean',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-organic',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-organic',
              },
            ],
          },
          {
            id: 4,
            path: '/search',
            label: 'menu-grocery-items',
            image: {
              id: 1,
              thumbnail: '/assets/images/category/collection_4.jpg',
              original: '/assets/images/category/collection_4.jpg',
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-battereries',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-beadphones',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-accessories',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-jewelry',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-wedding',
              },
            ],
          },
          {
            id: 5,
            path: '/search',
            label: 'menu-beaf-steak',
            image: {
              id: 1,
              thumbnail: '/assets/images/category/collection_5.jpg',
              original: '/assets/images/category/collection_5.jpg',
            },
            subMenu: [
              {
                id: 1,
                path: '/search',
                label: 'menu-menwatch',
              },
              {
                id: 2,
                path: '/search',
                label: 'menu-womanwatch',
              },
              {
                id: 3,
                path: '/search',
                label: 'menu-gift',
              },
              {
                id: 4,
                path: '/search',
                label: 'menu-giftman',
              },
              {
                id: 5,
                path: '/search',
                label: 'menu-giftwoman',
              },
            ],
          },
        ],
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
        name: 'Ar',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'en',
        name: 'Eng',
        value: 'en',
        icon: <USFlag />,
      },
    ],
 
  },
};

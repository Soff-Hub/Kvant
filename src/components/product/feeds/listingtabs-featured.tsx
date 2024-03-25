'use client';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import cn from 'classnames';
import { Tab } from '@headlessui/react';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import ElectronicProductFeed from '@components/product/feeds/electronic-product-feed';
import FashionProductFeed from '@components/product/feeds/fashion-product-feed';
import { useTranslation } from 'src/app/i18n/client';

type BoxProps = {
  className?: string;
  lang: string;
  variant?: string;
};

const ListingtabsFeatured: FC<BoxProps> = ({ lang, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation(lang, 'home');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const tabArr = ['Рекомендуемые', 'Самые популярные', 'В продаже'];

  return (
    isClient && (
      <div className={cn('my-8 lg:my-15', className)}>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className={'flex gap-7 pb-4 tab-products'}>
            {tabArr.map((name) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `${
                    selected ? 'text-fill-base' : 'text-gray-400'
                  } text-[11px] lg:text-[16px] lg:leading-6  font-bold uppercase relative`
                }
              >
                {t(name)}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <BestSellerProductFeed lang={lang} variant={'noHeading'} />
            </Tab.Panel>
            <Tab.Panel>
              <FashionProductFeed
                className=""
                lang={lang}
                variant={'noHeading'}
              />
            </Tab.Panel>
            <Tab.Panel>
              <ElectronicProductFeed
                className=""
                lang={lang}
                variant={'noHeading'}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    )
  );
};
export default ListingtabsFeatured;

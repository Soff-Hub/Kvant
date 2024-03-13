'use client';


import { useCart } from '@contexts/cart/cart.context';

import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';

import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import { useEffect, useState } from 'react';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import { addPeriodToThousands } from '@components/cart/cart-item';

const CheckoutCard: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'home');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const { items, total, isEmpty } = useCart();


  const checkoutFooter = [
    {
      id: 1,
      title: t('Промежуточный итог'),
      price: addPeriodToThousands(total)?.replace(/\.\d+$/, '') + ' ' + t('сум'),
    },
    {
      id: 2,
      title: t('Перевозки'),
      price: `15 000 ${t('сум')}`,
    },
    {
      id: 3,
      title: t('Общий'),
      price: addPeriodToThousands(total)?.replace(/\.\d+$/, '') + ' ' + t('сум'),
    },
  ];
  const mounted = useIsMounted();
  return (
    <>
      <div className="px-4 pt-4 border  border-border-base text-brand-light xl:py-6 xl:px-7 bg-white rounded">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('Продукт')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('Промежуточный итог')}
          </span>
        </div>
        {isLoading ? (
          <div className="w-full">
            <SearchResultLoader uniqueKey={`product-key`} />
          </div>
        ) : !isEmpty && mounted ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('Ваша корзина пуста')}
          </p>
        )}
        {mounted &&
          checkoutFooter.map((item: any) => (
            <CheckoutCardFooterItem item={item} key={item.id} />
          ))}
      </div>
    </>
  );
};

export default CheckoutCard;

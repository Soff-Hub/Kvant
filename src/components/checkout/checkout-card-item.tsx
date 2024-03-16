import { Item } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import Cookies from 'js-cookie';
import { addPeriodToThousands } from '@components/cart/cart-item';
import { useTranslation } from 'src/app/i18n/client';

export const CheckoutItem: React.FC<{ item: Item; lang: string }> = ({
  item,
  lang,
}) => {
  const pathname = window.location.search;
  const dataClick: any = Cookies.get('products_click');
  const dataCooke = dataClick ? JSON.parse(dataClick) : null;
  const { t } = useTranslation(lang, 'home');

  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <div style={{ minHeight: '64px', minWidth: '64px' }}>
        <Image
          src={
            pathname
              ? dataCooke?.image
              : item.image ?? '/assets/placeholder/order-product.svg'
          }
          alt={pathname ? dataCooke?.title : item.title}
          width={64}
          height={64}
          style={{ width: '100%', objectFit: 'cover' }}
        />
      </div>
      <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
        {generateCartItemName(
          pathname ? dataCooke?.title : item.title,
          item.attributes,
        )}
      </h6>
      <div className="flex font-normal ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
        {addPeriodToThousands(pathname ? dataCooke?.price : item.price).replace(
          /\.\d+$/,
          '',
        )}{' '}
        {t('сум')}
      </div>
    </div>
  );
};

import { Item } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import Cookies from 'js-cookie';

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const pathname = window.location.search;
  const dataClick: any = Cookies.get('products_click');
  const dataCooke = JSON.parse(dataClick);

  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <Image
        src={
          pathname
            ? dataCooke?.image
            : item.image ?? '/assets/placeholder/order-product.svg'
        }
        alt={pathname ? dataCooke?.title : item.title}
        className="rounded-md ltr:mr-5 rtl:ml-5"
        width={64}
        height={64}
      />
      <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
        {generateCartItemName(
          pathname ? dataCooke?.title : item.title,
          item.attributes,
        )}
      </h6>
      <div className="flex font-normal ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
        {pathname ? dataCooke?.price : item.price}
      </div>
    </div>
  );
};

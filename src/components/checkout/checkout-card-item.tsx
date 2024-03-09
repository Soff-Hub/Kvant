import { Item } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <Image
        src={item.image ?? '/assets/placeholder/order-product.svg'}
        alt={item.title}
        className="rounded-md ltr:mr-5 rtl:ml-5"
        width={64}
        height={64}
        style={{ width: '150px' }}
      />
      <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
        {generateCartItemName(item.title, item.attributes)}
      </h6>
      <div className="flex font-normal ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
        {item.price}
      </div>
    </div>
  );
};

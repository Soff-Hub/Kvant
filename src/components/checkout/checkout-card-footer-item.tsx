import { addPeriodToThousands } from '@components/cart/cart-item';


type FooterItemProps = {
  id: string;
  title: string;
  price: string;
};
export const CheckoutCardFooterItem: React.FC<{
  item: FooterItemProps;
}> = ({ item }) => {

  return (
    <div className="flex items-center w-full py-4 text-sm font-medium border-b lg:py-5 border-border-base text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
      {item.title}
      <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
        {addPeriodToThousands(item.price).replace(/\.\d+$/, '')}
      </span>
    </div>
  );
};

import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  lang: string;
  data: any;
  variation?: any;
  disabled?: boolean;
  variant?: any;
}

const AddToCart = ({
  lang,
  data,
  variation,
  disabled,
  variant = 'mercury',
}: Props) => {
  const { t } = useTranslation(lang, 'home');
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const item = generateCartItem(data!, variation);

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    addItemToCart(item, 1);
  };

  

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };

  const outOfStock = isInCart(item?.id) && !isInStock(item.id);

  return !isInCart(item?.id) ? (
    variant === 'single' ? (
      <button
        className="w-full min-w-[120px] px-4 py-4 bg-brand leading-6 text-brand-light rounded text-[16px] items-center justify-center focus:outline-none focus-visible:outline-none hover:bg-brand"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        {t('Добавить в корзину')}
      </button>
    ) : (
      <button
        className="w-full min-w-[120px] px-4 py-2 bg-brand leading-6 text-brand-light rounded-full text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        {t('Добавить в корзину')}
      </button>
    )
  ) : (
    <Counter
      value={getItemFromCart(item.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
      className="h-10"
      variant={variant}
      lang={lang}
    />
  );
};

export default AddToCart;

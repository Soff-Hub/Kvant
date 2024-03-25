import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';

const CartButton: React.FC<React.SVGAttributes<{}>> = ({ lang }) => {
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems } = useCart();
  const [isClient, setIsClient] = useState<boolean>(false);

  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    // isShowing;
    return openDrawer();
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <button type="button" className="relative p-1" onClick={handleCartOpen}>
      <div className="svg-container mt-1">
        <CartIcon />
      </div>
      <div className="absolute inline-flex items-center justify-center w-[22px] h-[22px] text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full -top-[1px] right-[0.01px] ">
        {isClient && totalItems}
      </div>
    </button>
  );
};

export default CartButton;

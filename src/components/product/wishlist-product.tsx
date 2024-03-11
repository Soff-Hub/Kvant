import WishlistProductCard from '@components/product/wishlist-product-card';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useCartWishtlists } from '@contexts/wishtlist/wishst.context';

interface ProductWishlistProps {
  className?: string;
  lang: string;
}

export default function ProductWishlistGrid({
  className = '',
  lang,
}: ProductWishlistProps) {
  const { items } = useCartWishtlists();

  return (
    <div className={cn(className)}>
      <div className="flex flex-col">
        {items.length < 0 ? (
          <Alert message="На данный момент в корзине нет товаров" />
        ) : (
          items.map((product: any) => (
            <WishlistProductCard
              key={`product--key${product.id}`}
              product={product}
              lang={lang}
            />
          ))
        )}
      </div>
    </div>
  );
}

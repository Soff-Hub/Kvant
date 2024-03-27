import cn from 'classnames';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { Product } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import { productPlaceholder } from '@assets/placeholders';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { useModalAction } from '@components/common/modal/modal.context';
import { useCart } from '@contexts/cart/cart.context';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  lang?: any;
  product: Product;
  className?: string;
}

function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;
  return <AddToCart data={data} variant="mercury" lang={lang} />;
}

const ProductList: React.FC<ProductProps> = ({ product, className, lang }) => {
  const {
    id,
    title,
    image,
    discount_price,
    price,
    slug,
    description,
  } = product ?? {};

  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  const { t } = useTranslation(lang, 'home');

  return (
    <article
      className={cn(
        ' product-list-view overflow-hidden relative  grid grid-cols-4  p-2 sm:p-4 gap-8 bg-white rounded',
        className,
      )}
      title={title}
    >
      <div className="col-span-1 ">
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/${slug}`}
          className="h-full flex align-center"
        >
          <Image
            src={image ?? productPlaceholder}
            alt={title || 'Product Image'}
            width={180}
            height={180}
          />
        </Link>
      </div>

      <div className="col-span-3">
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/${slug}`}
          className="text-skin-base text-base font-semibold leading-5 min-h-[30px] line-clamp-2 mb-1.5 hover:text-skin-primary"
        >
          {title}
        </Link>

        <div className="space-s-2 mb-2">
          {discount_price !== Number(price) ? (
            <>
              <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                {discount_price} {t('сум')}
              </span>
              <del className="text-sm text-gray-400 text-opacity-70">
                {Number(price)} {t('сум')}
              </del>
            </>
          ) : (
            <>
              <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                {Number(price)} {t('сум')}
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-skin-base line-clamp-3 leading-6 text-opacity-80">
          {description}
        </p>
        <div className="inline-block product-cart-button mt-6">
          <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
          {(Number(product?.quantity) < 1 || outOfStock) &&
            product?.is_many && (
              <button
                onClick={() => openModal('PAYMENT', id)}
                className="text-center text-[13px] hover:text-yellow-300 w-full mt-0"
              >
                {t('Нужно больше?')}
              </button>
            )}
        </div>
      </div>
    </article>
  );
};

export default ProductList;

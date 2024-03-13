import cn from 'classnames';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { useCart } from '@contexts/cart/cart.context';
import { useTranslation } from 'src/app/i18n/client';
import { productPlaceholder } from '@assets/placeholders';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';

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
  const { t } = useTranslation(lang, 'home');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }

  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] text-skin-inverted uppercase inline-block bg-skin-red rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="min-w-[150px] px-4 py-2 bg-skin-primary rounded-full  text-skin-inverted text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        {t('Краткое описание')}
      </button>
    );
  }
  return <AddToCart lang={lang} data={data} />;
}

const ProductList: React.FC<ProductProps> = ({ product, className, lang }) => {
  const {
    title,
    image,
    discount_price,
    price,
    slug,
    view_count,
    description,
  } = product ?? {};

  const { width } = useWindowSize();
  const iconSize = width! > 1024 ? '20' : '17';
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
        <div className="text-12px sm:text-sm mt-auto text-gray-400 mb-2">
          ({view_count} review)
        </div>
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
        </div>
      </div>
    </article>
  );
};

export default ProductList;

import cn from 'classnames';
import Image from '@components/ui/image';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { useCart } from '@contexts/cart/cart.context';

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import { ROUTES } from '@utils/routes';
import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import CheckIcon from '@components/icons/check-icon';
import StarIcon from '@components/icons/star-icon';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});


interface ProductProps {
  lang: string;
  product: Product;
  className?: string;
  variant: string;
}

function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;
  // console.log(variant);
  const { t } = useTranslation(lang, 'home');
  const { id, quantity, product_type,  } = data ?? {};
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);



  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }

  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="block w-full  leading-6 px-4 py-2 bg-brand-danger rounded-full text-brand-light text-[13px] items-center justify-center">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="w-full min-w-[150px] leading-6 px-4 py-2 bg-brand rounded-full  text-brand-light text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        {t('Краткое описание')}
      </button>
    );
  }
  return <AddToCart data={data} variant="mercury" lang={lang} />;
}




function RenderLabelStock({ props }: { props: Object }) {
  let { data, lang }: any = props;
  // console.log(variant);
  const { t } = useTranslation(lang, 'home');
  const { id, quantity } = data ?? {};
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);


  if (Number(quantity) < 1 || outOfStock) {
    return (
      <p className="font-medium flex items-center space-x-1 text-[12px] text-skin-label_out out_stock">
        <CheckIcon fill={'text-skin-label_in'} opacity="1" />
        <span> {t('Распродано')} </span>
      </p>
    );
  }
  return (
    <p className="font-medium flex items-center space-x-1 text-[12px] text-skin-label_in in_stock">
      <CheckIcon fill={'text-skin-label_in'} opacity="1" />
      <span> {t('В наличии')} </span>
      <span className="text-brand-dark">
        <b>{quantity}</b> {t('продукты')}
      </span>
    </p>
  );
}

const ProductCard: React.FC<ProductProps> = ({
  product,
  className,
  lang,
  variant = 'default',
}) => {
  const {
    id,
    title,
    image,
    discount_price,
    price,
    quantity,
    slug,
    discount,
    view_count,
  } = product ?? {};

  const { openModal } = useModalAction();
  const { width } = useWindowSize();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);
  const iconSize = width! > 1024 ? '20' : '17';
  const {t}= useTranslation(lang, 'home')

  async function handlePopupView() {
    try {
      const response = await fetch(
        `${baseURL + API_ENDPOINTS.PRODUCTS_DETAILS}/${slug}/`,
      );
      const product = await response.json();
      openModal('PRODUCT_VIEW', product);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  
  

  return (
    <article
      className={cn(
        'flex flex-col gap-2 product-card relative p-2 sm:p-4  h-full  bg-white ',
        className,
        Number(quantity) < 1 || outOfStock
          ? 'card-image--nojump'
          : 'card-image--jump ',
        {
          'hover:shadow-navigation hover:z-50 ':
            variant === 'outBorder' || variant === 'noHeading',
          rounded: variant === 'default',
        },
      )}
      title={title}
    >
      <div className="relative flex-shrink-0 ">
        <div className="relative card-img-container overflow-hidden flex item-center w-full">
          <Image
            src={image ?? productPlaceholder}
            alt={title || 'Product Image'}
            width={180}
            height={180}
          />
        </div>
        <div className="w-full h-full absolute top-0  z-10">
          {discount ? (
            <span className="text-[10px] font-medium text-white uppercase inline-block bg-red-600 rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {discount} %
            </span>
          ) : (
            <></>
          )}
          <button
            className="buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:bg-brand hover:text-brand-light"
            aria-label="Quick View Button"
            onClick={handlePopupView}
          >
            <SearchIcon width={iconSize} height={iconSize} opacity="1" />
          </button>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-hidden relative product-cart-content">
        <div className="text-sm mt-auto leading-6 text-gray-400 mb-1.5 hidden">
          {price}
        </div>
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/${slug}`}
          className="text-skin-base font-semibold text-sm leading-5 min-h-[40px] line-clamp-2 mt-1 mb-2 hover:text-brand"
        >
          {title}
        </Link>
        <div className="flex text-gray-500 space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, idx) => (
              <StarIcon
                key={idx}
                color={idx < 5 ? '#F3B81F' : '#DFE6ED'}
                className="w-3 h-3 mx-px"
              />
            ))}
          </div>
          <span className="text-[13px] leading-4">({view_count} {t('обзор')})</span>
        </div>
        <div className="space-s-2">
          {discount_price !== Number(price) ? (
            <>
              <span className="inline-block font-semibold text-[18px] text-brand">
                {discount_price} {t('сум')}
              </span>
              <del className="mx-1  text-gray-400 text-opacity-70">
                {Number(price)} {t('сум')}
              </del>
            </>
          ) : (
            <>
              <span className="inline-block font-semibold text-[18px] text-brand">
                {Number(price)} {t('сум')}
              </span>
            </>
          )}
        </div>
        <div className="mt-3 ">
          <RenderLabelStock props={{ data: product, lang: lang }} />
        </div>
        <div className="block product-cart-button font-semibold">
          <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

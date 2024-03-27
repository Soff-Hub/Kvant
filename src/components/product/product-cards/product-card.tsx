import Image from '@components/ui/image';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import { ROUTES } from '@utils/routes';
import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { addPeriodToThousands } from '@components/cart/cart-item';
import { useCart } from '@contexts/cart/cart.context';
import { useEffect, useState } from 'react';

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
  return <AddToCart data={data} variant="mercury" lang={lang} />;
}

const ProductCard: React.FC<ProductProps> = ({ product, lang }) => {
  const {
    id,
    title,
    quantity,
    image,
    discount_price,
    price,
    slug,
    discount,
    is_many,
  } = product ?? {};

  const { openModal } = useModalAction();
  const { width } = useWindowSize();
  const iconSize = width! > 1024 ? '20' : '17';
  const { t } = useTranslation(lang, 'home');
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);
  const [productData, setProduct] = useState<any>(null);

  async function handlePopupView() {
    try {
      const headers = new Headers();
      headers.append('Accept-Language', lang);
      const response = await fetch(
        `${baseURL + API_ENDPOINTS.PRODUCTS_DETAILS}/${slug}/`,
        {
          headers: headers,
        },
      );
      const product = await response.json();
      setProduct(product);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  useEffect(() => {
    handlePopupView();
  }, [lang]);

  return (
    <article
      className={
        'flex flex-col gap-2 product-card relative p-2 sm:p-4  h-full  bg-white  card-image--jump hover:shadow-navigation hover:z-30 '
      }
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
            onClick={() => openModal('PRODUCT_VIEW', productData)}
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
          className="text-skin-base font-semibold text-sm leading-5 min-h-[40px] line-clamp-2 my-1 hover:text-brand"
        >
          {title}
        </Link>

        <div className="flex text-gray-500 space-x-2"></div>
        <div className="space-s-2">
          {discount_price !== Number(price) ? (
            <div className="flex flex-col-reverse">
              <span className=" font-semibold text-[18px] text-brand">
                {addPeriodToThousands(Number(discount_price)).replace(
                  /\.\d+$/,
                  '',
                )}{' '}
                {t('сум')}
              </span>
              <del className="mx-1  text-gray-400 text-opacity-70 text-[14px]">
                {addPeriodToThousands(price)?.replace(/\.\d+$/, '')} {t('сум')}
              </del>
            </div>
          ) : (
            <>
              <span className="inline-block font-semibold text-[18px] text-brand">
                {addPeriodToThousands(Number(price)).replace(/\.\d+$/, '')}{' '}
                {t('сум')}
              </span>
            </>
          )}
        </div>
        <div className="block product-cart-button font-semibold ">
          <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
          {(Number(quantity) < 1 || outOfStock) && is_many && (
            <button
              onClick={() => openModal('PAYMENT', id)}
              className="text-center text-[13px] hover:text-yellow-300 w-full mt-1"
            >
              {t('Нужно больше?')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

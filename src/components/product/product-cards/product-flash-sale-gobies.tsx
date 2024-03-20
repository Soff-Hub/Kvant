import cn from 'classnames';
import Image from '@components/ui/image';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import { productPlaceholder } from '@assets/placeholders';
import { useTranslation } from 'src/app/i18n/client';
import StarIcon from '@components/icons/star-icon';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { baseURL } from '@framework/utils/http';
import Text from '@components/ui/text';
import { useEffect } from 'react';
import { addPeriodToThousands } from '@components/cart/cart-item';

interface ProductProps {
  product: Product;
  className?: string;
  date?: string | number | Date | undefined;
  lang: string;
}

const ProductFlashSaleGobies: React.FC<ProductProps> = ({
  product,
  className,
  lang,
}) => {
  const {
    title,
    image,
    discount_price,
    discount,
    slug,
    price,
    view_count,
    description,
  } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'home');

  async function handlePopupView() {
    try {
      const headers = new Headers();
      headers.append('Accept-Language', lang);
      await fetch(`${baseURL + API_ENDPOINTS.PRODUCTS_DETAILS}/${slug}/`, {
        headers: headers,
      });
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  useEffect(() => {
    handlePopupView();
  }, [slug, lang]);

  return (
    <article
      className={cn(
        'flex flex-col justify-between group cursor-pointer relative px-5 l pt-16 pb-5',
        className,
      )}
      onClick={() => openModal('PRODUCT_VIEW', product)}
      title={title}
    >
      <div className="absolute z-10 top-6 left">
        <span className="text-[10px] font-medium text-white uppercase inline-block bg-red-600 rounded-sm px-2.5 pt-1 pb-[3px] ">
          {discount ? discount + ' ' + '%' : ''}
        </span>
      </div>
      <figure className="relative flex items-center justify-center flex-grow w-full  px-16 m-0 mx-auto xl:h-56 2xl:h-80">
        <Image
          src={image ?? productPlaceholder}
          alt={title || 'Product Image'}
          width={400}
          height={500}
          className="object-contain"
        />
      </figure>

      <div className="flex flex-col mt-8 mb-0.5 ">
        <h2 className="mb-2 text-skin-base font-semibold text-sm leading-5 lg:text-15px sm:leading-6">
          {title}
        </h2>

        <div className="mb-2 lg:mb-3">
          {discount_price !== Number(price) ? (
            <>
              <span className="inline-block mx-1 text-xl font-semibold  text-brand">
                {addPeriodToThousands(discount_price)?.replace(/\.\d+$/, '')}{' '}
                {t('сум')}
              </span>
              <del className="mx-1 text-base text-opacity-50 xl:text-lg text-gray-400">
                {addPeriodToThousands(price)?.replace(/\.\d+$/, '')} {t('сум')}
              </del>
            </>
          ) : (
            <>
              <span className="inline-block mx-1 text-xl font-semibold  text-brand">
                {addPeriodToThousands(price)?.replace(/\.\d+$/, '')} {t('сум')}
              </span>
            </>
          )}
        </div>
        <Text variant="medium">
          {description?.split(' ').slice(0, 40).join(' ')}
        </Text>
      </div>
    </article>
  );
};

export default ProductFlashSaleGobies;

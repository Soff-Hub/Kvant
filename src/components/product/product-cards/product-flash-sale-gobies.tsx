import cn from 'classnames';
import Image from '@components/ui/image';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import { zeroPad } from 'react-countdown';
import { productPlaceholder } from '@assets/placeholders';
import { useTranslation } from 'src/app/i18n/client';
import StarIcon from '@components/icons/star-icon';

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
    quantity,
    discount_price,
    discount,
    price,
    view_count,
  } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'common');

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }


  return (
    <article
      className={cn(
        'flex flex-col justify-between group cursor-pointer relative px-5 l pt-16 pb-5',
        className,
      )}
      onClick={handlePopupView}
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
          <span className="text-[13px] leading-4">({view_count} review)</span>
        </div>

        <div className="mb-2 lg:mb-3">
          {discount_price !== Number(price) ? (
            <>
              <span className="inline-block mx-1 text-xl font-semibold  text-brand">
                {discount_price} so'm
              </span>
              <del className="mx-1 text-base text-opacity-50 xl:text-lg text-gray-400">
                {Number(price)} so'm
              </del>
            </>
          ) : (
            <>
              <span className="inline-block mx-1 text-xl font-semibold  text-brand">
                {Number(price)} so'm
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductFlashSaleGobies;

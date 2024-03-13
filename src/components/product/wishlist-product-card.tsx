'use client';

import type { FC } from 'react';
import Image from '@components/ui/image';
import { Product } from '@framework/types';
import { IoIosHeart} from 'react-icons/io';
import { toast } from 'react-toastify';
import { useWindowSize } from 'react-use';
import { useCartWishtlists } from '@contexts/wishtlist/wishst.context';
import { useTranslation } from 'src/app/i18n/client';

interface ProductProps {
  product: Product;
  className?: string;
  lang: string;
}

const WishlistProductCard: FC<ProductProps> = ({ product, lang }) => {
  const { width } = useWindowSize();
  const { id, title, image, price, description, discount_price } =
    product ?? {};
  const placeholderImage = `/assets/placeholder/product.svg`;
  const { removeItemFromCart, items } = useCartWishtlists();
  const { t } = useTranslation(lang, 'home');

  function addToWishlist() {
    removeItemFromCart(id);
    const toastStatus: string = 'Удалить из списка избранного';
    toast(toastStatus, {
      style:{backgroundColor:'red', color:"white"},
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="flex flex-col py-4 border-b md:flex-row border-border-base 2xl:py-5 wishlist-card last:pb-0 first:-mt-8 lg:first:-mt-4 2xl:first:-mt-7">
      <div className="flex ">
        <div className="relative mt-1 shrink-0">
          <div className="flex overflow-hidden max-w-[80px]  transition duration-200 ease-in-out transform group-hover:scale-105">
            <Image
              src={image ?? placeholderImage}
              alt={title || 'Product Image'}
              width={80}
              height={80}
              quality={100}
              style={{ width: 'auto' }}
              className="object-cover bg-fill-thumbnail"
            />
          </div>
        </div>

        <div className="flex flex-col ltr:ml-2 rtl:mr-2 2xl:ltr:ml-3.5 2xl:rtl:mr-3.5 h-full">
          <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
            {title}
          </h2>
          <div className="-mx-1">
            {discount_price !== Number(price) ? (
              <>
                <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
                  {discount_price} {t('сум')}
                </span>
                <del className="mx-1 text-sm text-opacity-50 text-brand-dark">
                  {Number(price)} {t('сум')}
                </del>
              </>
            ) : (
              <>
                <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
                  {Number(price)} {t('сум')}
                </span>
              </>
            )}
          </div>
          <span className="text-[13px]">{description}</span>
        </div>
      </div>
      <div
        className="flex cursor-pointer ltr:ml-auto rtl:mr-auto md:pt-7"
        onClick={addToWishlist}
      >
        {items?.some((item: any) => item.title == title) && (
          <>
            <IoIosHeart className="text-brand w-5 h-5 mt-0.5" />
            <span className=" ltr:ml-3 rtl:mr-3 text-brand-dark font-medium text-15px -mt-0.5 md:mt-0">
              {t('Избранное')}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistProductCard;

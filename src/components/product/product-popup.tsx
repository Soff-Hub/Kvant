import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import { getVariations } from '@framework/utils/get-variations';
import { useTranslation } from 'src/app/i18n/client';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { baseURL } from '@framework/utils/http';


export default function ProductPopup({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);

  const variations = getVariations(data.variations);
  const {
    slug,
    image,
    title,
    price,
    description,
    discount,
    galleries,
    discount_price,
    quantity,
  } = data;
  const productUrl = `${baseURL}/${lang}${ROUTES.PRODUCT}/${slug}`;
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation),
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = data?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort(),
      ),
    );
  }
  const item = generateCartItem(data, selectedVariation);



  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    addItemToCart(item, selectedQuantity);
    // @ts-ignore
    toast(t('text-added-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function addToWishlist() {
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${lang}/${ROUTES.PRODUCT}/${slug}`);
  }

  useEffect(() => setSelectedQuantity(1), [data.id]);

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-2 md:px-5 mb-2 lg:mb-2 pt-4 md:pt-7">
          <div className="lg:flex items-stretch justify-between gap-8">
            <div className="xl:flex  justify-center overflow-hidden">
              {!!galleries ? (
                <ThumbnailCarousel gallery={galleries} lang={lang} />
              ) : (
                <div className="flex items-center justify-center w-auto">
                  <Image
                    src={image ?? productGalleryPlaceholder}
                    alt={title!}
                    width={650}
                    height={590}
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex flex-col lg:w-[430px] xl:w-[520px] 2xl:w-[520px]">
              <div className="pt-5 lg:pt-0 pb-5">
                <div
                  className="mb-2 md:mb-2.5 block -mt-1.5"
                  onClick={navigateToProductPage}
                  role="button"
                >
                  <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                    {title}
                  </h2>
                </div>

                <div className="flex items-center mt-5">
                  {discount_price !== Number(price) ? (
                    <>
                      <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                        {discount_price} so'm
                      </span>
                      <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3">
                        {Number(price)} so'm
                      </del>
                    </>
                  ) : (
                    <>
                      <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                        {Number(price)} so'm
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={
                    isInCart(item.id)
                      ? getItemFromCart(item.id).quantity + selectedQuantity >=
                        Number(item.stock)
                      : selectedQuantity >= Number(item.stock)
                  }
                  lang={lang}
                />
                <Button
                  onClick={addToCart}
                  className="w-full px-1.5"
                  disabled={!isSelected}
                  loading={addToCartLoader}
                >
                  <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                  {t('text-add-to-cart')}
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="border"
                    onClick={addToWishlist}
                    loading={addToWishlistLoader}
                    className={`group hover:text-brand ${
                      favorite === true && 'text-brand'
                    }`}
                  >
                    {favorite === true ? (
                      <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                    ) : (
                      <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                    )}

                    {t('text-wishlist')}
                  </Button>
                  <div className="relative group">
                    <Button
                      variant="border"
                      className={`w-full hover:text-brand ${
                        shareButtonStatus === true && 'text-brand'
                      }`}
                      onClick={handleChange}
                    >
                      <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                      {t('text-share')}
                    </Button>
                    <SocialShareBox
                      className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                        shareButtonStatus === true
                          ? 'visible opacity-100 top-full'
                          : 'opacity-0 invisible top-[130%]'
                      }`}
                      shareUrl={productUrl}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 xl:pt-8">
                <Heading className="mb-3 lg:mb-3.5">
                  {t('text-product-details')}:
                </Heading>
                <Text variant="small">
                  {description.split(' ').slice(0, 40).join(' ')}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

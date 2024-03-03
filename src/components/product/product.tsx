'use client';

import { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useParams } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'src/app/i18n/client';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import ProductCard from './product-cards/product-card';
import { SwiperSlide } from 'swiper/react';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Carousel from '@components/ui/carousel/carousel';

const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = useParams();
  const { slug } = pathname;
  const { width } = useWindowSize();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [dataProducts, setDataProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const productUrl = `${baseURL}${ROUTES.PRODUCT}/${slug}`;

  async function handlePopupView() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseURL + API_ENDPOINTS.PRODUCTS_DETAILS}/${pathname.slug}/`,
      );
      const product = await response.json();
      setData(product);
      setIsLoading(false);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  async function handlePopupViewProducts() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseURL + API_ENDPOINTS.PRODUCTS_DETAILS_SINGLE}/${pathname.slug}/`,
      );
      const product = await response.json();
      setDataProducts(product);
      setIsLoading(false);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  useEffect(() => {
    handlePopupViewProducts();
    handlePopupView();
  }, [slug]);

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  if (isLoading) return <p className={'pt-8 pb-8'}>Loading...</p>;
  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation),
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = data?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort(),
      ),
    );
  }
  const item = generateCartItem(data!, selectedVariation);

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(data!, selectedVariation);
    addItemToCart(item, quantity);
    toast('Added to the bag', {
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
    // to show btn feedback while product wishlist
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

  const breakpoints = {
    '1536': {
      slidesPerView: 6,
    },
    '1280': {
      slidesPerView: 5,
    },
    '1024': {
      slidesPerView: 4,
    },
    '640': {
      slidesPerView: 3,
    },
    '360': {
      slidesPerView: 2,
    },
    '0': {
      slidesPerView: 1,
    },
  };

  

  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-7 mb-8 lg:mb-12 bg-white p-5 rounded">
        <div className="col-span-5 mb-6 overflow-hidden  md:mb-8 lg:mb-0 xl:flex justify-center">
          {!!data?.galleries?.[0]?.image?.length ? (
            <ThumbnailCarousel
              gallery={data?.galleries}
              galleryClassName="xl:w-[100px]"
              lang={lang}
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={data?.image ?? '/product-placeholder.svg'}
                alt={data?.title!}
                width={900}
                height={680}
                style={{ width: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 ">
          <div className="pb-4 lg:pb-8">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {data?.title}
              </h2>
            </div>

            <div className="flex items-center mt-5">
              {data?.discount_price !== Number(data?.price) ? (
                <>
                  <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                    {data?.discount_price} so'm
                  </span>
                  <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                    {Number(data?.price)} so'm
                  </del>
                </>
              ) : (
                <>
                  <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                    {Number(data?.price)} so'm
                  </span>
                </>
              )}
            </div>
          </div>

          <dl className="productView-info  text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
            <dt
              className={`productView-info-name w-40 ltr:float-left rtl:float-right`}
            >
              {t('text-brand')}:
            </dt>
            <dd className="productView-info-value">{data?.brand}</dd>
            <dt
              className={`productView-info-name w-40 ltr:float-left rtl:float-right`}
            >
              {t('text-sku')}:
            </dt>
            <dd className="productView-info-value">200101</dd>
            <dt
              className={`productView-info-name w-40 ltr:float-left rtl:float-right`}
            >
              {t('text-weight')}:
            </dt>
            <dd className="productView-info-value" data-product-weight="">
              {data?.weight} KGS
            </dd>
            <dt
              className={`productView-info-name w-40 ltr:float-left rtl:float-right`}
            >
              {t('text-shipping')}:
            </dt>
            <dd className="productView-info-value">
              {t(`text-calculated-checkout`)}
            </dd>
          </dl>

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
        </div>
      </div>
      <ProductDetailsTab dataProps={data?.body} lang={lang} />
      <Carousel
        spaceBetween={6}
        breakpoints={breakpoints}
        grid={{ rows: 1, fill: 'row' }}
        className="flex"
        lang={lang}
      >
        {isLoading
          ? Array.from({ length: 20! }).map((_, idx) => (
              <SwiperSlide key={`${idx}`} className="p-2  rounded bg-white">
                <ProductCardLoader uniqueKey={`${idx}`} />
              </SwiperSlide>
            ))
          : dataProducts.map((product: any, idx: number) => (
              <SwiperSlide key={idx}>
                <ProductCard
                  key={idx}
                  product={product}
                  lang={lang}
                  variant={''}
                />
              </SwiperSlide>
            ))}
      </Carousel>
    </div>
  );
};

export default ProductSingleDetails;

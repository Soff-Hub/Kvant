// 'use client';

// import { useEffect, useState } from 'react';
// import Button from '@components/ui/button';
// import Counter from '@components/ui/counter';
// import { useParams } from 'next/navigation';
// import { ROUTES } from '@utils/routes';
// import useWindowSize from '@utils/use-window-size';
// import { useCart } from '@contexts/cart/cart.context';
// import { useCartWishtlists } from '@contexts/wishtlist/wishst.context';
// import { generateCartItem } from '@utils/generate-cart-item';
// import { toast } from 'react-toastify';
// import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
// import Image from '@components/ui/image';
// import CartIcon from '@components/icons/cart-icon';
// import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
// import { IoArrowRedoOutline } from 'react-icons/io5';
// import SocialShareBox from '@components/ui/social-share-box';
// import ProductDetailsTab from '@components/product/product-details/product-tab';
// import { useTranslation } from 'src/app/i18n/client';
// import { baseURL } from '@framework/utils/http';
// import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
// import ProductCard from './product-cards/product-card';
// import { SwiperSlide } from 'swiper/react';
// import ProductCardLoader from '@components/ui/loaders/product-card-loader';
// import Carousel from '@components/ui/carousel/carousel';
// import Heading from '@components/ui/heading';
// import Text from '@components/ui/text';
// import { siteSettings } from '@settings/site-settings';

// const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
//   const { t } = useTranslation(lang, 'home');
//   const pathname = useParams();
//   const { slug } = pathname;
//   const { width } = useWindowSize();
//   const { addItemToCart, isInCart, getItemFromCart } = useCart();
//   const { addItemToWishst, removeItemFromCart, items } = useCartWishtlists();
//   const [selectedQuantity, setSelectedQuantity] = useState(1);
//   const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
//   const [addToWishlistLoader, setAddToWishlistLoader] =
//     useState<boolean>(false);
//   const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
//   const [data, setData] = useState<any>([]);
//   const [dataProducts, setDataProducts] = useState<any>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const productUrl = `${baseURL}${ROUTES.PRODUCT}/${slug}`;

//   async function handlePopupView() {
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         `${baseURL + API_ENDPOINTS.PRODUCTS_DETAILS}/${pathname.slug}/`,
//       );
//       const product = await response.json();
//       setData(product);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Xatolik yuz berdi:', error);
//     }
//   }

//   async function handlePopupViewProducts() {
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         `${baseURL + API_ENDPOINTS.PRODUCTS_DETAILS_SINGLE}/${pathname.slug}/`,
//       );
//       const product = await response.json();
//       setDataProducts(product);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Xatolik yuz berdi:', error);
//     }
//   }

//   useEffect(() => {
//     handlePopupViewProducts();
//     handlePopupView();
//   }, [slug]);

//   const handleChange = () => {
//     setShareButtonStatus(!shareButtonStatus);
//   };

//   if (isLoading) return <p className={'pt-8 pb-8'}>Загрузка...</p>;

//   let selectedVariation: any = {};

//   interface Data {
//     id: string;
//     title: string;
//     slug: string;
//     image: string;
//     price: number;
//     discount?: number;
//     discount_price?: number;
//   }

//   function generateCartItemWishst(item: Data) {
//     const { id, title, slug, image, price, discount, discount_price } = item;
//     return {
//       id,
//       title,
//       slug,
//       image,
//       price,
//       discount,
//       discount_price,
//     };
//   }

//   const item = generateCartItem(data!, selectedVariation);
//   const itemWishst = generateCartItemWishst(data);

//   function addToCart() {
//     // to show btn feedback while product carting
//     setAddToCartLoader(true);
//     setTimeout(() => {
//       setAddToCartLoader(false);
//     }, 1500);

//     const item = generateCartItem(data!, selectedVariation);

//     addItemToCart(item, selectedQuantity);
//     toast(t('Добавлено в корзину'), {
//       progressClassName: 'fancy-progress-bar',
//       position: width! > 768 ? 'bottom-right' : 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   }

//   function addToWishlist() {
//     // to show btn feedback while product wishlist
//     if (items?.some((item: any) => item.title == data.title)) {
//       removeItemFromCart(itemWishst?.id);
//       const toastStatus: string = t('Удалить из списка избранного');
//       toast(toastStatus, {
//         style: { color: 'white', background: 'red' },
//         progressClassName: 'fancy-progress-bar',
//         position: width! > 768 ? 'bottom-right' : 'top-right',
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     } else {
//       setAddToWishlistLoader(true);
//       addItemToWishst(itemWishst);
//       const toastStatus: string = t('Добавлено в список избранных');

//       setTimeout(() => {
//         setAddToWishlistLoader(false);
//       }, 1500);
//       toast(toastStatus, {
//         progressClassName: 'fancy-progress-bar',
//         position: width! > 768 ? 'bottom-right' : 'top-right',
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   }

//   const breakpoints = {
//     '1536': {
//       slidesPerView: 6,
//     },
//     '1280': {
//       slidesPerView: 5,
//     },
//     '1024': {
//       slidesPerView: 4,
//     },
//     '640': {
//       slidesPerView: 3,
//     },
//     '360': {
//       slidesPerView: 2,
//     },
//     '0': {
//       slidesPerView: 1,
//     },
//   };

//   return (
//     <div className="pt-6 pb-2 md:pt-7">
//       <div className="grid-cols-12 lg:grid gap-3 2xl:gap-3  bg-white p-5 rounded">
//         <div className="col-span-4 mb-6 overflow-hidden  md:mb-8 lg:mb-0 xl:flex justify-center">
//           {!!data?.galleries?.[0]?.image?.length ? (
//             <ThumbnailCarousel
//               gallery={data?.galleries}
//               galleryClassName="xl:w-[70px]"
//               lang={lang}
//             />
//           ) : (
//             <div className="flex items-center justify-center w-auto">
//               <Image
//                 src={data?.image ?? '/product-placeholder.svg'}
//                 alt={data?.title!}
//                 width={900}
//                 height={680}
//                 style={{ width: 'auto' }}
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col col-span-5 shrink-0 mb-3">
//           <div className="pb-4 lg:pb-8">
//             <div className="md:mb-2.5 block -mt-1.5">
//               <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
//                 {data?.title}
//               </h2>
//             </div>

//             <div className="flex items-center mt-5">
//               {data?.discount_price !== Number(data?.price) ? (
//                 <>
//                   <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
//                     {data?.discount_price} {t('сум')}
//                   </span>
//                   <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
//                     {Number(data?.price)} {t('сум')}
//                   </del>
//                 </>
//               ) : (
//                 <>
//                   <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
//                     {Number(data?.price)} {t('сум')}
//                   </span>
//                 </>
//               )}
//             </div>
//           </div>
//           <dl className="productView-info  text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
//             {data?.characteristics?.map((item: any) => (
//               <ul className="flex gap-3 justify-between w-40 unsty">
//                 <li>{item?.title}: </li>
//                 <li>{item?.value}</li>
//               </ul>
//             ))}
//           </dl>

//           <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
//             <Counter
//               variant="single"
//               value={selectedQuantity}
//               onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
//               onDecrement={() =>
//                 setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
//               }
//               disabled={
//                 isInCart(item.id)
//                   ? getItemFromCart(item.id).quantity + selectedQuantity >=
//                     Number(item.stock)
//                   : selectedQuantity >= Number(item.stock)
//               }
//               lang={lang}
//             />
//             <Button
//               onClick={addToCart}
//               className="w-full px-1.5"
//               disabled={
//                 isInCart(item.id)
//                   ? getItemFromCart(item.id).quantity + selectedQuantity >=
//                     Number(item.stock)
//                   : selectedQuantity >= Number(item.stock)
//               }
//               loading={addToCartLoader}
//             >
//               <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
//               {t('Добавить в корзину')}
//             </Button>
//           </div>
//         </div>
//         <div className="flex flex-col col-span-3 shrink-0 bg-grey-600">
//           <h1 className="text-lg font-bold transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
//             Рассрочка платежа
//           </h1>
//           <div className="flex justify-start gap-3 mt-2">
//             <span className="py-1   rounded border font-medium text-gray-400 cursor-pointer border-gray-350 px-3">
//               3 мес.
//             </span>
//             <span className="py-1  rounded border font-medium text-gray-400 cursor-pointer border-gray-350 px-3">
//               6 мес.
//             </span>
//             <span className="py-1  bg-blue-100 rounded border font-medium text-blue-500 cursor-pointer border-blue-400 px-3">
//               12 мес.
//             </span>
//           </div>
//           <div className="border border-blue-400 shadow-cardHover flex flex-col justify-between rounded-[8px] mt-4 h-[170px] p-3">
//             <h1 className="text-sm ">Рассрочка от Asaxiy</h1>
//             <div className="flex justify-between  items-center">
//               <div>
//                 <Image
//                   src={siteSettings.logo.urlReverse}
//                   alt={siteSettings.logo.alt}
//                   width={150}
//                   height={40}
//                 />
//               </div>
//               <h1 className="font-bold text-blue-600">63 700 сум</h1>
//             </div>
//             <button className="bg-blue-700 text-white font-bold  p-3 w-full rounded">
//               Заказать в рассрочку
//             </button>
//           </div>
//           <div className="flex flex-col gap-3 mt-3">
//             <Button
//               variant="border"
//               onClick={addToWishlist}
//               loading={addToWishlistLoader}
//               className={`group hover:text-brand ${
//                 items?.some((item: any) => item.title == data.title) &&
//                 'text-brand'
//               }`}
//             >
//               {items?.some((item: any) => item.title == data.title) ? (
//                 <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
//               ) : (
//                 <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
//               )}

//               {t('Список желаний')}
//             </Button>
//             <div className="relative group">
//               <Button
//                 variant="border"
//                 className={`w-full hover:text-brand ${
//                   shareButtonStatus === true && 'text-brand'
//                 }`}
//                 onClick={handleChange}
//               >
//                 <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
//                 {t('Делиться')}
//               </Button>
//               <SocialShareBox
//                 className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
//                   shareButtonStatus === true
//                     ? 'visible opacity-100 top-full'
//                     : 'opacity-0 invisible top-[130%]'
//                 }`}
//                 shareUrl={productUrl}
//                 lang={lang}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white  mb-8 lg:mb-12 px-5 pb-5">
//         <Heading className="mb-3 lg:mb-3.5">{t('Краткое описание')}:</Heading>
//         <Text variant="small">
//           {data?.description?.split(' ').slice(0, 40).join(' ')}
//         </Text>
//       </div>

//       <ProductDetailsTab dataProps={data?.body} lang={lang} />
//       <Carousel
//         spaceBetween={6}
//         breakpoints={breakpoints}
//         grid={{ rows: 1, fill: 'row' }}
//         className="flex"
//         lang={lang}
//       >
//         {isLoading
//           ? Array.from({ length: 20! }).map((_, idx) => (
//               <SwiperSlide key={`${idx}`} className="p-2  rounded bg-white">
//                 <ProductCardLoader uniqueKey={`${idx}`} />
//               </SwiperSlide>
//             ))
//           : Array.from({ length: 20! }).map((_) =>
//               dataProducts.map((product: any) => (
//                 <SwiperSlide key={product?.id}>
//                   <ProductCard
//                     key={product?.id}
//                     product={product}
//                     lang={lang}
//                     variant={''}
//                   />
//                 </SwiperSlide>
//               )),
//             )}
//       </Carousel>
//     </div>
//   );
// };

// export default ProductSingleDetails;

'use client';

import { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { useCartWishtlists } from '@contexts/wishtlist/wishst.context';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import { useTranslation } from 'src/app/i18n/client';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import ProductCard from './product-cards/product-card';
import { SwiperSlide } from 'swiper/react';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Carousel from '@components/ui/carousel/carousel';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useModalAction } from '@components/common/modal/modal.context';
import { useCart } from '@contexts/cart/cart.context';
import { addPeriodToThousands } from '@components/cart/cart-item';
import { getToken } from '@framework/utils/get-token';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;
  return <AddToCart data={data} variant="single" lang={lang} />;
}

const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'home');
  const pathname = useParams();
  const { slug } = pathname;
  const { width } = useWindowSize();
  const { addItemToWishst, removeItemFromCart, items } = useCartWishtlists();
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [dataProducts, setDataProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState(Boolean(false));
  const token = getToken();
  const router = useRouter();
  const { openModal, closeModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(data?.id) && !isInStock(data?.id);

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

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  if (isLoading) return <p className={'pt-8 pb-8'}>Загрузка...</p>;

  interface Data {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    discount?: number;
    discount_price?: number;
  }

  function generateCartItemWishst(item: Data) {
    const { id, title, slug, image, price, discount, discount_price } = item;
    return {
      id,
      title,
      slug,
      image,
      price,
      discount,
      discount_price,
    };
  }

  const itemWishst = generateCartItemWishst(data);

  function addToWishlist() {
    // to show btn feedback while product wishlist
    if (items?.some((item: any) => item.title == data.title)) {
      removeItemFromCart(itemWishst?.id);
      const toastStatus: string = t('Удалить из списка избранного');
      toast(toastStatus, {
        style: { color: 'white', background: 'red' },
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setAddToWishlistLoader(true);
      addItemToWishst(itemWishst);
      const toastStatus: string = t('Добавлено в список избранных');

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
  const products_click = {
    image: data?.image,
    title: data?.title,
    price: data?.discount_price,
  };

  function handleClickPayme() {
    if (isClient && token) {
      Cookies.remove('products_click');
      Cookies.set('products_click', JSON.stringify(products_click));
      router.push(`/checkout/checkout?product=${data?.slug}`);
    } else {
      router.push(`/${lang}${ROUTES.SIGN_UP}`);
    }
    closeModal();
  }

 

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
                    {addPeriodToThousands(data?.discount_price)?.replace(
                      /\.\d+$/,
                      '',
                    )}{' '}
                    {t('сум')}
                  </span>
                  <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                    {addPeriodToThousands(Number(data?.price)).replace(
                      /\.\d+$/,
                      '',
                    )}{' '}
                    {t('сум')}
                  </del>
                </>
              ) : (
                <>
                  <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                    {addPeriodToThousands(Number(data?.price)).replace(
                      /\.\d+$/,
                      '',
                    )}{' '}
                    {t('сум')}
                  </span>
                </>
              )}
            </div>
          </div>

          <dl className="productView-info  text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
            {data?.characteristics?.map((item: any) => (
              <ul className="flex gap-3 justify-between w-40 unsty">
                <li>{item?.title}: </li>
                <li>{item?.value}</li>
              </ul>
            ))}
          </dl>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <RenderPopupOrAddToCart props={{ data: data, lang: lang }} />
            {(Number(data?.quantity) < 1 || outOfStock) && data?.is_many && (
              <button
                onClick={() => openModal('PAYMENT', data?.id)}
                className="text-center text-[13px] hover:text-yellow-300 w-full mt-0"
              >
                {"Ko'proq kerakmi?"}
              </button>
            )}
            <Button
              onClick={handleClickPayme}
              variant="border"
              className={`w-full hover:border hover:text-brand hover:border-brand font-bold  bg-gray-200`}
            >
              {t('Купить сейчас')}
            </Button>

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="border"
                onClick={addToWishlist}
                loading={addToWishlistLoader}
                className={`group hover:text-brand ${
                  items?.length > 0 && 'text-brand'
                }`}
              >
                {items?.some((item: any) => item.title == data.title) ? (
                  <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                )}

                {t('Список желаний')}
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
                  {t('Делиться')}
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
              {t('Краткое описание')}:
            </Heading>
            <Text variant="small">
              {data?.description?.split(' ').slice(0, 40).join(' ')}
            </Text>
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
          : Array.from({ length: 20! }).map((_) =>
              dataProducts.map((product: any) => (
                <SwiperSlide key={product?.id}>
                  <ProductCard
                    key={product?.id}
                    product={product}
                    lang={lang}
                    variant={''}
                  />
                </SwiperSlide>
              )),
            )}
      </Carousel>
    </div>
  );
};

export default ProductSingleDetails;

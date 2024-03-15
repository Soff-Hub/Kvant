'use client';

import {useState } from 'react';
import Button from '@components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import { useTranslation } from 'src/app/i18n/client';
import { baseURL } from '@framework/utils/http';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useModalAction, useModalState } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { useCartWishtlists } from '@contexts/wishtlist/wishst.context';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;
  return <AddToCart data={data} variant="single" lang={lang} />;
}

const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'home');
  const { data } = useModalState();
  const pathname = useParams();
  const { slug } = pathname;
  const { width } = useWindowSize();
  const { addItemToWishst, removeItemFromCart, items } = useCartWishtlists();
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const router = useRouter();
  const { closeModal } = useModalAction();

  const productUrl = `${baseURL}${ROUTES.PRODUCT}/${slug}`;

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

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

  const products_click = {
    image: data?.image,
    title: data?.title,
    price: data?.discount_price,
  };

  function handleClickPayme() {
    Cookies.remove('products_click');
    Cookies.set('products_click', JSON.stringify(products_click));
    router.push(`/checkout/checkout?product=${data?.slug}`);
  }

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
       <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-2 md:px-5 mb-2 lg:mb-2 pt-4 md:pt-7">
          <div className="lg:flex items-stretch justify-between gap-8">
            <div className="xl:flex  justify-center overflow-hidden">
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

            <div className="flex-shrink-0 flex flex-col lg:w-[430px] xl:w-[520px] 2xl:w-[520px]">
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
                        {data?.discount_price} {t('сум')}
                      </span>
                      <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                        {Number(data?.price)} {t('сум')}
                      </del>
                    </>
                  ) : (
                    <>
                      <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                        {Number(data?.price)} {t('сум')}
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
        </div>
      </div>
    </div>
  );
};

export default ProductSingleDetails;


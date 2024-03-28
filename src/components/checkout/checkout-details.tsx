'use client';

import Button from '@components/ui/button';
import { useTranslation } from 'src/app/i18n/client';
import Input from '@components/ui/input';
import { useForm } from 'react-hook-form';
import { useCart } from '@contexts/cart/cart.context';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { Listbox, Transition } from '@headlessui/react';
import { IoChevronDown, IoCheckmarkSharp } from 'react-icons/io5';
import TextArea from '@components/ui/form/text-area';
import MapContainer from '@components/ui/map';

const CheckoutDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'login');
  const { items, resetCart } = useCart();
  const [selectID, setSelectId] = useState<string>('click');
  const [branches, setBarnches] = useState([]);
  const [check, setCheck] = useState<any>('delivery');
  const router = useRouter();
  const currentSelectedItem = branches[0];
  const [selectedItem, setSelectedItem] = useState<any>(currentSelectedItem);
  const [isClient, setIsClient] = useState(false);

  interface SignUpInputCheckout {
    customer_name: string;
    phone: number;
    address: string;
    paymentMethod: string;
    text: string;
    social:string
  }

  async function getBranches() {
    try {
      const response = await fetch(baseURL + API_ENDPOINTS.BRANCHES, {
        headers: {
          'Accept-Language': lang, // Bu yerda so'ragan tilni o'zgartiring
        },
      });
      const branches = await response.json();
      setBarnches(branches);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputCheckout>();
  const products: any = [];

  function onSubmit({
    phone,
    address,
    customer_name,
    text,
    social,
  }: SignUpInputCheckout) {
    const token = Cookies.get('auth_token');
    Cookies.remove('products_click');

    const dataChecout = {
      customer_name,
      phone_number: phone,
      address: address,
      order_type: check,
      provider: selectID,
      products,
      branch: selectedItem?.id ? selectedItem?.id : null,
      description: text,

    };

    const headers = {
      'Accept-Language': 'uz', // Qo'shilgan Accept-Language header
      Authorization: `Bearer ${token}`, // Token bilan Authorization header
    };

    if (token) {
      axios
        .post(baseURL + API_ENDPOINTS.ORDERS_CREATE, dataChecout, { headers })
        .then((response) => {
          toast(t('Buyurtma muvaffaqiyatli yuborildi'), {
            style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          resetCart();
          if (response?.data?.msg) {
            router.push(`${response?.data?.msg}`);
          } else {
            router.push(`/${lang}/my-account/orders`);
          }
        })
        .catch((error) => {
          console.error('Buyurtma yuborishda xatolik:', error);
        });
    }
  }

  items?.map((item: any) =>
    products.push({
      product: item.id,
      quantity: item?.quantity,
    }),
  );

  const dateCard = [
    // {
    //   id: 1,
    //   name: 'Visa',
    //   image: '../assets/Visa.png',
    // },
    {
      id: 2,
      name: 'click',
      image: '../assets/Click.png',
    },
    {
      id: 4,
      name: 'payze',
      image: '../assets/Pyme.png',
    },
    // {
    //   id: 3,
    //   name: 'Iman',
    //   image: '../assets/iman.webp',
    // },
  ];

  useEffect(() => {
    getBranches();
  }, [lang]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);
  

  return (
    isClient && (
      <>
        <h1 className="font-bold mb-3">{t('Оформление заказа')}</h1>
        <div className="border rounded-md border-border-base bg-white p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="grid-cols-12 lg:grid gap-5">
              <Input
                label={`${t('Ф.И.О *')}`}
                type="text"
                variant="solid"
                {...register('customer_name', {
                  required: `${t('Ф.И.О * не введен')}`,
                })}
                error={errors.customer_name?.message}
                lang={lang}
                placeholder=""
                className="col-span-6"
              />
              <Input
                label={`${'Телефон *'}`}
                type="phone"
                variant="solid"
                {...register('phone', {
                  required: `${t('Номер телефона введен неверно!')}`,
                  pattern: {
                    value: /^\+998\s?\d{9}$/,
                    message: `${t('Номер телефона указан неверно')}`,
                  },
                })}
                error={errors.phone?.message}
                lang={lang}
                defaultValue="+998"
                maxLength={13} // +998 kodi va 9 ta raqam uchun
                placeholder=""
                className="col-span-6 my-3 lg:my-0"
              />
              <div className="col-span-6 ">
                <h1 className="font-bold *">
                  {t('Тип поступления продукции')}
                </h1>
                <div className=" w-full flex mt-2 justify-between gap-4">
                  <div
                    onClick={() => setCheck('delivery')}
                    className={`bg-gray-200 w-full ${check === 'delivery' ? 'border border-blue-500 text-blue-500' : ''} cursor-pointer p-3 rounded flex items-center justify-start`}
                  >
                    <input
                      checked={check === 'delivery'}
                      type="radio"
                      name="radio"
                      id="radio"
                    />
                    <span className="ml-2 font-medium">{t('Доставка')}</span>
                  </div>

                  <div
                    onClick={() => setCheck('take_away')}
                    className={`bg-gray-200 w-full ${check === 'take_away' ? 'border border-blue-500 text-blue-500' : ''} cursor-pointer p-3 rounded flex items-center justify-start`}
                  >
                    <input
                      checked={check === 'take_away'}
                      type="radio"
                      name="radio"
                      id="radio"
                    />
                    <span className="ml-2 font-medium">
                      {t('Еда на вынос')}
                    </span>
                  </div>
                </div>
              </div>

              {check === 'take_away' && (
                <div className="col-span-12">
                  <h1 className="font-bold text-black mb-2">
                    {t('Выберите филиал *')}
                  </h1>

                  <Listbox
                    value={selectedItem}
                    onChange={(value: string) => setSelectedItem(value)}
                  >
                    {({ open }) => (
                      <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
                        <div className="flex items-center  border-brand p-3 rounded border-[1.5px]">
                          <Listbox.Button className="relative w-full text-sm font-medium rounded-lg cursor-pointer ltr:pr-5 rtl:pl-5 text-brand-dark ltr:text-left rtl:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-brand focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                            <span className="block truncate">
                              {selectedItem?.name} {selectedItem?.description}
                            </span>
                            <span className="absolute flex items-end pointer-events-none top-1 ltr:right-0 rtl:left-0 ltr:pl-1 rtl:pr-1">
                              <IoChevronDown
                                className="w-3.5 h-3.5 text-brand-muted"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            static
                            className="absolute z-20 w-full py-1 mt-1 overflow-auto text-sm rounded-md shadow-lg bg-brand-light max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {branches?.map((item: any, index: number) => (
                              <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? 'text-brand-dark bg-fill-dropdown-hover'
                                      : 'bg-brand-light'
                                  }
                cursor-pointer transition-all select-none relative py-2.5 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4`
                                }
                                value={item}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`${
                                        selected ? 'font-medium' : 'font-normal'
                                      } block truncate`}
                                    >
                                      {t(item?.name)} {t(item?.description)}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={`${active ? 'text-brand' : ''}
                            check-icon absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`}
                                      >
                                        <IoCheckmarkSharp
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    )}
                  </Listbox>
                </div>
              )}
              {check === 'delivery' && (
                <>
                  <Input
                    label={`${t('Адрес *')}`}
                    type="text"
                    variant="solid"
                    {...register('address', {
                      required: `${t('Адрес не введен')}`,
                    })}
                    error={errors.address?.message}
                    lang={lang}
                    placeholder=""
                    className="col-span-12 my-3 lg:my-0"
                  />
                  <div className="mt-2 mb-10 relative h-[420px] col-span-12">
                    <h1 className="font-bold  mb-3">
                      {t('Выберите адрес вашего местоположения *')}
                    </h1>
                    <MapContainer
                      lat={41.259282}
                      lng={69.2065356}
                      height={'420px'}
                      zoom={15}
                      showInfoWindow={true}
                    />
                  </div>
                </>
              )}
              <div className="col-span-12">
                <h1 className="font-bold text-black">{t('Способ оплаты *')}</h1>
                <div className="w-full mt-2 flex justify-start gap-5">
                  {dateCard.map((item) => (
                    <div
                      key={item.id}
                      className={`w-full shadow-cardHover rounded-lg cursor-pointer py-2 bg-${item.name === selectID ? 'yellow' : 'white'}-100 flex justify-center items-center`}
                      onClick={() => setSelectId(item.name)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ maxHeight: '90px' }}
                      />
                    </div>
                  ))}
                  <div
                    className={`w-full shadow-cardHover rounded-lg cursor-pointer py-2 bg-${selectID === 'cash' ? 'yellow' : 'white'}-100 text-${selectID === 'cash' ? 'gray' : ''}-200 flex justify-center items-center`}
                    onClick={() => setSelectId('cash')}
                  >
                    <h1 className="font-bold text-[24px]">{t('Наличные')}</h1>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12">
                <Input
                  label={`${t("Bo'glanish uchun linklar")}`}
                  type="text"
                  variant="solid"
                  {...register('social')}
                  lang={lang}
                  placeholder=""
                  className="col-span-12"
                />
              </div>

              <div className="w-full col-span-12">
                <TextArea
                  variant="normal"
                  label={`${t('Комментарий к заказу')}`}
                  {...register('text')}
                  placeholder={`${t('Комментарий к заказу')}...`}
                  lang={lang}
                />
              </div>
              <div className="w-full col-span-12 ">
                <Button
                  type="submit"
                  // loading={isLoading}
                  // disabled={isLoading}
                  className="w-full tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('Продолжать')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default CheckoutDetails;

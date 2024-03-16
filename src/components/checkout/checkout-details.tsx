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
import MapContainer from '@components/ui/map';

import { Listbox, Transition } from '@headlessui/react';
import { IoChevronDown, IoCheckmarkSharp } from 'react-icons/io5';
import TextArea from '@components/ui/form/text-area';

const CheckoutDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'login');
  const { items, resetCart } = useCart();
  const [selectID, setSelectId] = useState<string>('naqt');
  const [branches, setBarnches] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [check, setCheck] = useState<number>(0);
  const router = useRouter();
  const currentSelectedItem = branches[0];
  const [selectedItem, setSelectedItem] = useState<any>(currentSelectedItem);

  interface SignUpInputCheckout {
    phone: number;
    address: string;
    paymentMethod: string;
    text:string;
  }

  async function getBranches() {
    try {
      const response = await fetch(baseURL + API_ENDPOINTS.BRANCHES);
      const product = await response.json();
      setBarnches(product);
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

  function onSubmit({ phone, address }: SignUpInputCheckout) {
    const token = Cookies.get('auth_token');
    Cookies.remove('products_click');
    
    const dataChecout = {
      phone_number: phone,
      address: address,
      order_type: 'delivery',
      provider: selectID,
      products,
    };
    const headers = {
      'Accept-Language': 'uz', // Qo'shilgan Accept-Language header
      Authorization: `Bearer ${token}`, // Token bilan Authorization header
    };

    if (token) {
      axios
        .post(baseURL + API_ENDPOINTS.ORDERS_CREATE, dataChecout, { headers })
        .then((response) => {
          toast.success(t('Buyurtma muvaffaqiyatli yuborildi'), {
            style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          resetCart();
          router.push(`${response?.data?.msg}`);
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
      name: 'Payme',
      image: '../assets/Pyme.png',
    },
    // {
    //   id: 3,
    //   name: 'Iman',
    //   image: '../assets/iman.webp',
    // },
    {
      id: 4,
      name: 'Click',
      image: '../assets/Click.png',
    },
  ];

  // Joylashuvni aniqlash funksiyasi
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting the current location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    // Funksiyani chaqirish joyi
    getCurrentLocation();
  }, []);

  useEffect(() => {
    getBranches();
  }, []);

  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);

  return (
    <>
      <h1 className="font-bold mb-3">Оформление заказа</h1>

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
              {...register('address', {
                required: `${t('Адрес не введен')}`,
              })}
              error={errors.address?.message}
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
              className="col-span-6"
            />
            <div className="col-span-6 ">
              <h1 className="font-bold *">Тип поступления продукции</h1>
              <div className=" w-full flex mt-2 justify-between gap-4">
                <div
                  onClick={() => setCheck(1)}
                  className={`bg-gray-200 w-full ${check === 1 ? 'border border-blue-500 text-blue-500' : ''} cursor-pointer p-3 rounded flex items-center justify-start`}
                >
                  <input
                    checked={check === 1}
                    type="radio"
                    name="radio"
                    id="radio"
                  />
                  <span className="ml-2 font-medium">Еда на вынос</span>
                </div>

                <div
                  onClick={() => setCheck(2)}
                  className={`bg-gray-200 w-full ${check === 2 ? 'border border-blue-500 text-blue-500' : ''} cursor-pointer p-3 rounded flex items-center justify-start`}
                >
                  <input
                    checked={check === 2}
                    type="radio"
                    name="radio"
                    id="radio"
                  />
                  <span className="ml-2 font-medium">Доставка</span>
                </div>
              </div>
            </div>

            {check === 1 && (
              <div className="col-span-12">
                <h1 className="font-bold text-black mb-2">Выберите филиал *</h1>

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
            {check === 2 && (
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
                  className="col-span-12"
                />
                <div className="mt-2 mb-10 relative h-[420px] col-span-12">
                  <h1 className="font-bold  mb-3">
                    Выберите адрес вашего местоположения *
                  </h1>
                  <MapContainer currentLocation={currentLocation} />
                </div>
              </>
            )}
            <div className="col-span-12">
              <h1 className="font-bold text-black">Способ оплаты *</h1>
              <div className="w-full mt-2 flex justify-start gap-5">
                <div
                  className={`w-full shadow-cardHover rounded-lg cursor-pointer py-2 bg-${selectID === 'naqt' ? 'yellow' : 'white'}-100 text-${selectID === 'naqt' ? 'gray' : ''}-200 flex justify-center items-center`}
                  onClick={() => setSelectId('naqt')}
                >
                  <h1 className="font-bold text-[24px]">Наличные</h1>
                </div>

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
              </div>
            </div>
           <div className='w-full col-span-12'>
           <TextArea
              variant="normal"
              label={`${t('Комментарий к заказу')}`}
              {...register('text')}
              placeholder="Комментарий к заказу..."
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
  );
};

export default CheckoutDetails;

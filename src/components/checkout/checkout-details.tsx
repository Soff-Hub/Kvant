'use client';

import Button from '@components/ui/button';
import { useTranslation } from 'src/app/i18n/client';
import Input from '@components/ui/input';
import { useForm } from 'react-hook-form';
import { useCart } from '@contexts/cart/cart.context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Map from '@components/ui/map';
import ListBox from '@components/ui/filter-list-box';

const CheckoutDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'login');
  const { items, resetCart } = useCart();
  const [selectID, setSelectId] = useState<string>('naqt');
  const [filail, setFilail] = useState<number>(1);
  const [branches, setBarnches] = useState<any>([]);
  const [check, setCheck] = useState<number>(0);
  const router = useRouter();

  interface SignUpInputCheckout {
    phone: number;
    address: string;
    paymentMethod: string;
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

  const dateFila = [
    {
      id: 1,
      name: 'Филале 1',
    },
    {
      id: 2,
      name: 'Филале 2',
    },
    {
      id: 3,
      name: 'Филале 3',
    },
    {
      id: 4,
      name: 'Филале 4',
    },
    {
      id: 5,
      name: 'Филале 5',
    },
  ];

  useEffect(() => {
    getBranches();
  }, []);

  console.log(branches);

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
              {/* <ListBox options={branches?.length > 0 && branches} lang={lang} /> */}
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
                <h1 className="font-bold text-black">Выберите филиал *</h1>

                <select
                  onClick={(e: any) => setFilail(e.target.value)}
                  className="w-full border rounded border-blue-700 mt-2"
                >
                  {dateFila?.map((item) => (
                    <option value={item.id} className="py-5 flex flex-col gap-4">
                      <span>{item.name}</span>
                      <span>{item.name}</span>
                    </option>
                  ))}
                </select>
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
                  <Map
                    lat={1.295831}
                    lng={103.76261}
                    height={'420px'}
                    zoom={15}
                    showInfoWindow={true}
                  />
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

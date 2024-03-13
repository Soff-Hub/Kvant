'use client';

import Button from '@components/ui/button';
import { useTranslation } from 'src/app/i18n/client';
import Input from '@components/ui/input';
import { useForm } from 'react-hook-form';
import { useCart } from '@contexts/cart/cart.context';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CheckoutDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'login');
  const { items, resetCart } = useCart();
  const [selectID, setSelectId] = useState<string>('click');
  const router = useRouter();

  interface SignUpInputCheckout {
    phone: number;
    address: string;
    paymentMethod: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputCheckout>();
  const products: any = [];

  function onSubmit({ phone, address }: SignUpInputCheckout) {
    const token = Cookies.get('auth_token');
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

  return (
    <div className="border rounded-md border-border-base bg-white p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-4">
          <Input
            label={`${'Номер телефона'}`}
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
          />
          <Input
            label={`${t('Адрес')}`}
            type="text"
            variant="solid"
            {...register('address', {
              required: `${t('Адрес не введен')}`,
            })}
            error={errors.address?.message}
            lang={lang}
            placeholder=""
          />
          <label
            htmlFor="paymentMethod"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            {t("Выберите способ оплаты")}
          </label>
          <select
            onChange={(e: any) => setSelectId(e.target.value)}
            id="paymentMethod"
            className="bg-gray-50 border py-3.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700"
          >
            <option value="cash">{t("Наличные")}</option>
            <option value="click">{t("Картой")}</option>
          </select>
          <div className="relative">
            <Button
              type="submit"
              // loading={isLoading}
              // disabled={isLoading}
              className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
              variant="formButton"
            >
              {t('Продолжать')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutDetails;

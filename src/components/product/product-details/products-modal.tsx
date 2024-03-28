import React from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { toast } from 'react-toastify';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';

interface ContactFormValues {
  customer_name: string;
  phone_number: string;
  quantity: number;
}

const ProductsModal = ({ lang }: { lang: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();
  const { closeModal } = useModalAction();
  const { data } = useModalState();
  const { t } = useTranslation(lang, 'login');

  async function onSubmit(values: ContactFormValues) {
    const dataForm = { product: data, ...values };
    const token = getToken();
    if (token) {
      try {
        const response = await fetch(baseURL + API_ENDPOINTS.PRODUCTS_MORE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataForm), // values ni o'zgartirdim
        });
        const data = await response.json();
        if (response.ok) {
          toast(t('Успешный!'), {
            style: { color: 'white', background: 'green' },
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          closeModal();
        } else {
          toast(data?.msg[0] + '', {
            style: { color: 'white', background: 'red' },
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error: any) {
        console.log(error, 'forget password error response');
      }
    }
  }

  const mounted = useIsMounted();
  return (
    <div className="md:w-[300px]  xl:w-[600px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <div className="overflow-hidden">
        <CloseButton onClick={closeModal} />
        <div className="p-5">
          <h1 className="font-bold text-[21px] text-center mb-3">
            {t('Заявка на продукт')}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <Input
              variant="solid"
              label={`${t('Полное имя')}`}
              placeholder={`${t('Введите свое полное имя')}`}
              {...register('customer_name')}
              lang={lang}
            />
            <Input
              label={t('Телефон')}
              type="phone"
              variant="solid"
              {...register('phone_number', {
                required: `${t('Номер телефона введен неверно!')}`,
                pattern: {
                  value: /^\+998\s?\d{9}$/,
                  message: `${t('Номер телефона указан неверно')}`,
                },
              })}
              error={errors.phone_number?.message}
              lang={lang}
              defaultValue="+998"
              maxLength={13} // +998 kodi va 9 ta raqam uchun
            />
            <Input
              type="phone"
              variant="solid"
              label={`${t('Число продукта')} *`}
              placeholder={`${t('Число продукта')}`}
              {...register('quantity', {
                required:`${t('Число продукта не введено')}`,
              })}
              error={errors.quantity?.message}
              lang={lang}
            />
            <Button variant="formButton" className="w-full" type="submit">
              {mounted && <>{t('Отправка')}</>}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;

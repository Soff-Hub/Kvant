'use client';

import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useUI } from '@contexts/ui.context';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type ForgetPasswordType = {
  phone: any;
};

export default function ForgetPasswordFormModal({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'login');
  const { closeModal } = useModalAction();
  const [loader, setLoader] = useState(false);
  const { authorize } = useUI();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>();

  async function onSubmit({ phone }: ForgetPasswordType) {
    try {
      setLoader(false);
      const response = await fetch(baseURL + API_ENDPOINTS.FORGET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': lang,
        },
        body: JSON.stringify({ phone: phone }),
      });
      const data = await response.json();
      if (data?.tokens?.access) {
        Cookies.remove('phone', phone); // Yangi raqam o'rnatamiz
        Cookies.set('auth_token', data.tokens.access); // Yangi tokenni o'rnatamiz
        Cookies.set('phone', phone); // Yangi raqam o'rnatamiz
        authorize();
        setLoader(true);
        toast.success(t('Успешный!'), {
          style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push(`${lang}/forget-password`); // Boshqa sahifaga yo'naltiramiz
        closeModal()

      } else {
        toast.error(data?.msg[0] + '', {
          style: { color: 'white', background: 'red' }, // Xabar rangi va orqa fon rangi
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

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          {t("Мы вышлем вам код для сброса пароля")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={t('Номер телефона')}
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
        />

        <Button
          loading={loader}
          disabled={loader}
          type="submit"
          variant="formButton"
          className="w-full h-11 md:h-12 mt-3"
        >
         {t('Отправка')} 
        </Button>
      </form>
    </div>
  );
}

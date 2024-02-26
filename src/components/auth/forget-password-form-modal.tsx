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

type ForgetPasswordType = {
  phone: any;
};

export default function ForgetPasswordFormModal({ lang }: { lang: string }) {
  const { t } = useTranslation(lang);
  const { closeModal } = useModalAction();
  const [loader, setLoader] = useState(false);
  const { authorize } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>();

  async function onSubmit({ phone }: ForgetPasswordType) {
    try {
      setLoader(false);
      const response = await fetch(
        'http://192.168.1.20/api/v1/auth/forget-password/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: phone }),
        },
      );
      const data = await response.json();
      if (data?.tokens?.access) {
        Cookies.remove('phone',phone); // Yangi raqam o'rnatamiz
        Cookies.set('auth_token', data.tokens.access); // Yangi tokenni o'rnatamiz
        Cookies.set('phone',phone); // Yangi raqam o'rnatamiz
        authorize();
        window.location.href = '/en/forget-password'; // Boshqa sahifaga yo'naltiramiz
        setLoader(true);
      }
    } catch (error) {
      console.log(error, 'forget password error response');
    }
  }

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          Parolingizni tiklash uchun sizga kod yuboramiz
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={t('Telefon raqam') as string}
          type="phone"
          variant="solid"
          {...register('phone', {
            required: `${t('forms:phone-required')}`,
            pattern: {
              value: /^(\+\d{1,3}\s?)?\d{9,}$/,
              message: t('Invalid phone number'),
            },
          })}
          error={errors.phone?.message}
          lang={lang}
        />
        <Button
          loading={loader}
          disabled={loader}
          type="submit"
          variant="formButton"
          className="w-full h-11 md:h-12 mt-3"
        >
          Yuborish
        </Button>
      </form>
    </div>
  );
}

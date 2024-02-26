'use client';

import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import { useState } from 'react';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@framework/utils/get-token';
import Cookies from 'js-cookie';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

interface ChangePasswordInputType {
  newPassword: string;
}

const ChangePasswordReset: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const [loader, setLoader] = useState<boolean>(false);
  const { authorize } = useUI();
  const token = getToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>();

  async function onSubmit({ newPassword }: ChangePasswordInputType) {
    try {
      setLoader(false);
      await fetch(baseURL + API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password1: newPassword,
          password2: newPassword,
        }),
      });
      window.location.href = '/en/signin'; // Boshqa sahifaga yo'naltiramiz
      setLoader(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto w-[600px] p-12 my-12 bg-white ">
      <Heading className="mt-5" variant="titleLarge">
        {t("Parolni o'zgartirish")}
      </Heading>
      <div className="flex flex-col w-full mt-6 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full"
        >
          <div className="w-full">
            <PasswordInput
              label={t('Parol 1')}
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: `${t('forms:password-old-required')}`,
              })}
              lang={lang}
              className="mb-5"
            />
            <PasswordInput
              label={t('Parol 2')}
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: `${t('forms:password-new-required')}`,
              })}
              lang={lang}
            />

            <div className="relative mt-3">
              <Button
                type="submit"
                loading={loader}
                disabled={loader}
                variant="formButton"
                className="w-full sm:w-auto"
              >
                {t('common:text-change-password')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordReset;

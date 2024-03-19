'use client';

import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import { useState } from 'react';
import { getToken } from '@framework/utils/get-token';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ChangePasswordInputType {
  newPassword: string;
}

const ChangePasswordReset: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang,'login');
  const [loader, setLoader] = useState<boolean>(false);
  const token = getToken();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>();

  async function onSubmit({ newPassword }: ChangePasswordInputType) {
    try {
      setLoader(false);
      const response = await fetch(baseURL + API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept-Language':lang,
        },
        body: JSON.stringify({
          password1: newPassword,
          password2: newPassword,
        }),
      });
      setLoader(true);
      if (response.ok) {
        toast.success(t('Успешный пароль изменен!'), {
          style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push(`${lang}/signin`); // Boshqa sahifaga yo'naltiramiz
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto w-[600px] p-12 my-12 bg-white ">
      <Heading className="mt-5" variant="titleLarge">
        {t("Изменить пароль")}
      </Heading>
      <div className="flex flex-col w-full mt-6 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full"
        >
          <div className="w-full">
            <PasswordInput
              label={t('Старый пароль')}
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: `${t('Вам необходимо будет предоставить свой старый пароль')}`,
              })}
              lang={lang}
              className="mb-5"
            />
            <PasswordInput
              label={t('Новый пароль')}
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: `${t('Вам необходимо будет предоставить новый пароль')}`,
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
                {t('Изменить пароль')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordReset;

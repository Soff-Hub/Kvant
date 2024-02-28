'use client';

import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@framework/utils/get-token';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { toast } from 'react-toastify';

type ForgetPasswordType = {
  codeValues: string;
};

export default function ForgetPasswordForm({ lang }: { lang: string }) {
  const { t } = useTranslation(lang);
  const { closeModal } = useModalAction();
  const [countdown, setCountdown] = useState<number>(20);
  const [loader, setLoader] = useState<boolean>(false);
  const [firstSendCode, setFirstSendCode] = useState<boolean>(true);
  const { authorize } = useUI();
  const token = getToken();

  const phoneCookie = Cookies.get('phone');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>();

  async function onSubmit({ codeValues }: ForgetPasswordType) {
    if (phoneCookie) {
      if (firstSendCode && countdown !== 0) {
        try {
          setLoader(false);
          const response = await fetch(baseURL + API_ENDPOINTS.CHECK_CODE, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ code: codeValues }),
          });
          const data = await response.json();
          if (data) {
            window.location.href = '/en/change-password'; // Boshqa sahifaga yo'naltiramiz
            setLoader(true);
          }
        } catch (error) {
          console.log(error, 'forget password error response');
        }
      } else {
        try {
          const response = await fetch(
            baseURL + API_ENDPOINTS.FORGET_PASSWORD,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ phone: phoneCookie }),
            },
          );
          const data = await response.json();
          if (data?.tokens?.access) {
            Cookies.set('auth_token', data.tokens.access); // Yangi tokenni o'rnatamiz
            authorize();
            setFirstSendCode(true);
            setCountdown(20);
            toast.success('Muvaffaqiyatli!', {
              style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
              progressClassName: 'fancy-progress-bar',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
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
        } catch (error) {
          console.log(error, 'forget password error response');
        }
      }
    } else {
      if (firstSendCode) {
        try {
          setLoader(false);
          const response = await fetch(baseURL + API_ENDPOINTS.VERIFY, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ code: codeValues }),
          });
          const data = await response.json();
          if (data?.tokens?.access) {
            Cookies.set('auth_token', data.tokens.access); // Yangi tokenni o'rnatamiz
            authorize();
            window.location.href = '/en'; // Boshqa sahifaga yo'naltiramiz
            setLoader(true);
            toast.success('Muvaffaqiyatli kirdingiz!', {
              style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
              progressClassName: 'fancy-progress-bar',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } catch (error) {
          console.log(error, 'forget password error response');
        }
      } else {
        try {
          const response = await fetch(baseURL + API_ENDPOINTS.GET_CODE, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setFirstSendCode(true);
          setCountdown(20);
          const data = await response?.json();
          console.log(data);

          // toast.error(data?.code[0] + '', {
          //   style: { color: 'white', background: 'red' }, // Xabar rangi va orqa fon rangi
          //   progressClassName: 'fancy-progress-bar',
          //   autoClose: 1500,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // });
        } catch (error: any) {
          console.log(error, 'forget password error response');
        }
      }
    }
  }


  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    if (countdown <= 0) {
      setFirstSendCode(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          {t('common:forgot-password-helper')}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={t('Kodni kiriting') as string}
          type="number" // Change the type to "number"
          variant="solid"
          className="mb-1"
          {...register('codeValues', {
            // required: `${t('number required')}`,
            pattern: {
              value: /^\d+$/, // Regular expression to match numbers only
              message: t('error kode'), // Error message for invalid number format
            },
          })}
          error={errors.codeValues?.message} // Display error message if validation fails
          lang={lang}
        />
        <div className="mb-3 text-red-600 ">
          {`${Math.floor(countdown / 60)
            .toString()
            .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}
        </div>
        <Button
          loading={loader}
          disabled={loader}
          type="submit"
          variant="formButton"
          className="w-full mt-0 h-11 md:h-12"
        >
          {firstSendCode ? 'Yuborish' : 'Qayta kod yuborish'}
        </Button>
      </form>
    </div>
  );
}

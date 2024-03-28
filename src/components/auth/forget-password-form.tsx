'use client';

import Button from '@components/ui/button';
import { useTranslation } from 'src/app/i18n/client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@framework/utils/get-token';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';

export default function ForgetPasswordForm({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'login');
  const [countdown, setCountdown] = useState<number>(120);
  const [loader, setLoader] = useState<boolean>(false);
  const [firstSendCode, setFirstSendCode] = useState<boolean>(true);
  const { authorize } = useUI();
  const token = getToken();
  const [codeValues, setCodeValues] = useState<any>(null);

  const pathname = window.location.search;

  const phoneCookie = Cookies.get('phone');

  const router = useRouter();

  async function onSubmit(e: any) {
    e.preventDefault();
    if (phoneCookie) {
      try {
        setLoader(true);
        const response = await fetch(baseURL + API_ENDPOINTS.CHECK_CODE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Accept-Language': lang,
          },
          body: JSON.stringify({ code: codeValues }),
        });
        if (response.ok) {
          toast(t('Отправлено успешно!'), {
            style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          router.push(`/${lang}/change-password`); // Boshqa sahifaga yo'naltiramiz
        } else {
          // Xato keldiğida xatoni chiqaramiz
          const error = await response.json();
          toast(error?.msg[0] + '', {
            style: { color: 'white', background: 'red' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          throw new Error(error?.msg[0] || 'Forget password error response');
        }
      } catch (error: any) {
        console.log(error);
      }
      setCodeValues(null);
      setLoader(false);
    } else {
      try {
        setLoader(true);
        const response = await fetch(baseURL + API_ENDPOINTS.VERIFY, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Accept-Language': lang,
          },
          body: JSON.stringify({ code: codeValues }),
        });
        const data = await response.json();
        if (response.ok) {
          Cookies.set('auth_token', data.tokens.access); // Yangi tokenni o'rnatamiz
          authorize();
          toast(t('Вы успешно вошли в систему!'), {
            style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          if (pathname) {
            router.push(`/${lang}/${ROUTES.CHECKOUT}`);
          } else {
            router.push(`/${lang}`);
          }
        } else {
          const error = await response.json();
          // Xato keldiğida xatoni chiqaramiz
          toast(error?.msg[0] + '', {
            style: { color: 'white', background: 'red' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          throw new Error(error?.msg[0] || 'Forget password error response');
        }
      } catch (error: any) {
        console.log(error);
      }
      setCodeValues(null);
      setLoader(false);
    }
  }

  async function onSubmit2(e: any = null) {
    if (e) {
      e.preventDefault();
    }
    if (phoneCookie) {
      try {
        setLoader(true);
        const response = await fetch(baseURL + API_ENDPOINTS.FORGET_PASSWORD, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Accept-Language': lang,
          },
          body: JSON.stringify({ phone: phoneCookie }),
        });
        const data = await response.json();
        if (response.ok) {
          Cookies.set('auth_token', data.tokens.access); // Yangi tokenni o'rnatamiz
          authorize();
          setFirstSendCode(true);
          setCountdown(120);
          toast(t('Успешный!'), {
            style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          const error = await response.json();
          // Xato keldiğida xatoni chiqaramiz
          toast(error + '', {
            style: { color: 'white', background: 'red' }, // Xabar rangi va orqa fon rangi
            progressClassName: 'fancy-progress-bar',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          throw new Error(error?.msg[0] || 'Forget password error response');
        }
      } catch (error) {
        console.log(error, 'forget password error response');
      }
      setLoader(false);
      setFirstSendCode(false);
    } else {
      try {
        setLoader(true);
        await fetch(baseURL + API_ENDPOINTS.GET_CODE, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Accept-Language': lang,
          },
        });
        setFirstSendCode(true);
        setCountdown(120);
      } catch (error: any) {
        console.log(error, 'forget password error response');
      }
      setLoader(false);
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
      <div className="text-center mb-9 pt-2.5">
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          {t('Мы вышлем вам ссылку для сброса пароля')}
        </p>
      </div>
      <form className="flex flex-col justify-center" noValidate>
        <input
          type="text"
          defaultValue={codeValues}
          className="mb-1 py-3 px-4 w-full appearance-none  border text-input text-16px lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-brand-dark focus:ring-0"
          lang={lang}
          onChange={(e) => (
            setCodeValues(e.target.value), setFirstSendCode(false)
          )}
          maxLength={4}
        />
        <div className="mb-3 text-red-600 ">
          {`${Math.floor(countdown / 60)
            .toString()
            .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}
        </div>
        {firstSendCode || codeValues !== null ? (
          <Button
            disabled={firstSendCode}
            loading={loader}
            onClick={onSubmit}
            variant="formButton"
            className="w-full mt-0 h-11 md:h-12"
          >
            {t('Отправка')}
          </Button>
        ) : (
          <Button
            disabled={firstSendCode}
            loading={loader}
            onClick={onSubmit2}
            variant="formButton"
            className="w-full mt-0 h-11 md:h-12"
          >
            {t('Получить перекодирование')}
          </Button>
        )}
      </form>
    </div>
  );
}

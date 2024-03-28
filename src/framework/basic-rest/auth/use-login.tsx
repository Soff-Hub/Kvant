import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { baseURL } from '@framework/utils/http';
import { ROUTES } from '@utils/routes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'src/app/i18n/client';

export interface LoginInputType {
  phone: string;
  password: string;
  lang: string;
}

async function login(input: LoginInputType) {
  // Fetch API yordamida serverga POST so'rov yuboriladi
  const response = await fetch(baseURL + API_ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': input.lang,
    },
    body: JSON.stringify(input),
  });

  if (response.ok) {
    return await response.json();
  } else {
    // Agar serverdan xato javob qaytsa, bu xatolikni ko'rsatish
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

    throw new Error(error?.msg[0] || 'Login failed');
  }
}

export const useLoginMutation = (lang: any) => {
  const { authorize } = useUI();
  const { t } = useTranslation(lang, 'login');
  const router = useRouter();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: async (data) => {
      if (data?.tokens?.access) {
        Cookies.set('auth_token', data.tokens.access);
        await authorize();
        toast(t('Вы успешно вошли в систему!'), {
          style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
          router.push(`/${lang}/${ROUTES.ORDERS}`);
      }
    },
    onError: (error: any) => {
      console.error(error, 'Login error response');
    },
  });
};

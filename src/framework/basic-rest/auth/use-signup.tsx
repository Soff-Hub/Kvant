import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { baseURL } from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'src/app/i18n/client';

export interface SignUpInputType {
  phone: string;
  password: string;
  first_name: string;
  lang: string;
}

async function signUp(input: SignUpInputType) {
  const response = await fetch(baseURL + API_ENDPOINTS.REGISTER, {
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
    const error = await response.json();
    throw new Error(error?.msg[0] || 'Sign up failed');
  }
}

export const useSignUpMutation = (lang:any) => {
  const { authorize } = useUI();
  const router = useRouter();
  const { t } = useTranslation(lang, 'login');
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      if (data?.tokens?.access) {
        Cookies.set('auth_token', data.tokens.access);
        Cookies.remove('phone');
        authorize();
        toast.success(t("Успешный!"), {
          style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push(`${lang}/forget-password`);
      }
    },
    onError: (error: any) => {
      toast.error(error + '', {
        style: { color: 'white', background: 'red' }, // Xabar rangi va orqa fon rangi
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error(error, 'Sign up error response');
    },
  });
};

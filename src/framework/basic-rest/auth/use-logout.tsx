import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'src/app/i18n/client';

export interface LoginInputType {
  email: string;
  password: string;
}

async function logout() {
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}
export const useLogoutMutation = (lang: string) => {
  const { unauthorize } = useUI();
  const router = useRouter();
  const { t } = useTranslation(lang, 'login');
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      Cookies.remove('auth_token');
      unauthorize();
      router.push(`/${lang}`);
      toast.warning(t('Вы успешно вышли!'), {
        style: { color: 'white', background: 'blueyellow' }, // Xabar rangi va orqa fon rangi
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (data) => {
      console.log(data, 'logout error response');
    },
  });
};

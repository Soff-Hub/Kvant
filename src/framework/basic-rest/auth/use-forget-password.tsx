import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface ForgetPasswordType {
  code: string;
}

async function loginForget(code: ForgetPasswordType) {
  const token = Cookies.get('auth_token'); // Tokenni olamiz
  const response = await fetch(
    'https://kvantuz.pythonanywhere.com/api/v1/auth/verify/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Tokenni sarlavha qismini qo'shib yuboramiz
      },
      body: JSON.stringify(code),
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error?.msg[0] || 'Sign up failed');
  }
}

export const useForgetPasswordMutation = () => {
  const { authorize } = useUI();

  return useMutation((code: ForgetPasswordType) => loginForget(code), {
    onSuccess: (data) => {
      if (data?.tokens?.access) {
        Cookies.remove('auth_token'); // Cookie ni o'chiramiz
        Cookies.set('auth_token', data.tokens.access); // Yangi tokenni o'rnatamiz
        authorize();
        window.location.href = '/en'; // Boshqa sahifaga yo'naltiramiz
      }
    },
    onError: (data) => {
      console.log(data, 'forget password error response');
    },
  });
};

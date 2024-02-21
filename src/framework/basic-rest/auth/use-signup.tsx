import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import Cookies from 'js-cookie';
import Router from 'next/router';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  phone: string;
  password: string;
  first_name: string;
  remember_me: boolean;
}

async function signUp(
  input: SignUpInputType,
  baseUrl = 'https://kvantuz.pythonanywhere.com',
  endPoint = '/api/v1/auth/register/',
) {
  const response = await fetch(`${baseUrl}${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const useSignUpMutation = (lang: string) => {
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      const { authorize } = useUI();
      if (data?.tokens?.access) {
        Cookies.set('auth_token', data.tokens.access);
        authorize();
        Router.push(`/${lang}${ROUTES.HOME}`);
      }
    },
    onError: (error: any) => {
      toast.error(error, { position: 'top-center' });
      console.error(error, 'Sign up error response');
    },
  });
};

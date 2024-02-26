import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  phone: string;
  password: string;
  first_name: string;
  remember_me: boolean;
}

async function signUp(input: SignUpInputType) {
  const response = await fetch(
    `https://kvantuz.pythonanywhere.com/api/v1/auth/register/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error?.msg[0] || 'Sign up failed');
  }
}

export const useSignUpMutation = () => {
  const { authorize } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      if (data?.tokens?.access) {
        Cookies.set('auth_token', data.tokens.access);
        authorize();
        window.location.href = '/en/my-account/orders';
      }
    },
    onError: (error: any) => {
      console.error(error, 'Sign up error response');
    },
  });
};

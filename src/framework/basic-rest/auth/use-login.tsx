import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface LoginInputType {
  phone: string;
  password: string;
  remember_me: boolean;
}

async function login(input: LoginInputType) {
  // Fetch API yordamida serverga POST so'rov yuboriladi
  const response = await fetch(
    `${'https://kvantuz.pythonanywhere.com/api/v1/auth/login/'}`,
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
    // Agar serverdan xato javob qaytsa, bu xatolikni ko'rsatish
    const error = await response.json();
    throw new Error(error?.msg[0] || 'Login failed');
  }
}

export const useLoginMutation = () => {
  const { authorize } = useUI();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: async (data) => {
      if (data?.tokens?.access) {
        Cookies.set('auth_token', data.tokens.access);
        await authorize();
        window.location.href = '/en/my-account/orders';
      } 
    },
    onError: (error: any) => {
      // Kirishda xato yuz berganda, konsolga xato chiqariladi
      console.error(error, 'Login error response');
    },
  });
};

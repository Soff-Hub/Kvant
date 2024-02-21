import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useMutation } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

export interface LoginInputType {
  phone: string;
  password: string;
  remember_me: boolean;
}

async function login(
  input: LoginInputType,
  baseUrl = 'https://kvantuz.pythonanywhere.com',
  endPoint = '/api/v1/auth/login/',
) {
  // Fetch API yordamida serverga POST so'rov yuboriladi
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
    // Agar serverdan xato javob qaytsa, bu xatolikni ko'rsatish
    const error = await response.json();
    throw new Error(error?.msg[0] || 'Login failed');
  }
}

export const useLoginMutation = (
  baseUrl?: string,
  endPoint?: string,
  lang?: string,
) => {
  const { authorize } = useUI();
  return useMutation(
    (input: LoginInputType) => login(input, baseUrl, endPoint),
    {
      onSuccess: (data) => {
        if (data?.tokens?.access) {
          Cookies.set('auth_token', data.tokens.access);
          authorize();
          Router.push(`/${lang}`);
        }
      },
      onError: (error: any) => {
        // Kirishda xato yuz berganda, konsolga xato chiqariladi
        console.error(error, 'Login error response');
      },
    },
  );
};

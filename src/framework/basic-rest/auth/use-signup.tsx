import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { baseURL } from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface SignUpInputType {
  phone: string;
  password: string;
  first_name: string;
}

async function signUp(input: SignUpInputType) {
  const response = await fetch(baseURL + API_ENDPOINTS.REGISTER, {
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
    throw new Error(error?.msg[0] ||  'Sign up failed');
  }
}

export const useSignUpMutation = () => {
  const { authorize } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      if (data?.tokens?.access) {
        Cookies.set('auth_token', data.tokens.access);
        Cookies.remove('phone');
        authorize();
        window.location.href = '/en/forget-password';
        toast.success('Muvaffaqiyatli!', {
          style: { color: 'white', background: 'green' }, // Xabar rangi va orqa fon rangi
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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

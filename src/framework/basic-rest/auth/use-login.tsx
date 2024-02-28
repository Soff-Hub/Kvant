import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { baseURL } from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface LoginInputType {
  phone: string;
  password: string;
}

async function login(input: LoginInputType) {
  // Fetch API yordamida serverga POST so'rov yuboriladi
  const response = await fetch(baseURL + API_ENDPOINTS.LOGIN, {
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

export const useLoginMutation = () => {
  const { authorize } = useUI();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: async (data) => {
      if (data?.tokens?.access) {
        Cookies.set('auth_token', data.tokens.access);
        await authorize();
        window.location.href = '/en/my-account/orders';
        toast.success('Muvaffaqiyatli kirdingiz!', {
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
      toast.error(error + "", {
        style: { color: 'white', background: 'red' }, // Xabar rangi va orqa fon rangi
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error(error, 'Login error response');
    },
  });
};

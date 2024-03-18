import Cookies from 'js-cookie';

export const getToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  return Cookies.get('auth_token');
};

export const getTokenLang = () => {
  if (typeof window === undefined) {
    return null;
  }
  return localStorage.getItem('i18nextLng');;
};


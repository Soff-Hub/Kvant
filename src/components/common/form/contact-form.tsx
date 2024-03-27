'use client';

import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';
import { toast } from 'react-toastify';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useEffect, useState } from 'react';

interface ContactFormValues {
  full_name: string;
  message: string;
  phone_or_email: string;
}

const ContactForm: React.FC<{ lang: string }> = ({ lang }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();
  const [isClient, setIsClient] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function onSubmit(values: ContactFormValues) {
    try {
      setLoader(true)
      const response = await fetch(baseURL + API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': lang,
        },
        body: JSON.stringify(values), // values ni o'zgartirdim
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(t('Успешный!'), {
          style: { color: 'white', background: 'green' },
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(data?.msg[0] + '', {
          style: { color: 'white', background: 'red' },
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error: any) {
      console.log(error, 'forget password error response');
    }
    setLoader(false)
  }

  const { t } = useTranslation(lang, 'login');
  const mounted = useIsMounted();

  return (
    isClient && (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Input
          variant="solid"
          label={`${t('Полное имя')}`}
          placeholder={`${t('Введите свое полное имя')}`}
          {...register('full_name')}
         
          lang={lang}
        />
        <Input
          type="email"
          variant="solid"
          label={`${t('Электронная почта')}*`}
          placeholder={`${t('Электронная почта')}`}
          {...register('phone_or_email', {
            required: `${t("Электронная почта введена")}`,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: `${t("Электронная почта введена неверно")}`,
            },
          })}
          error={errors.phone_or_email?.message}
          lang={lang}
        />
        <TextArea
          variant="solid"
          label={`${t('Сообщение')}`}
          {...register('message')}
          placeholder={`${t('Сообщение')}`}
          lang={lang}
        />
        <Button variant="formButton" loading={loader} disabled={loader} className="w-full" type="submit">
          {mounted && <>{t('Отправка')}</>}
        </Button>
      </form>
    )
  );
};

export default ContactForm;

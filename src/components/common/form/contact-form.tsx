'use client';

import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}


const ContactForm: React.FC<{ lang: string }> = ({ lang }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Contact');
  }

  const { t } = useTranslation(lang);
  const mounted = useIsMounted();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Input
        variant="solid"
        label="Полное имя (обязательно)"
        placeholder="Введите свое полное имя"
        {...register('name', { required: 'Вам необходимо указать свое полное имя' })}
        error={errors.name?.message}
        lang={lang}
      />
      <Input
        type="email"
        variant="solid"
        label="Адрес электронной почты (обязательно)"
        placeholder="Введите адрес электронной почты"
        {...register('email', {
          required: 'Вам необходимо указать свой адрес электронной почты',
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'forms:email-error',
          },
        })}
        error={errors.email?.message}
        lang={lang}
      />
      <Input
        variant="solid"
        type="text"
        label="Телефон (опционально)"
        placeholder="Введите свой телефон"
        {...register('phone')}
        lang={lang}
      />
      <TextArea
        variant="solid"
        label="Сообщение"
        {...register('message')}
        placeholder="Кратко опишите"
        lang={lang}
      />
      <Button variant="formButton" className="w-full" type="submit">
        {mounted && <>{t('Отправить сообщение')}</>}
      </Button>
    </form>
  );
};

export default ContactForm;

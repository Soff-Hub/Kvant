import React from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';

interface ContactFormValues {
  name: string;
  phone: string;
  number: number;
}

const ProductsModal = ({ lang }: { lang: string }) => {
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
    <div className="md:w-[300px]  xl:w-[600px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <div className="overflow-hidden">
        <div className="p-5">
          <h1 className="font-bold text-[21px] text-center mb-3">
            Заявка на продукт
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <Input
              variant="solid"
              label="Имя *"
              placeholder="Имя"
              {...register('name', { required: 'forms:name-required' })}
              error={errors.name?.message}
              lang={lang}
            />
            <Input
              label={t('Номер телефона *')}
              type="phone"
              variant="solid"
              {...register('phone', {
                required: `${t('Номер телефона введен неверно!')}`,
                pattern: {
                  value: /^\+998\s?\d{9}$/,
                  message: `${t('Номер телефона указан неверно')}`,
                },
              })}
              error={errors.phone?.message}
              lang={lang}
              defaultValue="+998"
              maxLength={13} // +998 kodi va 9 ta raqam uchun
            />
            <Input
              type="number"
              variant="solid"
              label="Сколько продуктов *"
              placeholder="Сколько продуктов"
              {...register('number', {
                required: 'forms:name-required',
                pattern: {
                  value: /^\+?[0-9\s]{10,14}$/,
                  message: 'faqat raqamlarni kiriting',
                },
              })}
              error={errors.name?.message}
              lang={lang}
            />
            <Button variant="formButton" className="w-full" type="submit">
              {mounted && <>{t('Отправка')}</>}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;

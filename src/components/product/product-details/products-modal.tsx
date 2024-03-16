import React from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { toast } from 'react-toastify';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

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
  const { closeModal } = useModalAction();
  const { data } = useModalState();

  async function onSubmit(values: ContactFormValues) {
    const dataForm = {id: data, ...values};
    console.log(dataForm);

    // try {
    //   const response = await fetch(baseURL + API_ENDPOINTS.FORGET_PASSWORD, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept-Language': lang,
    //     },
    //     body: JSON.stringify(dataForm), // values ni o'zgartirdim
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     toast.success(t('Успешный!'), {
    //       style: { color: 'white', background: 'green' },
    //       progressClassName: 'fancy-progress-bar',
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //     });
    //     closeModal();
    //   } else {
    //     toast.error(data?.msg[0] + '', {
    //       style: { color: 'white', background: 'red' },
    //       progressClassName: 'fancy-progress-bar',
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //     });
    //   }
    // } catch (error: any) {
    //   console.log(error, 'forget password error response');
    // }
  }

  const { t } = useTranslation(lang);
  const mounted = useIsMounted();
  return (
    <div className="md:w-[300px]  xl:w-[600px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <div className="overflow-hidden">
        <CloseButton onClick={closeModal} />
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
              {...register('name', { required: 'Имя не введено' })}
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
              type="phone"
              variant="solid"
              label="Сколько продуктов *"
              placeholder="Сколько продуктов"
              {...register('number', {
                required: 'Сколько продуктов не введено',
              })}
              error={errors.number?.message}
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

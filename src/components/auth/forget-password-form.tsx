'use client';

import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Link from 'next/link';
import { ROUTES } from '@utils/routes';

type FormValues = {
  number: string;
};

const defaultValues = {
  number: '',
};

 export default function ForgetPasswordForm ({ lang }: { lang: string }){
  const { t } = useTranslation(lang);
  const { closeModal } = useModalAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values, 'token');
  };

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          {t('common:forgot-password-helper')}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={t('forms:label-number') as string}
          type="tel" // Change the type to "number"
          variant="solid"
          className="mb-4"
          {...register('number', {
            required: `${t('forms:number-required')}`, // Change the error message for required field
            pattern: {
              value: /^\d+$/, // Regular expression to match numbers only
              message: t('forms:number-error'), // Error message for invalid number format
            },
          })}
          error={errors.number?.message} // Display error message if validation fails
          lang={lang}
        />

        <Button
          type="submit"
          variant="formButton"
          className="w-full mt-0 h-11 md:h-12"
        >
          {t('common:text-reset-password')}
        </Button>
      </form>
      <div className="relative flex flex-col items-center justify-center mt-8 mb-6 text-sm text-heading sm:mt-10 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-brand-light">
          {t('common:text-or')}
        </span>
      </div>
      <div className="text-sm text-center sm:text-15px text-brand-muted">
        {t('common:text-back-to')}{' '}
        <Link
          onClick={() => closeModal()}
          href={`/${lang}${ROUTES.LOGIN}`}
          className="text-sm text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
        >
          {t('common:text-login')}
        </Link>
      </div>
    </div>
  );
};

 

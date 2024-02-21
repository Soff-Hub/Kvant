'use client';

import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import Link from '@components/ui/link';
import Image from '@components/ui/image';
import Switch from '@components/ui/switch';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { useModalAction } from '@components/common/modal/modal.context';
import Router from 'next/router';

interface SignUpFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

export default function SignUpForm({ lang, className }: SignUpFormProps) {
  const { t } = useTranslation(lang);
  const { closeModal, openModal } = useModalAction();
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const [remember, setRemember] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function onSubmit({
    first_name,
    phone,
    password,
    remember_me,
  }: SignUpInputType) {
    signUp({
      first_name,
      phone,
      password,
      remember_me,
    });
    // openModal();
    // Router.push("/en")
    
  }

  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
        className,
      )}
    >
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/login.jpg"
            alt="sign up"
            width={718}
            height={600}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
              {t('common:text-already-registered')}
              <Link
                href={`/${lang}${ROUTES.LOGIN}`}
                className="text-sm ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
              >
                {t('common:text-sign-in-now')}
              </Link>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={t('forms:label-name') as string}
                type="text"
                variant="solid"
                {...register('first_name', {
                  required: 'forms:name-required',
                })}
                error={errors.first_name?.message}
                lang={lang}
              />
              <Input
                label={t('Phone number') as string}
                type="phone"
                variant="solid"
                {...register('phone', {
                  required: `${t('forms:phone-required')}`,
                  pattern: {
                    value: /^(\+\d{1,3}\s?)?\d{9,}$/,
                    message: t('Invalid phone number'),
                  },
                })}
                error={errors.phone?.message}
                lang={lang}
              />

              <PasswordInput
                label={t('forms:label-password')}
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
                lang={lang}
              />
              <div className="flex items-center justify-start">
                <div className="flex items-center  shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>

                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-register')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import { useTranslation } from 'src/app/i18n/client';
import Image from '@components/ui/image';
import cn from 'classnames';
import Link from 'next/link';
import { ROUTES } from '@utils/routes';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';

interface LoginFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  lang,
  className,
  isPopup = true,
}) => {
  // const { t } = useTranslation(lang);
  const { mutate: login, isLoading } = useLoginMutation();
  const { closeModal, openModal } = useModalAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ phone, password }: LoginInputType) {
    login({
      phone,
      password,
    });
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD_MODAL');
  }

  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className,
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/login.jpg"
            alt="signin"
            width={718}
            height={600}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              Sign into you account
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-15px text-body">
              Don’t have an account?
              <Link
                href={`/${lang}${ROUTES.SIGN_UP}`}
                className="text-sm text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
              >
                Create Account
              </Link>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label="Phone number"
                type="phone"
                variant="solid"
                {...register('phone', {
                  required: `Telefon raqami noto‘g‘ri kiritilgan!`,
                  pattern: {
                    value: /^(\+\d{1,3}\s?)?\d{9,}$/,
                    message: 'Telefon raqami noto‘g‘ri',
                  },
                })}
                error={errors.phone?.message}
                lang={lang}
              />
              <PasswordInput
                label="Password"
                error={errors.password?.message}
                {...register('password', {
                  required: `Parol kiriting!`,
                })}
                lang={lang}
              />
              <div className="flex items-center justify-center">
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm text-brand rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    Forgot password?
                  </button>
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
                  Kirish
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

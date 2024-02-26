import ForgetPasswordFormModal from '@components/auth/forget-password-form-modal';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default async function MyComponent({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <ForgetPasswordFormModal lang={lang} />
        </div>
      </div>
      <Divider />
    </>
  );
}

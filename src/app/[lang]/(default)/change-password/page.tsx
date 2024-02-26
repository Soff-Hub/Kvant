import ChangePasswordReset from '@components/my-account/change-password-reset';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change Password',
};

export default async function ChangePasswordPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <ChangePasswordReset lang={lang} />;
}

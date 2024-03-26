'use client';

import SignupForm from '@components/auth/sign-up-form';
import Divider from '@components/ui/divider';


export default function Page({
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
          <SignupForm
            isPopup={false}
            className="border rounded-lg border-border-base"
            lang={lang}
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

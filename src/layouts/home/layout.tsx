'use client';

import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';

import Footer from '@layouts/footer/footer';
import Header from '@layouts/default/header';




export default function ModernLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} />
      <main
        className="relative flex-grow pt-5 xl:pt-8 "
     
      >
        {children}
      </main>
      <Footer lang={lang} showWidgetServices={true} />
      <MobileNavigation lang={lang} />
    </div>
  );
}

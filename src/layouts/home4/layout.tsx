'use client';

import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import Footer from '@layouts/home4/footer';
import Header from '@layouts/default/header';



export default function ModernLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {

  return (
    <div className="flex flex-col min-h-screen fontManrope">
      <Header lang={lang} />
      <main
        className="relative flex-grow py-5 xl:py-8 "
     
      >
        {children}
      </main>
      <Footer  lang={lang} showWidgetServices={false} />
      <MobileNavigation lang={lang} />
    </div>
  );
}

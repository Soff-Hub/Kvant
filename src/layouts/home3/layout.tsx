'use client';

import Header from '@layouts/default/header';
import Footer from '@layouts/footer/footer';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
;


export default function MinimalLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {


  return (
    <div className="flex flex-col min-h-screen">
      {/* End of highlighted bar  */}

      <Header lang={lang} className={"sm:mb-0"}/>
      <main
          className="relative flex-grow pt-5 xl:pt-8 "
        
      >
        {children}
      </main>
      <Footer lang={lang} showWidgetServices={true}  variant={"home3"} />
      <MobileNavigation lang={lang} />
    </div>
  );
}

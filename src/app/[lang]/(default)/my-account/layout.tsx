'use client'
import Container from '@components/ui/container';
import AccountNav from '@components/my-account/account-nav';
import { ROUTES } from '@utils/routes';
import OrdersIcon from '@components/icons/account-order';
import WishlistIcon from '@components/icons/account-wishlist';
import AccountNavMobile from '@components/my-account/account-nav-mobile';
import { useEffect, useState } from 'react';
import { getToken } from '@framework/utils/get-token';

export default function AccountLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const accountMenu = [
    {
      slug: ROUTES.ORDERS,
      name: 'Заказы',
      icon: <OrdersIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
    },
    {
      slug: ROUTES.WISHLIST,
      name: 'Список желаний',
      icon: <WishlistIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
    },
  ];

  const accountMenuToken = [
    {
      slug: ROUTES.WISHLIST,
      name: 'Список желаний',
      icon: <WishlistIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
    },
  ];


  const [isClient, setIsClient] = useState<boolean>(false);
  const token = getToken();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="border-t border-b border-border-base">
      <Container>
        <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 mx-auto">
          <div className="flex flex-col w-full lg:flex-row">
            <div className="lg:hidden">
              <AccountNavMobile options={isClient && token ? accountMenu : accountMenuToken} lang={lang} />
            </div>
            <div className="hidden lg:block flex-shrink-0 w-72 me-7 xl:me-8">
              <AccountNav options={isClient && token ? accountMenu : accountMenuToken} lang={lang} />
            </div>

            <div className="w-full mt-4 p-4 lg:mt-0 border border-border-base rounded bg-white">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

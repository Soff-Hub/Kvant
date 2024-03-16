'use client'
import { useEffect, useState } from 'react';
import OrdersPageContent from './orders-page-content';
import { getToken } from '@framework/utils/get-token';
import ErrorInformation from '@components/404/error-information';

export default function OrdersTablePage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const token = getToken();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        token ? (
          <OrdersPageContent lang={lang} />
        ) : (
          <ErrorInformation />
        )
      ) : null}
    </>
  );
}

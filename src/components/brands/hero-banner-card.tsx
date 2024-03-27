'use client';

import Heading from '@components/ui/heading';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { baseURL } from '@framework/utils/http';
import { useEffect, useState } from 'react';
import { useTranslation } from 'src/app/i18n/client';

interface BannerProps {
  lang: string;
}

export default function HeroBrands({ lang }: BannerProps) {
  const [data, setData] = useState<any>([]);
  const [isClient, setIsClient] = useState(Boolean(false));
  const { t } = useTranslation(lang, 'home');

  async function handlePopupView() {
    try {
      const headers = new Headers();
      headers.append('Accept-Language', lang);
      const response = await fetch(`${baseURL + API_ENDPOINTS.BRANDS}`, {
        headers: headers,
      });
      const product = await response.json();
      setData(product?.results);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  useEffect(() => {
    handlePopupView();
    setIsClient(true);
  }, [lang]);

  return (
    isClient && (
      <div className="w-full ">
        <div className="sm:flex sm:justify-around sm:items-center p-6 gap-10 border border-border-two rounded">
          <div className="w-[300px]">
            <div className="flex items-center gap-5">
              <i className="fa-solid fa-rocket text-[40px] text-brand"></i>
              <h1 className="font-medium text-[18px]">
               {t('Бесплатная доставка по Ташкенту')}
              </h1>
            </div>
          </div>
          <div className="w-[300px] my-8 sm:my-0">
            <div className="flex items-center gap-5">
              <i className="fa-regular fa-credit-card text-[35px] text-brand"></i>
              <div>
                <h1 className="font-medium text-[18px]">{t('Безопасная оплата')}</h1>
                <p className="text-[14px]">{t("100% безопасный платеж")}</p>
              </div>
            </div>
          </div>
          <div className="w-[300px] ">
            <div className="flex items-center gap-5">
              <i className="fa-regular fa-comments text-[35px] text-brand"></i>
              <div>
                <h1 className="font-medium text-[18px]">{t("Бесплатные сервисы")}</h1>
                <p className="text-[14px]">{t("Поддержка 24/7")}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Heading variant="heading" className="my-4">
            {t("Бренды")}
          </Heading>
          <div className="grid grid-cols-12 gap-3 mb-12">
            {data &&
              data?.map((item: any) => (
                <div
                  key={item.id}
                  className="lg:col-span-2  sm:col-span-3 col-span-6"
                >
                  <img src={item?.image} alt={item?.name} />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

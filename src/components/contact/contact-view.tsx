'use client';
import React, { FC, useEffect, useState } from 'react';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  lang: string;
}

const ContactView: FC<Props> = ({ lang }) => {
  const { t } = useTranslation(lang, 'login');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className="px-5 mt-5 pt-5 xl:px-12 xl:pt-12  bg-skin-fill">
        <Heading variant="checkoutHeading" className="text-center">
          {t('Связаться с нами')}
        </Heading>
        <div className="grid grid-cols-12 mt-10 mb-10">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 items-center mb-10">
            <Heading variant="titleMedium" className="mb-3">
              {t('Свяжитесь напрямую')}
            </Heading>
            <a href="mailto:admin@kvant.com">admin@kvant.com</a>
            <a href="tel:+998555111111">+998 (55) 511-11-11</a>
          </div>
          <div className=" col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 items-center mb-10">
            <Heading variant="titleMedium" className="mb-3">
              {t('Главный офис')}
            </Heading>
            <p>{t('753P+JF2, Tashkent, Uzbekistan')}</p>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 items-center mb-10">
            <Heading variant="titleMedium" className="mb-3">
             {t('Работать с нами')}
            </Heading>
            <p>{t('Отправьте свое резюме на нашу электронную почту')}:</p>
            <a href="mailto:career@kvant.com">career@kvant.com</a>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 items-center mb-10">
            <Heading variant="titleMedium" className="mb-3">
              {t('Обслуживание клиентов')}
            </Heading>
            <a href="mailto:customer@kvant.com">customer@kvant.com</a>
            <a href="tel:+998555111111">+998 (55) 511-11-11</a>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 items-center mb-10">
            <Heading variant="titleMedium" className="mb-3">
            {t('Связи со СМИ')}
            </Heading>
            <a href="mailto:media@kvant.com">media@kvant.com</a>
            <a href="tel:+998555111111">+998 (55) 511-11-11</a>
          </div>
          <div className="col-span-12 sm:col-span-6  lg:col-span-4 flex flex-col gap-1 items-center">
            <Heading variant="titleMedium" className="mb-3">
              {t('Служба поддержки')}
            </Heading>
            <a href="mailto:support@kvant.com">support@kvant.com</a>
            <a href="tel:+998555111111">+998 (55) 511-11-11</a>
          </div>
        </div>

        <Heading variant="checkoutHeading" className="text-center">
          {t('Отправить нам сообщение')}
        </Heading>
      </div>
    )
  );
};

export default ContactView;

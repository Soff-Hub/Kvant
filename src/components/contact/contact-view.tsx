'use client';
import React, { FC, useEffect, useState } from 'react';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

interface Props {
  lang: string;
}

const ContactView: FC<Props> = ({ lang }) => {
  const { t } = useTranslation(lang, 'login');
  const [isClient, setIsClient] = useState(false);
  const [branches, setBarnches] = useState([]);

  async function getBranches() {
    try {
      const response = await fetch(baseURL + API_ENDPOINTS.BRANCHES, {
        headers: {
          'Accept-Language': lang, // Bu yerda so'ragan tilni o'zgartiring
        },
      });
      const branches = await response.json();
      setBarnches(branches);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    getBranches();
  }, [lang]);

  return (
    isClient && (
      <div className="px-5 mt-5 pt-5 mb-10 xl:px-12 xl:pt-12  bg-skin-fill">
        <Heading variant="checkoutHeading" className="text-center">
          {t('Связаться с нами')}
        </Heading>
        <div className="grid grid-cols-12 gap-5 mt-10 mb-10">
          {branches &&
            branches?.map((item: any) => (
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 items-center mb-10">
                <Heading variant="titleMedium" >
                  {item?.name}
                </Heading>
                <p>{item?.description}</p>
                <a href="tel:+998555111111">{item?.support_phone}</a>
                <iframe
                  src={item?.location}
                  className='w-full min-h-64'
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default ContactView;

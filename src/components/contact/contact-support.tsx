'use client';

import { FC, useEffect, useState } from 'react';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';
import LocationIcon from '@components/icons/contact/location-icon';
import PhoneIcon from '@components/icons/contact/phone-icon';
import MailIcon from '@components/icons/contact/mail-icon';

const data = [
  {
    id: 1,
    slug: '/',
    icon: <LocationIcon />,
    name: 'Адрес',
    description:
      'Acme Widgets 123 Widget Street Acmeville, AC 12345 United States of America',
  },
  {
    id: 2,
    slug: '/',
    icon: <PhoneIcon />,
    name: 'Номер телефона',
    description: '+998 (55) 511-11-11',
  },
  {
    id: 3,
    slug: '/',
    icon: <MailIcon />,
    name: 'Электронная почта',
    description: 'kvant@gmail.com',
  },
];

interface Props {
  lang: string;
  image?: HTMLImageElement;
}

const ContactSupport: FC<Props> = ({ lang }) => {
  const { t } = useTranslation(lang, 'home');
  const mounted = useIsMounted();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <>
        <Heading variant="titleLarge" className="mb-5">
          {t('Отправить нам сообщение')}
        </Heading>
        <div className="mb-0 3xl:ltr:pr-5 3xl:rtl:pl-5">
          <div className="mx-auto space-y-4 mb-6">
            {data.map((item: any) => (
              <div
                key={`contact--key${item.id}`}
                className="flex flex-col lg:flex-row max-w-xs lg:max-w-sm xl:pe-7"
              >
                <div className="flex-shrink-0 w-14  h-14 border-2 border-border-two p-3 rounded-md">
                  {item.icon}
                </div>
                <div className="lg:ps-3 2xl:ps-4 mt-4 lg:mt-0">
                  <Heading variant="base" className="">
                    {t(item.name)}
                  </Heading>
                  <Text>
                    <a href="tel:+998555111111">{t(item.description)}</a>
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <Text className="xl:leading-8">
            {mounted && (
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                mattis, orci ac elementum convallis, dolor enim volutpat sapien,
                id porttitor eros risus convallis nibh. Nullam dui diam, semper
                sed neque ut, fringilla rutrum velit. Nulla facilisi. Integer
                suscipit, dolor sed auctor interdum, libero neque fermentum
                arcu, in dapibus mauris nisl convallis ante. Orci varius natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus.
              </>
            )}
          </Text>
        </div>
      </>
    )
  );
};

export default ContactSupport;

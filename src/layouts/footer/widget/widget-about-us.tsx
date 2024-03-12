'use client';

import Link from 'next/link';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';
import Heading from '@components/ui/heading';

interface AboutProps {
  lang: string;
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}

const WidgetAbout: React.FC<AboutProps> = ({ lang, social, className }) => {
  const { t } = useTranslation(lang, 'home');

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="text-sm xl:max-w-[350px] mx-auto sm:ms-0 mb-2">
        <Heading variant="base" className="uppercase mb-4 lg:mb-5">
          {t(`О МАГАЗИНЕ`)}
        </Heading>
        <div className="mb-3">
          {t('Адрес')} : {t('Acme Widgets 123 Widget Street Акмевилл, AC 12345 Соединенные Штаты Америки')}
        </div>
        <div className="mb-3">
          {t('Телефон')} : {t('+998 93 102 30 42')}
        </div>
        <div className="mb-3">
          {t('Электронная почта')}: {t('ozodbek001@gmail.com')}
        </div>
      </div>

      {social && (
        <ul className="flex flex-wrap  space-x-4 md:space-s-5 mx-auto md:mx-0">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'} legacyBehavior>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                    style={{ width: 'auto' }}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;

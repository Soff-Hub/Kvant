'use client';
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

const WidgetAbout: React.FC<AboutProps> = ({ lang, className }) => {
  const { t } = useTranslation(lang, 'home');

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="text-sm xl:max-w-[350px] mx-auto sm:ms-0 mb-2">
        <Heading variant="base" className="uppercase mb-4 lg:mb-5">
          {t(`О МАГАЗИНЕ`)}
        </Heading>
        <div className="mb-3">
          <span className='font-bold'>{t('Адрес')}</span> : {t('Acme Widgets 123 Widget Street Акмевилл, AC 12345 Соединенные Штаты Америки')}
        </div>
        <div className="mb-3">
          <span className='font-bold'>{t('Телефон')}</span> : {t('+998 93 102 30 42')}
        </div>
        <div className="mb-3">
          <span className='font-bold'>{t('Электронная почта')}</span>: {t('ozodbek001@gmail.com')}
        </div>
      </div>

    </div>
  );
};

export default WidgetAbout;

'use client';

import { useTranslation } from 'src/app/i18n/client';

const AboutPages: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'home');

  return (
    <div className="bg-white w-full">
      <h1 className="text-center text-[30px] font-bold">Награды и признание</h1>
      <p className='w-2/3 mx-auto mt-10'>Мы уже 15 лет на рынке. Мы занимаемся торговлей генераторов, техники сельского хозяйства, а также промышленных электроинструментов, аккумуляторных, ручных и садовых инструментов, пневматических машин, водяных насосов, сварочного и строительного оборудования и аксессуаров. Мы являемся официальным ритейлером международных компаний таких как PERKINS, ANDELI, INGCO, CROWN, BOSCH. У нас очень большой ассортимент брендовых продуктов. Мы обслуживали и сейчас обслуживаем более 50 разных компаний и они нам доверяют свой комфорт. Доступность, качество и доверие - наш приоритет!</p>
    </div>
  );
};

export default AboutPages;

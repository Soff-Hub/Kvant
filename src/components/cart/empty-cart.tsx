import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import { IoCartOutline } from 'react-icons/io5';
function EmptyCart({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'home');
  return (
    <div className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7">
      <div className="flex mx-auto w-[220px] md:w-auto">
        <IoCartOutline className="text-[120px] text-gray-400" />
      </div>
      <Heading variant="titleMedium" className="mb-1.5 pt-8">
        {t('Ваша корзина пуста')}
      </Heading>
      <Text>{t('Пожалуйста, добавьте товар в корзину')}</Text>
    </div>
  );
}

export default EmptyCart;

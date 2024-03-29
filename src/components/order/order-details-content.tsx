import { addPeriodToThousands } from '@components/cart/cart-item';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';

export const OrderDetailsContent: React.FC<{ item?: any; lang: any }> = ({
  lang,
  item,
}) => {
  const { t } = useTranslation(lang, 'home');

  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-2">
        <Image
          src={item?.image}
          alt={item?.title || 'Product Image'}
          width={60}
          height={60}
          quality={100}
          className="object-cover"
          style={{ width: 'auto' }}
        />
      </div>
      <div className="self-center col-span-5 ml-3">
        <h2 className="text-brand-dark">{item.product}</h2>
      </div>
      <div className="self-center col-span-3 text-center md:ltr:text-left md:rtl:text-right">
        {typeof item.quantity === 'number' && (
          <p>
            {addPeriodToThousands(Number(item?.price))} x {item.quantity}{' '}
          </p>
        )}
      </div>
      <div className="self-center col-span-2">
        {typeof item.amount === 'number' && (
          <p>
            {addPeriodToThousands(item?.amount)} {t('сум')}
          </p>
        )}
      </div>
    </div>
  );
};

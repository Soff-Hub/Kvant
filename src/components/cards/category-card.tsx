import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'src/app/i18n/client';
import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';

interface Props {
  lang: string;
  item: any;
  href: LinkProps['href'];
  className?: string;
  variant: string;
}

const CategoryCard: React.FC<Props> = ({
  lang,
  item,
  href,
  className,
  variant,
}) => {
  const { t } = useTranslation(lang, 'home');
  const { title, image, productCount } = item ?? {};

  return (
    <Link href={href} className={cn('group block w-full', className)}>
      <div
        className={cn('flex flex-col  items-center text-[14px]', {
          'card-category--zoom gap-2': variant === 'default',
          'bg-white rounded p-2 lg:p-3': variant === 'card',
        })}
      >
        <div
          className={cn('card-category--thumb  ', {
            'rounded-full relative bg-gray-100 min-w-[100px] h-[100px] ':
              variant === 'default',
            'max-w-[90px] h-[95px] ': variant === 'card',
          })}
        >
          <Image
            src={`${image}` ?? categoryPlaceholder}
            alt={title || t('text-card-thumbnail')}
            width={100}
            height={100}
            quality={100}
          />
        </div>
        <div className="category-info text-center">
          <h3 className="font-semibold text-brand-dark w-[120px] truncate leading-6 group-hover:text-skin-primary">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';
import { useTranslation } from 'src/app/i18n/client';

type SearchProductProps = {
  lang: string;
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ lang, item }) => {
  const {
    slug,
    image,
    title,
    price,
    discount_price,
  } = item ?? {};

  const {t} =useTranslation(lang, 'home')
  

  return (
    <Link
      href={`/${lang}${ROUTES.PRODUCT}/${slug}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex w-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
        <Image
          src={image ?? searchProductPlaceholder}
          width={70}
          height={70}
          alt={title || 'Product Image'}
          className="object-cover bg-fill-thumbnail"
          style={{ width: 'auto' }}
        />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-skin-base text-15px  mb-1.5">{title}</h3>
        <div className="space-x-2">
          {discount_price !== Number(price) ? (
            <>
              <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                {discount_price} {t('сум')}
              </span>
              <del className="text-sm text-skin-base text-opacity-70">
                {Number(price)} {t('сум')}
              </del>
            </>
          ) : (
            <>
              <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                {Number(price)} {t('сум')}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;

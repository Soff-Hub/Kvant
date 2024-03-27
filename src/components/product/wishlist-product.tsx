import WishlistProductCard from '@components/product/wishlist-product-card';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useCartWishtlists } from '@contexts/wishtlist/wishst.context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';

interface ProductWishlistProps {
  className?: string;
  lang: string;
}

export const AccouttWishlist = ({ className, lang }: ProductWishlistProps) => {
  const { items } = useCartWishtlists();
  const [isClient, setIsClient] = useState<boolean>(false);


  const router = useRouter();

  function handleClick() {
    router.push(`/${lang}/${ROUTES.WISHLIST}`);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <button type="button" className="relative p-1" onClick={handleClick}>
      <div className="svg-container mt-1">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19.8C10.7181 19.8 10.4463 19.698 10.2345 19.5126C9.43467 18.8138 8.6635 18.1572 7.98312 17.5779L7.97964 17.5749C5.98487 15.8765 4.26231 14.4098 3.06378 12.9649C1.72401 11.3497 1.09998 9.81825 1.09998 8.14521C1.09998 6.51972 1.65785 5.0201 2.67072 3.9224C3.69567 2.81172 5.10206 2.20001 6.63126 2.20001C7.7742 2.20001 8.82091 2.56103 9.74223 3.27296C10.2072 3.63232 10.6287 4.07212 11 4.58513C11.3714 4.07212 11.7927 3.63232 12.2579 3.27296C13.1792 2.56103 14.2259 2.20001 15.3688 2.20001C16.8979 2.20001 18.3044 2.81172 19.3294 3.9224C20.3423 5.0201 20.9 6.51972 20.9 8.14521C20.9 9.81825 20.2761 11.3497 18.9363 12.9648C17.7378 14.4098 16.0154 15.8763 14.0209 17.5746C13.3393 18.1547 12.5669 18.8125 11.7653 19.5129C11.5536 19.698 11.2817 19.8 11 19.8V19.8ZM6.63126 3.35884C5.42987 3.35884 4.32621 3.83788 3.52331 4.70783C2.70848 5.59091 2.25968 6.81161 2.25968 8.14521C2.25968 9.55231 2.78311 10.8107 3.95671 12.2255C5.09103 13.5931 6.77825 15.0296 8.73178 16.693L8.7354 16.696C9.41836 17.2776 10.1925 17.9368 10.9983 18.6407C11.8089 17.9354 12.5843 17.2751 13.2686 16.6927C15.222 15.0293 16.9091 13.5931 18.0434 12.2255C19.2168 10.8107 19.7403 9.55231 19.7403 8.14521C19.7403 6.81161 19.2915 5.59091 18.4766 4.70783C17.6739 3.83788 16.5701 3.35884 15.3688 3.35884C14.4888 3.35884 13.6807 3.63835 12.9673 4.18954C12.3314 4.68096 11.8885 5.30218 11.6288 5.73686C11.4953 5.96038 11.2603 6.0938 11 6.0938C10.7397 6.0938 10.5046 5.96038 10.3711 5.73686C10.1116 5.30218 9.66867 4.68096 9.03269 4.18954C8.31923 3.63835 7.5112 3.35884 6.63126 3.35884V3.35884Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </svg>
      </div>
      <div className="absolute inline-flex items-center justify-center w-[22px] h-[22px] text-xs font-bold text-white bg-red-600 border-2 border-white rounded-full -top-[1px] right-[0.01px] ">
        {isClient && items?.length}
      </div>
    </button>
  );
};

export default function ProductWishlistGrid({
  className = '',
  lang,
}: ProductWishlistProps) {
  const { items } = useCartWishtlists();
  const [isClient, setIsClient] = useState<boolean>(false);
  const {t} =useTranslation('home')

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <div className={cn(className)}>
      <div className="flex flex-col">
        {isClient &&
          (items.length === 0 ? (
            <Alert message={`${t("Нет Избранное")} `}/>
          ) : (
            items.map((product: any) => (
              <WishlistProductCard
                key={`product--key${product.id}`}
                product={product}
                lang={lang}
              />
            ))
          ))}
      </div>
    </div>
  );
}

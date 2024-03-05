import { useState, type FC, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import ProductCardList from '@components/product/product-cards/product-list-view';
import { Product } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import { baseURL } from '@framework/utils/http';
import axios from 'axios';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import useQueryParam from '@utils/use-query-params';

interface ProductGridProps {
  lang: string;
  className?: string;
  viewAs: boolean;
}

export const ProductGrid: FC<ProductGridProps> = ({
  className = '',
  lang,
  viewAs,
}) => {
  const { t } = useTranslation(lang, 'common');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const pathname = usePathname();
  const { query } = useQueryParam(pathname ?? '/');

  const newPath = pathname.split('/').pop();
  const newquery = query.split('?').pop();
  const query_get = newPath + '&' + newquery;

  async function getAllProducts() {
    try {
      setIsloading(true);
      const response = await axios.get(
        baseURL + API_ENDPOINTS.FASHION_PRODUCTS + '?' + query_get,
      );
      setData(response.data?.results);
      setIsloading(false);
    } catch (error: any) {
      setError(error);
      console.error('Error fetching data:', error);
    }
  }



  useEffect(() => {
    getAllProducts();
  }, [query_get]);

  return (
    <>
      <div
        className={`${
          viewAs
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5'
            : 'grid grid-cols-1 gap-1.5'
        } ${className}`}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error} />
          </div>
        ) : isLoading ? (
          Array.from({ length: 15 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : viewAs ? (
          data?.map((product: Product) => (
            <ProductCardAlpine
              key={`product--key-${product.id}`}
              product={product}
              lang={lang}
              variant=""
            />
          ))
        ) : (
          data?.map((product: Product) => (
            <ProductCardList
              key={`product--key-${product.id}`}
              product={product}
              lang={lang}
            />
          ))
        )}
      </div>
      <div className="mt-1.5 py-5 text-center bg-white rounded">
        <Button
          loading={isLoading}
          disabled={isLoading}
          // onClick={() => fetchNextPage()}
          className={'w-60 '}
          variant={'primary'}
        >
          {t('button-load-more')}
        </Button>
      </div>
    </>
  );
};

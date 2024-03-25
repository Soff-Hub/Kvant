'use client';

import type { FC } from 'react';
import { usePopularProductsQuery } from '@framework/product/get-section-second';
import ProductsCarousel from '@components/product/products-carousel';
import { LIMITS } from '@framework/utils/limits';
import { useTranslation } from 'src/app/i18n/client';

interface ProductFeedProps {
  lang: string;
  className?: string;
  variant?: string;
}

const PopularProductFeed: FC<ProductFeedProps> = ({
  lang,
  className,
  variant,
}) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: limit,
  });
  return (
    <ProductsCarousel
      sectionHeading='ПОПУЛЯРНЫЕ ПРОДУКТ'
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={limit}
      uniqueKey="popular-product"
      variant={variant}
      lang={lang}
    />
  );
};

export default PopularProductFeed;

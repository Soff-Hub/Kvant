'use client';
import Container from '@components/ui/container';
import HeroSliderBlock from '@components/hero/hero-slider-block';

import BannerGrid from '@components/common/banner-grid';
import CategoryDropdownMenu from '@components/category/category-dropdown-menu';
import CategoryGridBlock from '@components/common/category-grid-block';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import ListingtabsFeatured from '@components/product/feeds/listingtabs-featured';
import BestSellerWithFlashSale from '@components/product/feeds/best-seller-with-flash-sale';
import { useBannerQueryImages } from '@framework/banner/get-banner-lists';

export default function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { isLoading, error, data } = useBannerQueryImages({});

  return (
    <>
      <div className={'bg-skin-body py-7'}>
        <Container>
          <div
            className={
              'grid gap-4 grid-cols-1 xl:gap-5 xl:grid-cols-[270px_1fr]'
            }
          >
            <div
              className={'hidden xl:block bg-white rounded relative h-auto '}
            >
              <CategoryDropdownMenu lang={lang} categoriesLimit={10} />
            </div>

            <div
              className={'grid gap-2.5 grid-cols-1 xl:grid-cols-[1fr_300px]'}
            >
              <div className={'grid gap-2.5 grid-cols-1'}>
                <HeroSliderBlock
                  isloading={isLoading}
                  lang={lang}
                  heroBanner={data}
                  showHeroContent={true}
                  variant={'antique'}
                  className={`mb-0`}
                  contentClassName="p-5 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[320px]  xl:min-h-[320px] "
                />
                <CategoryGridBlock
                  lang={lang}
                  className="mb-0"
                  variant={'card'}
                  limit={5}
                />
              </div>

              <BannerGrid
                lang={lang}
                grid={1}
                girdClassName={'gap-2.5'}
                className="2xl:gap-[10px] staticBanner--slider"
              />
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <ListingtabsFeatured lang={lang} />
        <BestSellerWithFlashSale lang={lang} />
        <PopularProductFeed
          lang={lang}
          className="mb-8 lg:mb-15"
          variant={'outBorder'}
        />
      </Container>
    </>
  );
}

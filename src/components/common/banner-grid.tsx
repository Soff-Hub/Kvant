'use client';

import BannerCard from '@components/cards/banner-card';
import Alert from '@components/ui/alert';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { useBannerQueryImages } from '@framework/banner/get-banner-lists-rigth';
import ContentLoader from 'react-content-loader';

interface BannerProps {
  grid?: number;
  className?: string;
  girdClassName?: string;
  lang: string;
}

const BannerGrid: React.FC<BannerProps> = ({
  grid = 3,
  girdClassName,
  className = 'mb-3 xl:mb-6',
  lang,
}) => {
  const { isLoading, error, data } = useBannerQueryImages({});

  return (
    <div className={className}>
      <div
        className={`grid grid-cols-1 sm:grid-cols-${grid} gap-2 ${
          girdClassName ? girdClassName : 'md:gap-5 '
        }`}
      >
        {error ? (
          <div className="2xl:ltr:pr-10 2xl:rtl:pl-10">
            <Alert message={error?.message} />
          </div>
        ) : !isLoading ? (
          Array.isArray(data) &&
          data.map((banner: any) => (
            <BannerCard
              key={`banner--key${banner.id}`}
              banner={banner}
              effectActive={false}
              className="w-full overflow-hidden rounded"
              lang={lang}
            />
          ))
        ) : (
          Array(3)
            .fill(0)
            .map((_, idx) => (
              <SwiperSlide key={`category--key-${idx}`}>
                <ContentLoader
                  key={idx}
                  width={300}
                  height={158}
                  viewBox="0 0 300 158"
                  backgroundColor="#FEFEFE"
                  foregroundColor="#E7ECF3"
                  className="w-full shadow-card rounded-md overflow-hidden"
                >
                  <rect x="0" y="0" rx="0" ry="0" width="300" height="158" />
                </ContentLoader>
              </SwiperSlide>
            ))
        )}
      </div>
    </div>
  );
};

export default BannerGrid;

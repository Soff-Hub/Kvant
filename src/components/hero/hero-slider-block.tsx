'use client';

import HeroBannerCard from '@components/hero/hero-banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import ContentLoader from 'react-content-loader';

interface Props {
  lang: string;
  heroBanner?: any;
  className?: string;
  variant?: string;
  contentClassName?: string;
  showHeroContent?: boolean;
  isloading?: boolean;
}

const HeroSliderBlock: React.FC<Props> = ({
  lang,
  heroBanner,
  variant = 'slider',
  className = 'mb-7',
  contentClassName = 'px-5 py-10 xl:py-24',
  showHeroContent = true,
  isloading,
}) => {
  return (
    <div className={`${className}`}>
      <Carousel
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={false}
        prevActivateId={`prevActivateId`}
        nextActivateId={`nextActivateId`}
        lang={lang}
      >
        {isloading ? (
          <ContentLoader
            width={732}
            height={320}
            viewBox="0 0 732 320"
            backgroundColor="#FEFEFE"
            foregroundColor="#E7ECF3"
            className="w-full shadow-card rounded-md overflow-hidden"
          >
            <rect x="0" y="0" rx="0" ry="0" width="732" height="450" />
          </ContentLoader>
        ) : (
          heroBanner?.map((banner: any) => (
            <SwiperSlide key={`banner--key${banner.id}`}>
              <HeroBannerCard
                banner={banner}
                variant={variant}
                className={contentClassName}
                heroContentCard={showHeroContent}
                lang={lang}
              />
            </SwiperSlide>
          ))
        )}
      </Carousel>
    </div>
  );
};

export default HeroSliderBlock;

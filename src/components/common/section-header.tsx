'use client';

import cn from 'classnames';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  lang?: any;
  sectionHeading:string;
  sectionSubHeading?: string;
  className?: string;
  headingPosition?: string;
}

const SectionHeader: React.FC<Props> = ({
  lang,
  sectionHeading ='СЕГОДНЯШНЕЕ ПРЕДЛОЖЕНИЕ',
  sectionSubHeading,
  className = 'mb-8',
  headingPosition = 'left',
}) => {
  const { t } = useTranslation(lang, 'home');
  return (
    <div
      className={cn(` ${className}`, {
        'text-[14px]': headingPosition === 'hotdeal',
        'text-center': headingPosition === 'center',
      })}
    >
      <Heading
        variant="mediumHeading"
        className={cn({
          'text-[16px] text-red-600': headingPosition === 'hotdeal',
          'sm:text-[24px] sm:mb-1.5 font-semibold':
            headingPosition === 'center',
        })}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: sectionHeading,
          }}
        ></div>
      </Heading>
      {sectionSubHeading && (
        <Text variant="medium" className="">
          {t(sectionSubHeading)}
        </Text>
      )}
    </div>
  );
};

export default SectionHeader;

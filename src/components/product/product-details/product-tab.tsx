import { Tab } from '@headlessui/react';
import parse from 'html-react-parser';
import { useTranslation } from 'src/app/i18n/client';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsTab({
  lang,
  dataProps,
}: {
  lang: string;
  dataProps: string;
}) {
  const { t } = useTranslation(lang, 'home');

  return (
    <div className="w-full p-5 bg-white rounded mb-8 lg:mb-12">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          <Tab
            className={({ selected }) =>
              classNames(
                'relative inline-block transition-all text-14px font-bold uppercase leading-5  focus:outline-none pb-4 hover:text-brand ltr:mr-8 rtl:ml-8',
                selected
                  ? 'text-brand-dark  after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:ltr:left-0 after:rtl:right-0 after:bg-brand'
                  : 'text-gray-400',
              )
            }
          >
            {t('Информация о продукте')}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              {dataProps && parse(dataProps)}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

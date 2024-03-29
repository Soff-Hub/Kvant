import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'src/app/i18n/client';
import { usePathname, useRouter } from 'next/navigation';
import useQueryParam from '@utils/use-query-params';

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const { site_header } = siteSettings;
  const { t } = useTranslation(lang, 'home');
  const router: any = useRouter();
  const pathname: any = usePathname();
  const pathnameSplit = pathname.split('/');
  const newPathname: string = pathnameSplit
    .slice(2, pathnameSplit.length)
    .join('/');

  const { query } = useQueryParam(pathname ?? '/');

  const options = [
    {
      id: 'RU',
      name: 'RU',
      value: 'ru',
      image: '/assets/ru.png',
    },
    {
      id: 'UZ',
      name: 'UZ',
      value: 'uz',
      image: '/assets/uz.png',
    },
    {
      id: 'en',
      name: 'ENG',
      value: 'en',
      image: '/assets/en.png',
    },
  ];

  const currentSelectedItem = lang
    ? options.find((o) => o.value === lang)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    setSelectedItem(values);
    const pushPathname: string = `/${values.value}/${newPathname}${query}`;
    router.push(pushPathname);
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }: any) => (
        <div className="relative z-10 lg:top-[3px]">
          <Listbox.Button className="relative w-full  rounded-lg cursor-pointer  ltr:pl-3 rtl:pr-3 ltr:pr-5 rtl:pl-5 ltr:text-left rtl:text-right focus:outline-none">
            <span className="flex items-center  truncate ">
              <span className="w-6 h-6 object-cover mr-2 ">
                <img src={selectedItem?.image} />
              </span>
              <span className="leading-5 pb-0.5 font-medium">
                {t(selectedItem?.name)}
              </span>
            </span>
            <span className="absolute inset-y-0 flex items-center pointer-events-none ltr:right-0 rtl:left-0">
              <FaChevronDown
                className="w-3 h-3.5 opacity-40"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute ltr:right-0 rtl:left-0  lg:ltr:left-0 lg:rtl:right-0 w-full py-1 mt-1 overflow-auto bg-brand-light rounded-md shadow-dropDown max-h-60 focus:outline-none text-sm min-w-[150px]"
            >
              {options?.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }: any) =>
                    `${
                      active
                        ? 'text-brand-dark bg-fill-dropdown-hover'
                        : 'text-brand-dark '
                    }
					cursor-pointer relative py-2 px-3`
                  }
                  value={option}
                >
                  {({ selected, active }: any) => (
                    <span className="flex items-center">
                      <span className="w-6 h-6">
                        <img src={option?.image} />
                      </span>
                      <span
                        className={`${
                          selected ? 'font-medium ' : 'font-normal'
                        } block truncate ltr:ml-1.5 rtl:mr-1.5 text-sm pb-0.5`}
                      >
                        {t(option?.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

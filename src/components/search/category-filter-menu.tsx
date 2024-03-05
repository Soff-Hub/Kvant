import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';
import { FaCheck } from 'react-icons/fa';
import useQueryParam from '@utils/use-query-params';

function CategoryFilterMenuItem({
  className = 'border-t border-border-base first:border-t-0  py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  depth = 0,
  lang,
}: any) {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getParams, updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formStatechild, setFormStateChild] = useState<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<any>({});

  const { slug, title, children: items, icon } = item;


  function onClick() {
    updateQueryparams('parent', slug);
  }

  function handleChange(currentItem: any) {
    updateQueryparams('child', currentItem?.slug);
  }

  // console.log(params);

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  useEffect(() => {
    const params = getParams();
    setQuery(params)
    if (query?.parent === slug) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query?.parent]);

  return (
    <>
      <li
        className={cn(
          'flex justify-between items-center transition text-sm ',
          { 'text-brand': isOpen },
          className,
        )}
      >
        <button
          className={cn(
            'text-brand-dark  hover:text-brand font-medium flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group gap-2',
          )}
          onClick={onClick}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={title || t('text-category-thumbnail')}
                width={40}
                height={40}
                style={{ width: 'auto' }}
              />
            </div>
          )}
          <span className="capitalize py-0.5">{title}</span>
          {expandIcon && (
            <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
          )}
        </button>
      </li>

      {isOpen && (
        <li>
          <ul key="content" className="text-xs pb-4">
            {items?.map((currentItem: any) => {
              return (
                <button
                  className={cn(
                    'text-brand-dark  hover:text-brand font-medium flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group gap-2',
                  )}
                  onClick={() => handleChange(currentItem)}
                >
                  <span
                    className={`w-[20px] h-[20px] text-[11px] flex items-center justify-center border-2 border-border-four rounded-full transition duration-500 ease-in-out group-hover:border-yellow-100 text-brand-light ${
                      formStatechild === currentItem?.id &&
                      'border-yellow-100 bg-yellow-100'
                    }`}
                  >
                    <FaCheck />
                  </span>
                  <span className="capitalize py-0.5">
                    {currentItem?.title}
                  </span>
                </button>
              );
            })}
          </ul>
        </li>
      )}
    </>
  );
}

function CategoryFilterMenu({ items, className, lang }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={`${item.slug}-key-${item.id}`}
          item={item}
          lang={lang}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;

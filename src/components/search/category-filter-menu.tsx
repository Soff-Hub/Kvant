import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';
import { FaCheck } from 'react-icons/fa';

function CategoryFilterMenuItem({
  className = 'border-t border-border-base first:border-t-0  py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  lang,
}: any) {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const { slug, title, children: items, icon } = item;

  function onClick() {
    router.push(`/${lang}/category__parent__slug=${slug}`);
  }

  function handleChange(currentItem: any) {
    router.push(
      `/${lang}/category__parent__slug=${slug}&category__slug=${currentItem?.slug}`,
    );
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  // Parametrlarni ajratish uchun yo'l nomini "&" ga bo'ling
  const params = pathname.split('&');

  // Ota-ona va bolalar qiymatlarini saqlash uchun o'zgaruvchilarni ishga tushiring
  let parent = '';
  let child = '';

  // "Ota" va "bola" ni topish uchun har bir parametrni takrorlang.
  params.forEach((param) => {
    if (param.includes('category__parent__slug=')) {
      // "Ota" parametrining qiymatini chiqarib oling
      parent = param.split('=')[1];
    } else if (param.includes('category__slug=')) {
      // "Child" parametrining qiymatini chiqarib oling
      child = param.split('=')[1];
    }
  });

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

      {parent === slug && (
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
                      child === currentItem?.slug &&
                      'border-yellow-100 bg-yellow-100'
                    }`}
                  >
                    {child === currentItem?.slug && <FaCheck />}
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

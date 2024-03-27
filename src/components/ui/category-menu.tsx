import cn from 'classnames';
import { useState } from 'react';

import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from 'react-icons/io';

import { useTranslation } from 'src/app/i18n/client';
import { useRouter } from 'next/navigation';

function SidebarMenuItem({ className, item, depth = 0, lang }: any) {
  const { title, icon, children: items, type, slug } = item;
  const router = useRouter();
console.log(icon);


  function handleClick(currentItem: any) {
    if (slug) {
      router.push(
        `/${lang}/category__parent__slug=${slug}&category__slug=${currentItem?.slug}`,
      );
    }
  }

  return (
    <>
      <li
        className={`flex justify-between items-center transition  ${
          type != 'mega' && 'relative'
        } ${
          className ? className : 'text-sm hover:text-brand px-3.5 2xl:px-4 '
        }`}
      >
        <button
          onClick={() => router.push(`/${lang}/category__parent__slug=${slug}`)}
          className={cn(
            'flex items-center w-full py-3 demo  text-start outline-none focus:outline-none focus:ring-0 focus:text-skin-base',
            {
              'text-brand-dark font-medium border-b border-border-base ':
                depth === 0,
            },
          )}
        >


          <span className="capitalize"><i className={icon + ' ' + "mx-2 text-[16px]"}></i> {title}</span>
        </button>

        {Array.isArray(items) ? (
          <>
            {type != 'mega' ? (
              <div
                className={`dropdownMenu absolute  top-0 z-50 invisible hidden ${items?.length > 10 ? 'w-[600px] max-h-[600px] overflow-y-scroll' : 'w-full'}  border opacity-0   md:block left-full bg-brand-light border-border-base subMenu--level${depth} shadow-navigation`}
              >
                <ul
                  key="content"
                  className={`text-xs px-1.5 py-3 ${items.length > 10 ? 'flex flex-wrap justify-between gap-x-2' : ''}`}
                >
                  {items?.map((currentItem) => {
                    return (
                      <li
                        className={`flex justify-between items-center transition ${items?.length > 10 ? 'min-w-[270px] ' : ''} ${
                          type != 'mega' && 'relative'
                        } ${
                          className
                            ? className
                            : 'text-sm hover:text-brand px-3.5 2xl:px-4 '
                        }`}
                      >
                        <button
                          onClick={() => handleClick(currentItem)}
                          className={cn(
                            'flex items-center w-full py-3 demo  text-start outline-none focus:outline-none focus:ring-0 focus:text-skin-base',
                            {
                              'text-brand-dark font-medium  border-border-base ':
                                depth === 0,
                            },
                          )}
                        >
                          <span className="capitalize">
                            {currentItem?.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : null}
      </li>
    </>
  );
}

function SidebarMenu({ items, className, categoriesLimit, lang }: any) {
  const [categoryMenuToggle, setcategoryMenuToggle] = useState(Boolean(false));
  const { t } = useTranslation(lang, 'home');

  function handleCategoryMenu() {
    setcategoryMenuToggle(!categoryMenuToggle);
  }

  return (
    <ul
      className={cn(
        'w-full bg-skin-fill rounded-b-md category-dropdown-menu ',
        className,
      )}
    >
      {items?.map((item: any, idx: number) =>
        idx <= categoriesLimit - 1 ? (
          <SidebarMenuItem
            key={`${item.slug}-key-${item.id}`}
            item={item}
            lang={lang}
          />
        ) : (
          categoryMenuToggle && (
            <SidebarMenuItem
              key={`${item.slug}-key-${item.id}`}
              item={item}
              lang={lang}
            />
          )
        ),
      )}

      {items.length >= categoriesLimit && (
        <li
          className={`px-4 relative transition text-sm hover:text-skin-primary`}
        >
          <div
            className={`flex items-center w-full py-3 text-start cursor-pointer font-medium text-brand-dark`}
            onClick={handleCategoryMenu}
          >
            <div className={`inline-flex flex-shrink-0 ltr:mr-2 rtl:ml-2`}>
              {categoryMenuToggle ? (
                <IoIosRemoveCircleOutline className="text-xl text-skin-base text-opacity-80" />
              ) : (
                <IoIosAddCircleOutline className="text-xl text-skin-base text-opacity-80" />
              )}
            </div>
            <span className="capitalize ">
              {t('Все категории')}
            </span>
          </div>
        </li>
      )}
    </ul>
  );
}

export default SidebarMenu;

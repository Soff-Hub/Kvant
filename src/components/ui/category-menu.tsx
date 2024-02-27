import cn from 'classnames';
import { useState } from 'react';
import Link from '@components/ui/link';
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from 'react-icons/io';

import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import SubMegaVertical from '@components/ui/mega/sub-mega-vertical';

function SidebarMenuItem({ className, item, depth = 0, lang }: any) {
  const { title, children: items, type } = item;

  return (
    <>
      <li
        className={`flex justify-between items-center transition  ${
          type != 'mega' && 'relative'
        } ${
          className ? className : 'text-sm hover:text-brand px-3.5 2xl:px-4 '
        }`}
      >
        <Link
          href={`/${lang}${ROUTES.SEARCH}`}
          className={cn(
            'flex items-center w-full py-3 demo  text-start outline-none focus:outline-none focus:ring-0 focus:text-skin-base',
            {
              'text-brand-dark font-medium border-b border-border-base ':
                depth === 0,
            },
          )}
        >
          <span className="capitalize">{title}</span>
        </Link>
        {Array.isArray(items) ? (
          <>
            {type != 'mega' ? (
              <div
                className={`dropdownMenu absolute top-0 z-10 invisible hidden w-full border opacity-0 md:block left-full bg-brand-light border-border-base subMenu--level${depth} shadow-navigation`}
              >
                <ul key="content" className="text-xs px-1.5 py-3">
                  {items?.map((currentItem) => {
                    const childDepth = depth + 1;
                    return (
                      <SidebarMenuItem
                        key={`${currentItem.title}${currentItem.slug}`}
                        item={currentItem}
                        depth={childDepth}
                        lang={lang}
                        className={cn(
                          'text-sm px-3 ltr:pl-4 rtl:pr-4 text-brand-muted hover:text-brand ',
                        )}
                      />
                    );
                  })}
                </ul>
              </div>
            ) : (
              <SubMegaVertical items={items} lang={lang} />
            )}
          </>
        ) : null}
      </li>
    </>
  );
}

function SidebarMenu({ items, className, lang }: any) {
  const [categoryMenuToggle, setcategoryMenuToggle] = useState(Boolean(true));
  const { t } = useTranslation(lang, 'common');

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
      {items?.map(
        (item: any) =>
          categoryMenuToggle && (
            <SidebarMenuItem
              key={`${item.slug}-key-${item.id}`}
              item={item}
              lang={lang}
            />
          ),
      )}

      {
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
            <span className="capitalize ">{t('text-all-categories')}</span>
          </div>
        </li>
      }
    </ul>
  );
}

export default SidebarMenu;

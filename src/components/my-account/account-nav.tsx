// File: AccountNav.tsx

'use client';

import { usePathname } from 'next/navigation';
import { useLogoutMutation } from '@framework/auth/use-logout';
import { useTranslation } from 'src/app/i18n/client';
import LogoutIcon from '@components/icons/account-logout';
import Link from '@components/ui/link';
import { useEffect, useState } from 'react';
import { getToken } from '@framework/utils/get-token';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({
  options,
  lang,
}: {
  options: Option[];
  lang: string;
}) {
  const { t } = useTranslation(lang, 'home');
  const { mutate: logout } = useLogoutMutation(lang);
  const pathname = usePathname();
  const newPathname = pathname.split('/').slice(3, 4);
  const mainPath = `/${newPathname[0]}`;
  const [isClient, setIsClient] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const token = getToken();

  async function getProfile() {
    if (token) {
      try {
        const response = await fetch(baseURL + API_ENDPOINTS.PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
            // You can add any additional headers here
            'Accept-Language': lang, // Assuming lang is defined elsewhere
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  }

  useEffect(() => {
    getProfile();
    setIsClient(true);
  }, [lang]);


  return (
    isClient && (
      <nav className="flex flex-col  overflow-hidden border rounded-md  border-border-base bg-white">
        <div className="flex items-center gap-2 bg-slate-200 cursor-pointer text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 hover:text-brand ">
          <span className="flex justify-center w-6 me-1 ">
            <i className="fa-regular fa-circle-user text-[30px] text-brand"></i>
          </span>
          <div className="flex flex-col  justify-center">
            <span className="font-bold text-[16px]">{profile?.first_name}</span>
            <span className="text-[12px]" style={{ lineHeight: '12px' }}>
              {profile?.phone}
            </span>
          </div>
        </div>

        {options.map((item) => {
          const menuPathname = item.slug.split('/').slice(2, 3);
          const menuPath = `/${menuPathname[0]}`;

          return (
            <Link
              key={item.slug}
              href={`/${lang}${item.slug}`}
              className={`flex items-center cursor-pointer text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 hover:text-brand ${
                mainPath === menuPath
                  ? 'bg-fill-secondary font-medium'
                  : 'font-normal'
              }`}
            >
              <span className="flex justify-center w-6 me-1 ">{item.icon}</span>
              <span className="ltr:pl-1 lg:rtl:pr-1.5">{t(item.name)}</span>
            </Link>
          );
        })}

        {token && (
          <button
            className="flex items-center text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer focus:outline-none"
            onClick={() => logout()}
          >
            <span className="flex justify-center w-6 me-1 ">
              <LogoutIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />
            </span>
            <span className="ltr:pl-1 lg:rtl:pr-1.5">{t('Выйти')}</span>
          </button>
        )}
      </nav>
    )
  );
}

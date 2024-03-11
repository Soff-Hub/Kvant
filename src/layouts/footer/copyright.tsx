import Image from '@components/ui/image';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'src/app/i18n/client';
import Container from '@components/ui/container';
interface CopyrightProps {
  lang: string;
  variant?: string;
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({
  lang,
  payment,
  variant = 'default',
}) => {
  const { t } = useTranslation(lang, 'home');
  
  return (
    <div className="border-t border-black/10  pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
      <Container>
        <div className="flex flex-col md:flex-row text-center md:justify-between">
          <p className="text-sm leading-7 lg:leading-[27px]">
            &copy;&nbsp;{t('Авторское право')} {year}&nbsp;
            <a
              className="transition-colors duration-200 ease-in-out text-brand "
              href={siteSettings.author.websiteUrl}
            >
              {siteSettings.author.name}
            </a>
            &nbsp; {t('Все права защищены')}
          </p>

          {payment && (
            <ul className="flex flex-wrap justify-center items-center space-x-4 -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
              {payment?.map((item) => (
                <li
                  className="mb-2 md:mb-0 transition hover:opacity-80 inline-flex"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : '/#'}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                      <Image
                          src={item.image}
                          alt={t(item.name)}
                          width={item.width}
                          height={item.height}
                      />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Copyright;

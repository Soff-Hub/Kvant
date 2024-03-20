import WidgetAbout from './widget-about-us';
import Container from '@components/ui/container';
import { footer } from '../data';
import Link from 'next/link';
import Image from '@components/ui/image';

interface WidgetsProps {
  lang: string;
  variant?: string;
  showWidgetServices?: boolean;
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ lang }) => {
  const { social } = footer;
  return (
    <Container>
      <div className="flex justify-between gap-6 flex-wrap my-5">
        <WidgetAbout
          social={social}
          className="min-w-[300px] max-w-[300px]"
          lang={lang}
        />
        <div className="max-w-[600px] flex flex-col justify-between ">
          <div>
            <div
              className="uppercase mb-3 mt-0 text-black font-bold"
            >
              Kvant.uz
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              fugit deserunt obcaecati libero laudantium expedita natus
            </p>
          </div>
          {social && (
            <ul className="flex flex-wrap  space-x-4 md:space-s-5 mx-auto mb-3 md:mx-0">
              {social?.map((item) => (
                <li
                  className="transition hover:opacity-80"
                  key={`social-list--key${item.id}`}
                >
                  <Link href={item.path ? item.path : '/#'} legacyBehavior>
                    <a target="_blank" rel="noreferrer">
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={25}
                        width={25}
                        className="transform scale-85 md:scale-100"
                        style={{ width: 'auto' }}
                      />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Widgets;

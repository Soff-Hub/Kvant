import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@components/ui/container';
import { footer } from '../data';

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

const Widgets: React.FC<WidgetsProps> = ({
  lang,
  widgets,
  variant = 'default',
}) => {
  const { social } = footer;
  return (
    <Container>

      <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px] pt-10 md:pt-16">
        <WidgetAbout
          social={social}
          className="col-span-full sm:col-span-1 md:col-span-4"
          lang={lang}
        />
        {widgets
          ?.slice(0, 4)
          ?.map((widget) => (
            <WidgetLink
              key={`footer-widget--key${widget.id}`}
              data={widget}
              className="col-span-1 md:col-span-2"
              lang={lang}
            />
          ))}
      </div>
    </Container>
  );
};

export default Widgets;

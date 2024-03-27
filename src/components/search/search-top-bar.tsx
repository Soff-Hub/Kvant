import ListBox from '@components/ui/filter-list-box';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  onNavClick: any;
  viewAs: boolean;
  lang: string;
}

const SearchTopBar: React.FC<Props> = ({ onNavClick, viewAs, lang }) => {
  const { t } = useTranslation(lang, 'home');
  return (
    <div className="sm:flex items-center justify-between mb-3 filters-panel bg-white rounded p-2">
      <div className="sm:flex gap-2 items-center justify-center  w-full sm:justify-between lg:justify-between">
        <div className="list-view">
          <div className="btn btn-gridview text-skin-base text-opacity-70">
            {t("Договариваться")}
          </div>
          <button
            type="button"
            id="grid-5"
            className={`btn btn-view grid ${(viewAs && 'active') || ''}`}
            onClick={() => onNavClick(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
          <button
            type="button"
            id="list-view"
            className={`btn btn-view list ${(!viewAs && 'active') || ''}`}
            onClick={() => onNavClick(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
        </div>
        <ListBox
          options={[
            { name: t('По последним дополнениям'), value: 'new' },
            { name: t('От дорогого к дешевому'), value: 'expensive' },
            { name: t('От дешевого к дорогому'), value: 'cheap' },
            { name: t('По скидке'), value: 'discount' },
            { name: t('По популярным'), value: 'order' },
          ]}
          lang={lang}
        />
      </div>
    </div>
  );
};
export default SearchTopBar;

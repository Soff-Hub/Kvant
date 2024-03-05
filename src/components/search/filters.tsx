import { CategoryFilter } from './category-filter';

export const ShopFilters: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="bg-white p-5 rounded">
      <CategoryFilter lang={lang} />
    </div>
  );
};

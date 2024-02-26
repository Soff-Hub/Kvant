import Wishlist from '@components/my-account/wishlist';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist',
};

export default async function WishlistPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-brand-dark  lg:pt-0">
       wishlist
      </h2>
      <Wishlist lang={lang} />
    </>
  );
}

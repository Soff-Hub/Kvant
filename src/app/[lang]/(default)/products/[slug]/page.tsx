import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';
import ElectronicProductFeed from '@components/product/feeds/electronic-product-feed';
import RelatedProductFeedOld from '@components/product/feeds/related-product-feed-old';
import Breadcrumb from '@components/ui/breadcrumb';

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <div className="pt-6 lg:pt-7 pb-10">
        <Container>
          <Breadcrumb lang={lang} />
          <ProductSingleDetails lang={lang} />
        </Container>
      </div>
    </>
  );
}

import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';

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
          <ProductSingleDetails lang={lang} />
        </Container>
      </div>
    </>
  );
}

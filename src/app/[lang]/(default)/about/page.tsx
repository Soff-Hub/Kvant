import Container from '@components/ui/container';
import { Metadata } from 'next';
import Breadcrumb from '@components/ui/breadcrumb';
import AboutPages from '@components/about/about';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <Container className={'my-5'}>
      <Breadcrumb lang={lang} />
      <div className="flex flex-wrap bg-skin-fill w-full  relative z-10 mt-5 p-5 xl:p-12 ">
       <AboutPages lang={lang}  />
      </div>
    </Container>
  );
}

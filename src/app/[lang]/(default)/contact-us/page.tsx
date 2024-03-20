import Container from '@components/ui/container';
import ContactForm from '@components/common/form/contact-form';
import ContactSupport from '@components/contact/contact-support';
import { Metadata } from 'next';
import Breadcrumb from '@components/ui/breadcrumb';
import MapContainer from '@components/ui/map';

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
    <>
      <Container className={'mt-5'}>
        <Breadcrumb lang={lang} />
        <div className="flex flex-wrap bg-skin-fill w-full  relative z-10 mt-5 p-5 xl:p-12 ">
          <div className="w-full md:w-[53%] xl:w-[60%] md:pe-8 lg:pe-0 2xl:pe-24 lg:mb-0 mb-8">
            <ContactSupport lang={lang} />
          </div>
          <div className="w-full md:w-[47%] xl:w-[40%] pb-0.5 lg:ps-12 pt-1.5">
            <ContactForm lang={lang} />
          </div>
        </div>
      </Container>
      <div className="mt-10 bg-fill-two relative h-[420px]">
        <MapContainer />
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47968.88462385112!2d69.11433577537537!3d41.285901149058965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8980da899b57%3A0xf96b53f14dac6e55!2sFarkhad%20Bazaar!5e0!3m2!1sen!2s!4v1710935564995!5m2!1sen!2s"
          width="600"
          height="450"
          style={"border:0;"}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe> */}
      </div>
    </>
  );
}

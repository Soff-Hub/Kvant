import { Bai_Jamjuree as FontBai } from 'next/font/google';
import { Metadata } from 'next';

import './[lang]/globals.css';
import '@assets/css/google-font.css';

const fontBai = FontBai({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bai',
});

export const metadata: Metadata = {
  title: 'Kvant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        className={fontBai.variable}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}

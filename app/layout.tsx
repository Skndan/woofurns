import Providers from '@/components/layout/providers';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Woofurns',
  description: 'Commerce'
};

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${urbanist.className}`}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

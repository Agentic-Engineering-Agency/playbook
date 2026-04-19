import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import { HtmlLangSetter } from '@/components/html-lang-setter';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://labs.agenticengineering.agency'),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  // `<html lang>` is set to "en" server-side because Next.js static export
  // requires a single root layout, and the locale is only known from the URL
  // path at request time. HtmlLangSetter reconciles this on the client for any
  // non-default locale route (e.g. /es/*). Screen readers and native spell-check
  // pick up the corrected attribute after hydration. For full SEO hreflang,
  // the sitemap + <link rel="alternate" hreflang> tags carry the locale signal.
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <HtmlLangSetter />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

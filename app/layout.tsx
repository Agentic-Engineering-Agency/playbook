import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import { HtmlLangSetter } from '@/components/html-lang-setter';
import { siteUrl } from '@/lib/metadata';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

const englishDescription =
  'Public bilingual documentation for the methods, kits, proof paths, and source-verified projects published by Agentic Engineering.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Agentic Engineering Playbook',
  title: {
    default: 'Agentic Engineering Playbook',
    template: '%s | Agentic Engineering Playbook',
  },
  description: englishDescription,
  openGraph: {
    type: 'website',
    siteName: 'Agentic Engineering Playbook',
    title: 'Agentic Engineering Playbook',
    description: englishDescription,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Engineering Playbook',
    description: englishDescription,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  // Next's single static root layout begins in English. The post-build
  // finalizer writes lang="es" into every exported Spanish HTML document;
  // this client helper also keeps the value correct during local navigation.
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <HtmlLangSetter />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

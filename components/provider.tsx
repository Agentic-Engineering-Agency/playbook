'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';
import { i18nUI } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export function Provider({ children }: { children: ReactNode }) {
  // Detect the active locale from the URL path. The default language (en) is
  // served without a prefix, so only `/es/*` needs special handling. The
  // result is passed to i18nUI.provider(locale) which returns the I18nProvider
  // props Fumadocs's language switcher and translations reader expect.
  const pathname = usePathname();
  const segment = pathname.split('/').filter(Boolean)[0];
  const locale = (i18nUI.languages as string[]).includes(segment)
    ? segment
    : i18nUI.defaultLanguage;

  return (
    <RootProvider i18n={i18nUI.provider(locale)} search={{ SearchDialog }}>
      {children}
    </RootProvider>
  );
}

'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';
import { i18nUI } from '@/lib/i18n';
import { usePathname, useRouter } from 'next/navigation';

export function Provider({ children }: { children: ReactNode }) {
  // Detect the active locale from the URL path. The default language (en) is
  // served without a prefix, so only `/es/*` needs special handling.
  const pathname = usePathname();
  const router = useRouter();
  const languages = i18nUI.languages as string[];
  const defaultLang = i18nUI.defaultLanguage;
  const segment = pathname.split('/').filter(Boolean)[0];
  const locale = languages.includes(segment) ? segment : defaultLang;

  // Fumadocs's built-in language switcher does a naive segments[0] = newLocale
  // rewrite. Combined with our hideLocale: 'default-locale' setup — where the
  // default language (en) is served WITHOUT a /en/ prefix — that produces a
  // broken URL like /en/docs/... on "English" clicks (404). We override the
  // handler to: (a) strip any existing non-default locale prefix, (b) add the
  // new prefix only when the target locale isn't the default.
  const onLocaleChange = (target: string) => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length > 0 && languages.includes(parts[0]) && parts[0] !== defaultLang) {
      parts.shift();
    }
    const canonical = '/' + parts.join('/');
    const next =
      target === defaultLang
        ? canonical === '/' ? '/' : canonical
        : `/${target}${canonical === '/' ? '' : canonical}`;
    router.push(next);
  };

  return (
    <RootProvider
      i18n={{ ...i18nUI.provider(locale), onLocaleChange }}
      search={{ SearchDialog }}
    >
      {children}
    </RootProvider>
  );
}

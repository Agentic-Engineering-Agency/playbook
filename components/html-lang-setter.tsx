'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { i18n } from '@/lib/i18n';

export function HtmlLangSetter() {
  const pathname = usePathname();
  useEffect(() => {
    const segment = pathname.split('/').filter(Boolean)[0];
    const lang = (i18n.languages as string[]).includes(segment)
      ? segment
      : i18n.defaultLanguage;
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [pathname]);
  return null;
}

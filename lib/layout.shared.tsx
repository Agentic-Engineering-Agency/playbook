import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(locale: 'en' | 'es' = 'en'): BaseLayoutProps {
  const prefix = locale === 'es' ? '/es' : '';

  return {
    nav: {
      title: (
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-fd-primary font-mono text-[10px] font-bold text-fd-primary-foreground"
          >
            AE
          </span>
          <span className="hidden font-semibold tracking-tight sm:inline">{appName}</span>
          <span className="font-semibold tracking-tight sm:hidden">Playbook</span>
        </span>
      ),
      url: prefix || '/',
    },
    links: [
      {
        text: locale === 'es' ? 'Métodos' : 'Methods',
        url: `${prefix}/docs/methods`,
      },
      {
        text: 'Kits',
        url: `${prefix}/docs/kits`,
      },
      {
        text: locale === 'es' ? 'Evidencia' : 'Proof',
        url: `${prefix}/docs/proof`,
      },
      {
        text: locale === 'es' ? 'Proyectos' : 'Projects',
        url: `${prefix}/docs/projects`,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

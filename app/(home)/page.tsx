import { PlaybookHome } from '@/components/playbook-home';
import type { Metadata } from 'next';
import { getHomeAlternates } from '@/lib/metadata';

export const metadata: Metadata = {
  alternates: getHomeAlternates('en'),
};

export default function HomePage() {
  return <PlaybookHome locale="en" />;
}

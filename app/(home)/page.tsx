import { PlaybookHome } from '@/components/playbook-home';
import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/metadata';

export const metadata: Metadata = {
  alternates: getPageAlternates('en'),
};

export default function HomePage() {
  return <PlaybookHome locale="en" />;
}

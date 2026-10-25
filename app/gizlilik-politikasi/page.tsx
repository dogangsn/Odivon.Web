'use client';

import { LegalPage } from '@/components/legal-page';
import { privacy } from '@/lib/legal-content';

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}

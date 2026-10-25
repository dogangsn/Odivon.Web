'use client';

import { LegalPage } from '@/components/legal-page';
import { terms } from '@/lib/legal-content';

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}

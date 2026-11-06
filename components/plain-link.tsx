import type { AnchorHTMLAttributes } from 'react';

// Plain anchor used instead of next/link. Vinext 1.0.0-beta.5 throws
// "e is not a function" on client-side Link navigation, so Link clicks did
// nothing. A normal link does a full page load, which is fine for this
// static marketing site. Switch back to next/link once vinext fixes it.
export default function Link({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a {...props}>{children}</a>;
}

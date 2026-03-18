'use client';

import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function NavLink({ href, className, children, onClick }: NavLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (pathname !== '/') {
      return;
    }

    if (href === '/') {
      event.preventDefault();
      window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!href.startsWith('/#')) {
      return;
    }

    const targetId = href.slice(2);
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, '', href);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

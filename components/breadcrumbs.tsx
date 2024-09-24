'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Breadcrumb {
  name: string;
  href: string;
}

function generateBreadcrumbs(pathname: string, productName?: string): Breadcrumb[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    return { name: segment, href };
  });

  if (productName) {
    breadcrumbs[breadcrumbs.length - 1].name = productName;
  }

  // Special case for the shop page
  if (pathname.startsWith('/product/')) {
    breadcrumbs.splice(0, 1, { name: 'Shop', href: '/shop' });
  }

  return [{ name: 'Home', href: '/' }, ...breadcrumbs];
}

export function Breadcrumbs({ productName }: { productName?: string }) {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    setBreadcrumbs(generateBreadcrumbs(pathname, productName));
  }, [pathname, productName]);

  return (
    <nav aria-label="breadcrumb" className="bg-gray-100 p-2 mb-4">
      <ol className="flex space-x-2 text-sm text-gray-600">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <Link href={breadcrumb.href} className="hover:underline">
              {breadcrumb.name.charAt(0).toUpperCase() + breadcrumb.name.slice(1)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
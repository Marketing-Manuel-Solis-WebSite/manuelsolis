'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

interface BreadcrumbItem {
  label: { es: string; en: string };
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { language } = useLanguage();

  return (
    <nav aria-label={language === 'es' ? 'Ruta de navegación' : 'Breadcrumb'} className="w-full">
      <ol className="flex items-center gap-1.5 text-sm text-blue-100/50 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = item.label[language];

          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-100/30 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
              {isLast ? (
                <span aria-current="page" className="text-[#B2904D] font-medium truncate max-w-[200px]">
                  {label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors duration-200 truncate max-w-[200px]"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import { ChevronRight, Home } from 'lucide-react';
import { PageView } from '../types';

interface BreadcrumbsProps {
  items: { label: string; page?: PageView; onClick?: () => void }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <ol className="flex items-center gap-1.5 text-xs text-[#94A3B8] flex-wrap">
        <li className="inline-flex items-center">
          <button
            onClick={() => items[0]?.onClick?.()}
            className="hover:text-[#FF2E3B] flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </li>

        {items.slice(1).map((item, idx) => (
          <li key={item.label} className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="hover:text-[#FF2E3B] transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-white font-semibold truncate max-w-[200px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

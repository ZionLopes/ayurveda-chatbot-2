'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusCircle, Activity, Sprout, Leaf, Sparkles, BookOpen, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'New Chat', href: '/chat', icon: PlusCircle, primary: true },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Dosha Quiz', href: '/dosha', icon: Activity },
    { name: 'Herb Directory', href: '/herbs', icon: Sprout },
    { name: 'Food Explorer', href: '/foods', icon: Leaf },
    { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  ];

  const prompts = [
    'What is Vata dosha?',
    'Best foods for Pitta?',
    'Benefits of Ashwagandha',
    'Ayurvedic morning routine',
  ];

  return (
    <aside className="w-64 border-r bg-stone-50 flex flex-col h-full overflow-hidden hidden md:flex shrink-0">
      {/* Navigation Links */}
      <div className="p-3 space-y-1 border-b">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                link.primary
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm hover:shadow-md hover:from-green-500 hover:to-emerald-500'
                  : isActive
                  ? 'bg-white text-green-700 shadow-sm border border-green-100'
                  : 'text-stone-600 hover:bg-white hover:text-stone-900'
              )}
            >
              <Icon className={cn('h-4 w-4', link.primary ? 'text-white' : '')} />
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Quick Prompts */}
      <div className="p-3 flex-1 overflow-y-auto">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 px-1">Quick Prompts</p>
        <div className="space-y-1">
          {prompts.map((prompt) => (
            <Link
              key={prompt}
              href={`/chat?q=${encodeURIComponent(prompt)}`}
              className="block px-3 py-2 text-xs text-stone-500 hover:text-stone-800 hover:bg-white rounded-lg transition-all leading-snug"
            >
              &ldquo;{prompt}&rdquo;
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="h-3.5 w-3.5 text-green-600" />
            <span className="text-xs font-semibold text-green-700">Educational Only</span>
          </div>
          <p className="text-[11px] text-green-600/80 leading-relaxed">
            AyurVeda AI provides general wellness information. Not a substitute for medical advice.
          </p>
        </div>
      </div>
    </aside>
  );
}

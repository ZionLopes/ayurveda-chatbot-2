'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Leaf, LogOut, Menu, X, User as UserIcon, Sprout, BookOpen, Activity, MessageCircle, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Chat', href: '/chat', icon: MessageCircle },
    { name: 'Herbs', href: '/herbs', icon: Sprout },
    { name: 'Knowledge', href: '/knowledge', icon: BookOpen },
    { name: 'Dosha Quiz', href: '/dosha', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-green-900/95 backdrop-blur supports-[backdrop-filter]:bg-green-900/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-green-400/30 transition-all">
            <Leaf className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-bold text-lg text-white hidden sm:inline-block tracking-tight">
            AyurVeda <span className="text-green-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-green-200 hover:bg-white/10 hover:text-white'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm text-green-200 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center">
                  <UserIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="max-w-[120px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm text-green-300 hover:text-red-400 font-medium transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-sm text-green-200 hover:text-white transition-colors px-3 py-2 rounded-lg font-medium">
                Log In
              </Link>
              <Link href="/signup" className="text-sm font-semibold bg-white text-green-900 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors shadow-sm">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-green-200 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-green-900 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-green-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          {user ? (
            <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/10 rounded-xl">
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-green-200 hover:bg-white/10 rounded-xl">Log In</Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-white font-semibold hover:bg-white/10 rounded-xl">Sign Up Free</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

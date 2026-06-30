'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { navItems } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-teal-600 text-white shadow-soft">
            <Sparkles className="h-[18px] w-[18px]" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-navy-900">
              Opera Patient Education Studio
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              Opera AI × Truveta · Concept Demo
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active ? 'text-navy-900' : 'text-slate-500 hover:text-navy-800',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-teal-50 ring-1 ring-teal-100"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/demo-library"
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-sm font-medium text-white shadow-soft transition-all hover:bg-navy-800 hover:shadow-soft-lg"
          >
            View Demos
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-navy-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/95 lg:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-xl px-4 py-2.5 text-sm font-medium',
                    isActive(item.href)
                      ? 'bg-teal-50 text-navy-900'
                      : 'text-slate-600 hover:bg-slate-50',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

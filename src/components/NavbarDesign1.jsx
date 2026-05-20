'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import { Heart, BarsUnaligned, Xmark } from '@gravity-ui/icons';
import { authClient } from '@/app/lib/auth-client';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/pets', label: 'All Pets' },
];
const NavbarDesign1 = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // const { user, login, logout } = useAuth();
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name
  const userEmail = session?.user?.email
  console.log(session?.user?.email)
  console.log(session?.user)
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PetGhor</span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Theme Toggle + Auth Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {session ? (
            <UserMenu userName={userName} userEmail={userEmail} />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <Xmark className="h-6 w-6" />
            ) : (
              <BarsUnaligned className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            {!session && (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="block rounded-lg bg-primary px-3 py-2 text-base font-medium text-primary-foreground text-center mt-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarDesign1;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import { Heart, BarsUnaligned, Xmark } from '@gravity-ui/icons';
import { Origami } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/pets', label: 'All Pets' },
];

// Mock auth state - replace with your actual auth logic
const useAuth = () => {
  const [user, setUser] = useState(true);
  
  const login = () => {
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return { user, login, logout };
};

const NavbarDesign2 = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, login, logout } = useAuth();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="flex h-14 items-center justify-between rounded-full border border-border/50 bg-background/80 px-2 shadow-lg backdrop-blur-xl">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 pl-4 flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Origami  className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PetGhor
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-full px-5 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground group"
            >
              <span className="relative z-10">{link.label}</span>
              <div className="absolute inset-0 rounded-full bg-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Right: Theme Toggle + Auth Section */}
        <div className="flex items-center gap-2 pr-2 flex-shrink-0">
          <ThemeToggle />
          
          {user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-1.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20"
            >
              Get Started
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="inline-flex items-center justify-center rounded-full p-2 text-foreground hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <Xmark className="h-5 w-5" />
            ) : (
              <BarsUnaligned className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="mt-2 rounded-2xl border border-border/50 bg-background/95 p-2 shadow-lg backdrop-blur-xl md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            {!user && (
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-xl bg-primary px-4 py-2.5 text-base font-medium text-primary-foreground text-center mt-2"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarDesign2;

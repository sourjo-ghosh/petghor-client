'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, LayoutHeaderCells, ArrowRightFromSquare } from '@gravity-ui/icons';
import Image from 'next/image';

const UserMenu = ({userName, userEmail, onLogout, userImage}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get initials from user name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-2 pr-3 transition-colors hover:bg-muted"
      >
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
          {userImage ? <Image height={40} width={40} alt={userName} src={userImage} className='rounded-full h-9 object-cover'></Image> : getInitials(userName)}
        </div>
        <span className="text-sm font-medium text-foreground hidden sm:block">
          {userName}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-background shadow-lg z-50 py-2">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
            
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <LayoutHeaderCells className="h-4 w-4" />
              Dashboard
            </Link>

            <div className="border-t border-border mt-1 pt-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout?.();
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <ArrowRightFromSquare className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;

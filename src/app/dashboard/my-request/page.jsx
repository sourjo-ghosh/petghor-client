'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import { authClient } from '@/app/lib/auth-client';

export default function MyRequestsPage() {
    const { data: session } = authClient.useSession();
  console.log(session?.user?.email);
  const userEmail = session?.user?.email;
  useEffect(() => {
    if (!userEmail) {
      // Handle the case where the user email is not available
      console.error('User email is not available');
      return;
    }

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Adoption Requests</h1>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border/60 shadow-sm p-12"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted/40 flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No Requests Yet</h2>
            <p className="text-muted-foreground">Adoption requests for your pets will appear here.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Package } from 'lucide-react';

export default function AddPetsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
            <Link href="/dashboard/add-pets">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Pet
              </motion.button>
            </Link>
          </div>
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
              <Package className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No Listings Yet</h2>
            <p className="text-muted-foreground mb-6">You haven't added any pets for adoption.</p>
            <Link href="/dashboard/add-pets">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-semibold"
              >
                <Plus className="h-5 w-5" />
                Add Your First Pet
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

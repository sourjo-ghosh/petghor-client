'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, ListIcon, Heart } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';
import { getMyListings } from '../lib/data';

const DashboardPage = () => {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name;
  const [totalListings, setTotalListings] = useState(0);
  useEffect(() => {
      async function loadPets() {
        try {
          const token = await authClient.token();
          const tokenValue = token?.data?.token;
          const myListings = await getMyListings(session?.user?.email, tokenValue);
          setTotalListings(myListings?.data?.myPets.length || 0);
        } catch (error) {
          console.error("Failed to fetch pets:", error);
          setTotalListings(0);
        }
      }
      loadPets();
    }, [session?.user?.email]);
  let stats = [
    { label: 'Total Listings', value: totalListings, icon: ListIcon, color: 'bg-blue-100/20 text-blue-600' },
    { label: 'Adoption Requests', value: '0', icon: Heart, color: 'bg-rose-100/20 text-rose-600' },
  ];

  const quickActions = [
    { 
      href: '/dashboard/add-pets', 
      title: 'Add New Pet', 
      description: 'List a pet for adoption',
      icon: Plus,
      color: 'from-primary to-primary/80'
    },
    { 
      href: '/dashboard/my-listings', 
      title: 'My Listings', 
      description: 'View and manage your pets',
      icon: ListIcon,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      href: '/dashboard/my-request', 
      title: 'My Requests', 
      description: 'View adoption requests',
      icon: Heart,
      color: 'from-rose-500 to-rose-600'
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {userName}!</p>
            </div>
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
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid sm:grid-cols-2 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-3xl border border-border/60 shadow-sm p-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full bg-card rounded-3xl border border-border/60 shadow-sm p-8 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;

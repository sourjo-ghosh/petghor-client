'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, LoaderPinwheel, X } from 'lucide-react';

import { authClient } from '@/app/lib/auth-client';

export default function MyRequestsPage() {
  const [requestsData, setRequestsData] = useState([]);
  const { data: session } = authClient.useSession();
  const [approvedList, setApprovedList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);
  const [pendingList, setPendingList] = useState([]);


  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/my-requests?email=${session?.user?.email}`);
        const data = await res.json();
        setRequestsData(data.data.myRequests || []);
        setApprovedList(data.data.approvedList || []);
        setRejectedList(data.data.rejectedList || []);
        setPendingList(data.data.pendingList || []);
      } catch (error) {
        console.error("Failed to fetch adoption requests:", error);
        setRequestsData([]);
      } finally {
        // setLoading(false);
      }
    }
    if (session?.user?.email) {
      loadRequests();
    }
  }, [session?.user?.email]);
  console.log("all data", requestsData)
  console.log("approved list", approvedList)
  console.log("rejected list", rejectedList)
  console.log("pending list", pendingList)
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
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-foreground">{requestsData.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100/60 flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingList.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100/60 flex items-center justify-center">
                <span className="text-xl">
                  <LoaderPinwheel />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Approved Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedList.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100/60 flex items-center justify-center">
                <span className="text-xl">
                    <Check />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Rejected Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{rejectedList.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100/60 flex items-center justify-center">
                <span className="text-xl">
                  <X />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Empty State */}
        {requestsData.length === 0 ? (
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/60 shadow-sm p-12"
          >
            <p className="text-muted-foreground text-center">Request details coming soon...</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

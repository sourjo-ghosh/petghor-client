"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, Edit2, Trash2, MessageCircle, X } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/app/lib/auth-client";
import { getMyListings } from "@/app/lib/data";

export default function MyListingsPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  useEffect(() => {
    async function loadPets() {
      try {
        const myListings = await getMyListings(session?.user?.email);
        setPets(myListings?.data || myListings || []);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }
    if (session?.user?.email) {
      loadPets();
    }
  }, [session?.user?.email]);

  const handleViewRequests = async (petId) => {
    setSelectedPetId(petId);
    setLoadingRequests(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/pet-requests?petId=${petId}`;
      // console.log("🔍 Fetching from:", url);
      
      const res = await fetch(url);
      // console.log("📊 Response status:", res.status);
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      // setRequests(data?.data);
      setRequests(data?.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch requests:", error);
      setRequests([]);
      toast.error("Failed to load requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/update-status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestId, status: newStatus })
        }
      );
      const data = await res.json();
      
      if (data.success) {
        toast.success(`Request ${newStatus}!`);
        // Update local state
        setRequests(requests.map(req => 
          req._id === requestId ? { ...req, status: newStatus } : req
        ));
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  if (loading) return <p className="text-center py-8">Loading pets...</p>;

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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Pet
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {pets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/60 shadow-sm p-12"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-muted/40 flex items-center justify-center mb-4">
                <Package className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                No Listings Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                You haven't added any pets for adoption.
              </p>
              <Link href="/dashboard/add-pets">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                >
                  <Plus className="h-5 w-5" />
                  Add Your First Pet
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pets.map((pet, index) => (
              <motion.div
                key={pet._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Pet Image */}
                <div className="relative w-full h-48 bg-muted">
                  {pet.imageURL ? (
                    <Image
                      src={pet.imageURL}
                      alt={pet.petName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Package className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {pet.petName}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Breed:</span> {pet.breed}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Species:</span> {pet.species}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/all-pets/${pet._id}`} className="flex-1">
                      <button className="w-full px-3 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors">
                        View
                      </button>
                    </Link>
                    <button className="px-3 py-2 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePet(pet._id)}
                      className="px-3 py-2 rounded-lg border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        console.log("🔗 Button clicked with pet._id:", pet._id, "Type:", typeof pet._id);
                        handleViewRequests(pet._id);
                      }}
                      className="px-3 py-2 rounded-lg border border-green-200 text-green-600 font-semibold text-sm hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Requests Modal */}
      <AnimatePresence>
        {selectedPetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPetId(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl border border-border/60 shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border/60 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Adoption Requests</h2>
                <button
                  onClick={() => setSelectedPetId(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {loadingRequests ? (
                  <p className="text-center text-muted-foreground py-8">Loading requests...</p>
                ) : requests.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-muted-foreground">No adoption requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div
                        key={request._id}
                        className="p-4 rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-foreground">{request.requesterName}</h3>
                            <p className="text-sm text-muted-foreground">{request.requesterEmail}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            request.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground mb-2">{request.message}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Pickup: {new Date(request.pickupDate).toLocaleDateString()}
                        </p>
                        
                        {/* Action Buttons */}
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateStatus(request._id, 'approved')}
                              className="flex-1 px-3 py-2 rounded-lg bg-green-100 text-green-700 font-semibold text-sm hover:bg-green-200 transition-colors"
                            >
                              Accepted
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(request._id, 'rejected')}
                              className="flex-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 font-semibold text-sm hover:bg-red-200 transition-colors"
                            >
                              Rejected
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

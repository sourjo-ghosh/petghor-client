"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Package, ArrowRight } from "lucide-react";
// import { getPets } from "@/app/lib/data";
import { authClient } from "@/app/lib/auth-client";
import { getMyListings } from "@/app/lib/data";

export default function MyListingsPage() {
  const { data: session } = authClient.useSession();
  // const userEmail = session?.user?.email || "";
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function loadPets() {
      try {
        setLoading(false);
        const myListings = await getMyListings(session?.user?.email);
        setPets(myListings);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }
    loadPets();
  }, [session?.user?.email]);

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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-semibold"
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

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {pet.petName}
                  </h3>
                  <div className="space-y-2 mb-4 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Breed:
                      </span>{" "}
                      {pet.breed}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Species:
                      </span>{" "}
                      {pet.species}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Owner:
                      </span>{" "}
                      {pet.ownerName || "PetGhor Shelter"}
                    </p>
                  </div>
                  <Link href={`/all-pets/${pet._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

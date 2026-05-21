"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Heart,
  MapPin,
  Share2,
  Sparkles,
  User,
  CheckCircle2,
  PawPrint,
  Info,
} from "lucide-react";
import { getPetByID } from "@/app/lib/data";

const SinglePet = ({ params }) => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    
    useEffect(() => {
        const fetchPet = async () => {
        try {
        const { userId } = await params;
        const SinglePet = await getPetByID(userId)
        setPet(SinglePet.data);
        console.log("pets", SinglePet.data)
      } catch (error) {
        console.error("Error fetching pet:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [params]);
if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <div className="h-9 w-24 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite]" 
                  style={{ backgroundSize: '200% 100%' }} 
                />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
              <div className="flex gap-3">
                <div className="h-8 w-24 bg-muted rounded-full animate-pulse" />
                <div className="h-8 w-24 bg-muted rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-32 bg-muted rounded-2xl animate-pulse" />
              <div className="h-14 bg-muted rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <PawPrint className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Pet Not Found</h2>
          <p className="text-muted-foreground mb-6">The pet you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/all-pets"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/all-pets"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Pets</span>
          </Link>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 rounded-full transition-colors ${
                isLiked
                  ? "bg-rose-100 text-rose-600"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-lg">
              <Image
                src={pet.imageURL}
                alt={pet.petName}
                fill
                className="object-cover"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground shadow-lg backdrop-blur-sm">
                  {pet.species || "Pet"}
                </span>
                {pet.gender && (
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                      pet.gender === "Female"
                        ? "bg-linear-to-r from-rose-400 to-pink-500 text-white"
                        : "bg-linear-to-r from-sky-400 to-blue-500 text-white"
                    }`}
                  >
                    {pet.gender === "Female" ? "♀" : "♂"} {pet.gender}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
           </motion.div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title Section */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-foreground mb-2"
              >
                {pet.petName}
              </motion.h1>
              <p className="text-lg text-muted-foreground">
                {pet.breed} • {pet.age} {typeof pet.age === 'number' ? 'years old' : ''}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                {pet.age} {typeof pet.age === 'number' ? 'years' : ''}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {pet.location || "Location TBD"}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                {pet.temperament || "Friendly"}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed text-base">
                {pet.description ||
                  `${pet.petName} is a wonderful ${pet.breed} looking for a loving forever home. This adorable companion has a gentle nature and loves spending time with people.`}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Info className="h-4 w-4" />
                  Health Status
                </div>
                <p className="font-semibold text-foreground">
                  {pet.healthStatus}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Vaccination
                </div>
                <p className="font-semibold text-foreground">
                  {pet.vaccinationStatus}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <User className="h-4 w-4" />
                  Owner
                </div>
                <p className="font-semibold text-foreground">
                  {pet.ownerName || "PetGhor Shelter"}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <PawPrint className="h-4 w-4" />
                  Adoption Fee
                </div>
                <p className="font-semibold text-foreground">
                  {pet.adoptionFee ? `$${pet.adoptionFee}` : "Free"}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4">
                <Link href={`${pet._id}/adopt`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 px-6 rounded-2xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
                >
                <Heart className="h-5 w-5 fill-current" />
                Adopt {pet.petName}
              </motion.button>
                </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-4 px-6 rounded-2xl border-2 border-border font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Ask Question
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SinglePet;

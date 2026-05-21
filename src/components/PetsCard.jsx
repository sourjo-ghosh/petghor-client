"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Heart, MapPin, Search } from "lucide-react";

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="group bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
    {/* Image Skeleton */}
    <div className="relative aspect-square bg-muted overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite]" 
        style={{ 
          backgroundSize: '200% 100%',
        }} 
      />
    </div>
    {/* Content Skeleton */}
    <div className="p-5 space-y-4">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
      </div>
      {/* Meta row */}
      <div className="flex gap-3">
        <div className="h-5 w-14 bg-muted rounded-full animate-pulse" />
        <div className="h-5 w-20 bg-muted rounded-full animate-pulse" />
      </div>
      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-muted rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
      </div>
      {/* Button */}
      <div className="h-11 w-full bg-muted rounded-xl animate-pulse" />
    </div>
  </div>
);

const PetsCard = ({ pets, isLoading = false }) => {
  // Number of skeleton cards to show
  const skeletonCount = 8;
  // Ensure pets is an array
  const petsArray = Array.isArray(pets) ? pets : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {pets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/60 mb-4">
                <Search className="h-8 w-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No pets found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
            >
              {/* Show skeleton cards when loading */}
              {isLoading ? (
                Array.from({ length: skeletonCount }).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SkeletonCard />
                  </motion.div>
                ))
              ) : (
                pets.map((pet, index) => (
                <motion.div
                  key={pet._id || index}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  {/* Image Container - Square aspect ratio for modern look */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={pet.imageURL || "/bannerImage2.webp"}
                      alt={pet.petName}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top badges row */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      {/* Category Badge */}
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold text-foreground shadow-lg backdrop-blur-sm">
                        {pet.species || "Pet"}
                      </span>

                      {/* Gender Badge with icon */}
                      {pet.gender && (
                        <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                          pet.gender === "Female"
                            ? "bg-linear-to-r from-rose-400 to-pink-500 text-white"
                            : "bg-linear-to-r from-sky-400 to-blue-500 text-white"
                        }`}>
                          {pet.gender === "Female" ? "♀" : "♂"}
                          {pet.gender}
                        </span>
                      )}
                    </div>

                    {/* Bottom info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-1 drop-shadow-lg"
                        layoutId={`name-${pet._id}`}
                      >
                        {pet.petName}
                      </motion.h3>
                      <p className="text-sm text-white/90 font-medium drop-shadow-md">
                        {pet.breed || pet.type}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Meta Info Pills */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {pet.age && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 text-xs font-medium text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          <span>{pet.age}</span>
                        </div>
                      )}
                      {pet.location && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 text-xs font-medium text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          <span className="truncate max-w-30">
                            {pet.location}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
                      {pet.description ||
                        `${pet.name} is a loving ${pet.breed || pet.type} looking for a forever home.`}
                    </p>

                    {/* Action Button */}
                    <div className="flex gap-3">
                      <Link
                        href={`/all-pets/${pet._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-border text-sm font-semibold text-foreground hover:bg-muted hover:border-muted-foreground/30 transition-all duration-200"
                      >
                        View Details
                      </Link>
                      <Link href={`/all-pets/${pet._id}/adopt`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-primary to-primary/80 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
                        >
                        <Heart className="h-4 w-4 fill-current" />
                        Adopt Me
                      </motion.button>
                        </Link>
                    </div>
                  </div>
                </motion.div>
              ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PetsCard;

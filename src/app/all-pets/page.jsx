"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader, PawPrint, Search, ArrowRight } from "lucide-react";
import { ListUl } from "@gravity-ui/icons";
import PetsCard from "@/components/PetsCard";

const categories = ["All", "Dog", "Cat", "Bird", "Rabbit", "Fish"];

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const handleSearch = () => {
    const value = searchInputRef.current?.value || "";
    setSearchQuery(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const getPets = async () => {
      const isFirstLoad = pets.length === 0;
      if (!isFirstLoad) {
        setIsFiltering(true);
      }
      setLoading(isFirstLoad);
      
      let url = "http://localhost:8000/all-pets?";
      if (selectedCategory !== "All") {
        url += `species=${selectedCategory}`;
      }
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
        setIsFiltering(false);
      }
    };
    getPets();
  }, [selectedCategory, searchQuery, pets.length]);
  // console.log(pets)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
        {/* Skeleton Hero */}
        <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Badge Skeleton */}
            <div className="flex justify-center mb-5">
              <div className="h-8 w-48 bg-muted rounded-full animate-pulse" />
            </div>
            {/* Title Skeleton */}
            <div className="flex justify-center mb-4">
              <div className="h-10 w-72 md:w-96 bg-muted rounded-lg animate-pulse" />
            </div>
            {/* Description Skeleton */}
            <div className="flex justify-center mb-2">
              <div className="h-4 w-64 md:w-80 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex justify-center mb-10">
              <div className="h-4 w-48 md:w-64 bg-muted rounded animate-pulse" />
            </div>
            {/* Search Skeleton */}
            <div className="max-w-2xl mx-auto mb-5">
              <div className="h-12 bg-muted rounded-xl animate-pulse" />
            </div>
            {/* Filter Buttons Skeleton */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-9 w-16 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
            {/* Results Count Skeleton */}
            <div className="flex justify-center">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </section>

        {/* Skeleton Cards Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm">
                  {/* Image Skeleton - Square aspect ratio */}
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite]" 
                      style={{ backgroundSize: '200% 100%' }} 
                    />
                  </div>
                  {/* Content Skeleton */}
                  <div className="p-5 space-y-4">
                    {/* Title row */}
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                      <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                    </div>
                    {/* Meta pills */}
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
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5"
            >
              <PawPrint className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Find Your Perfect Companion
              </span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Meet Our <span className="text-primary">Wonderful Pets</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Browse through our adorable pets waiting for their forever homes.
              Each one has a unique personality and lots of love to give.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-5 flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by name, breed, or location..."
                  defaultValue={searchQuery}
                  onKeyDown={handleKeyDown}
                  disabled={isFiltering}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                disabled={isFiltering}
                className="px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isFiltering ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Search
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: isFiltering ? 1 : 1.02 }}
                  whileTap={{ scale: isFiltering ? 1 : 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                  disabled={isFiltering}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card/60 text-muted-foreground border-border/60 hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{pets?.data.length}</span> pets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pets Grid Section - Using PetsCard Component */}
      <PetsCard pets={pets.data} isLoading={isFiltering} />
    </main>
  );
};

export default AllPetsPage;
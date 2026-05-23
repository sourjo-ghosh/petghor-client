"use client";

import React, { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { motion } from "framer-motion";
import { Plus, Loader } from "lucide-react";
import { toast } from "sonner";
import { PostPet } from "@/app/lib/actions";

const speciesOptions = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Fish",
  "Other",
];
const genderOptions = ["Male", "Female", "Unknown"];
const healthStatusOptions = ["Excellent", "Good", "Fair", "Special Needs"];
const vaccinationStatusOptions = [
  "Fully Vaccinated",
  "Partially Vaccinated",
  "Not Vaccinated",
];

export default function AddPetsPage() {
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email || "";
  const userName = session?.user?.name || "";
  // console.log(userEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    // console.log(formData);
    try {
      setIsSubmitting(true);
      const token = await authClient.token();
      const tokenValue = token?.data?.token;
      const result = await PostPet(formData, tokenValue);
      // console.log(result);
      console.log(tokenValue)
      if (result.success) {
        toast.success('Pet added successfully! 🐾', {
          description: `${formData.petName} has been added to PetGhor.`,
          duration: 4000
        });
        e.target.reset();
        setTimeout(() => {
          window.location.href = '/dashboard/my-listings';
        }, 1500);
      } else {
        toast.error('Failed to add pet', {
          description: result.message || 'Please try again.',
          duration: 4000
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error posting pet:", error);
      toast.error('Error adding pet', {
        description: error.message || 'Something went wrong. Please try again.',
        duration: 4000
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-foreground">Add New Pet</h1>
        </div>
      </motion.header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border/60 shadow-sm p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  1
                </span>
                Basic Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    name="petName"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="Enter pet name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Species *
                  </label>
                  <select
                    name="species"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  >
                    <option value="">Select species</option>
                    {speciesOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Breed *
                  </label>
                  <input
                    type="text"
                    name="breed"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="e.g., Golden Retriever"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Age *
                  </label>
                  <input
                    type="text"
                    name="age"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="e.g., 2 years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  2
                </span>
                Media & Location
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="imageURL"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="https://imgbb.com/..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use imgbb.com or postimage.org
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="e.g., New York, NY"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  3
                </span>
                Health Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Health Status *
                  </label>
                  <select
                    name="healthStatus"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  >
                    <option value="">Select health status</option>
                    {healthStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Vaccination Status *
                  </label>
                  <select
                    name="vaccinationStatus"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  >
                    <option value="">Select vaccination status</option>
                    {vaccinationStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  4
                </span>
                Adoption Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Adoption Fee
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium">$</span>
                    <input
                      type="number"
                      name="adoptionFee"
                      min="0"
                      step="0.01"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Owner Email (Read Only)
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={userEmail}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 text-foreground cursor-not-allowed opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Owner Name (Read Only)
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={userName}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 text-foreground cursor-not-allowed opacity-60"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  5
                </span>
                Pet Description
              </h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="5"
                  className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                  placeholder="Describe the pet's personality, behavior, and special needs..."
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Adding Pet...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Add Pet to Platform
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

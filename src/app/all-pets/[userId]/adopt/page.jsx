'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/app/lib/auth-client';
import Image from 'next/image';
import { getPetByID } from '@/app/lib/data';
import { adoptPet } from '@/app/lib/actions';

const AdoptPage = ({ params }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId: id } = await params;
        setUserId(id);
        const petData = await getPetByID(id);
        setPet(petData.data);
        // console.log('Pet data:', petData.data);
      } catch (error) {
        console.error('Error fetching pet:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.target);
      
      const adoptionData = {
        petId: pet._id,
        petName: pet.petName, 
        petImage: pet.imageURL,
        ownerEmail: pet.ownerEmail || "petGhor shelter",
        requesterEmail: session?.user?.email,
        requesterName: session?.user?.name,
        pickupDate: formData.get('pickupDate'),
        message: formData.get('message'),
        status: "pending",
        requestDate: new Date()
      };
      
      console.log('Adoption Request Data:', adoptionData);
      
      const response = await adoptPet(adoptionData);
      
      if (response.success) {
        toast.success('Adoption request submitted! 🎉', {
          description: 'We will review your request and contact you soon.',
          duration: 4000
        });
        e.target.reset();
        setTimeout(() => {
          window.location.href = userId ? `/all-pets/${userId}` : '/all-pets';
        }, 2000);
      } else {
        toast.error('Adoption request failed', {
          description: response.message || 'Please try again.',
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Adoption error:', error);
      toast.error('Something went wrong', {
        description: error.message || 'Please try again later.',
        duration: 4000
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-10 w-24 bg-muted rounded-lg animate-pulse mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="sticky top-20 space-y-4">
                <div className="h-32 bg-muted rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href={userId ? `/all-pets/${userId}` : '/all-pets'}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-xl font-bold text-foreground">Adopt {pet?.petName}</h1>
          <div className="w-8" />
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Pet Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-20 space-y-4">
              {pet && (
                <div className="bg-card rounded-3xl border border-border/60 shadow-sm overflow-hidden">
                  {/* Pet Image */}
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {pet.imageURL && (
                      <Image 
                        src={pet.imageURL} 
                        alt={pet.petName}
                        height={400}
                        width={400}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  {/* Pet Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-foreground">{pet.petName}</h3>
                      <Heart className="h-5 w-5 text-primary fill-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {pet.breed} • {pet.age}
                    </p>
                    
                    {/* Stats */}
                    <div className="space-y-3 border-t border-border/50 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gender</span>
                        <span className="font-medium text-foreground">{pet.gender}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium text-foreground">{pet.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Health Status</span>
                        <span className="font-medium text-foreground">{pet.healthStatus}</span>
                      </div>
                      {pet.adoptionFee && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Adoption Fee</span>
                          <span className="font-medium text-primary">${pet.adoptionFee}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                      {pet.description || `${pet.petName} is a wonderful companion looking for a loving home.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Info Card */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Next Steps
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Fill in your details</li>
                  <li>✓ Choose pickup date</li>
                  <li>✓ Tell us about yourself</li>
                  <li>✓ We'll review & contact you</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-3xl border border-border/60 shadow-sm p-8">
              {pet?.ownerEmail === userEmail ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Can't Adopt Your Own Pet</h2>
                  <p className="text-muted-foreground max-w-sm">
                    You are the owner of this pet. You can manage it from your listings instead.
                  </p>
                  <Link href="/dashboard/my-listings">
                    <button className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                      Go to My Listings
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-8">Adoption Request</h2>
              
                  <form onSubmit={handleSubmit} className="space-y-5">
                {/* Pet Information */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pet Name</label>
                  <input
                    type="text"
                    value={pet?.petName || ''}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-foreground cursor-not-allowed opacity-60"
                  />
                </div>

                {/* User Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                    <input
                      type="text"
                      value={userName || ''}
                      readOnly
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-foreground cursor-not-allowed opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Email</label>
                    <input
                      type="email"
                      value={userEmail || ''}
                      readOnly
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-foreground cursor-not-allowed opacity-60"
                    />
                  </div>
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Preferred Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Tell us why you want to adopt this pet..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    submitting 
                      ? 'bg-primary/50 cursor-not-allowed opacity-70' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  {submitting ? 'Submitting...' : 'Submit Adoption Request'}
                </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdoptPage;
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Loader, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';
import Image from 'next/image';

const AdoptPage = ({ params }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [userId, setUserId] = useState(null);

  const { data: session } = authClient.useSession();
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;

  const [formData, setFormData] = useState({
    petName: '',
    userName: '',
    userEmail: '',
    pickupDate: '',
    message: '',
    status: 'pending',
  });

  // Update form when session data changes
  useEffect(() => {
    if (userName || userEmail) {
      setFormData(prev => ({
        ...prev,
        userName: userName || '',
        userEmail: userEmail || '',
      }));
    }
  }, [userName, userEmail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId: id } = await params;
        setUserId(id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets/${id}`);
        const petData = await res.json();
        setPet(petData.data);

        // Update form with pet name
        setFormData(prev => ({
          ...prev,
          petName: petData.data?.petName || '',
        }));
      } catch (error) {
        console.error('Error fetching pet:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submit adoption request
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId: userId,
          petName: formData.petName,
          userName: formData.userName,
          userEmail: formData.userEmail,
          pickupDate: formData.pickupDate,
          message: formData.message,
          status: 'pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit adoption request');
      }

      setSubmitStatus('success');
      setFormData(prev => ({
        ...prev,
        pickupDate: '',
        message: '',
      }));
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-xl font-bold text-foreground">Adopt {formData.petName}</h1>
          <div className="w-8" />
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-3xl border border-border/60 shadow-sm p-8">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-100/20 border border-green-200/50 flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Adoption request submitted successfully! We'll contact you soon.
                  </span>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-100/20 border border-red-200/50 flex items-center gap-3"
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-red-700">
                    Something went wrong. Please try again.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pet Name - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    value={formData.petName}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 text-foreground cursor-not-allowed opacity-60"
                  />
                </div>

                {/* User Name - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40  cursor-not-allowed opacity-60"
                  />
                </div>

                {/* User Email - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Email</label>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 text-foreground cursor-not-allowed opacity-60"
                  />
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Preferred Pickup Date *</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                    placeholder="Tell us a bit about yourself and why you want to adopt this pet..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || !formData.pickupDate || !formData.message}
                  className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5 fill-current" />
                      Adopt {formData.petName}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

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
        </div>
      </main>
    </div>
  );
};

export default AdoptPage;
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Envelope, 
  ArrowRight, 
  Persons, 
  Heart,
  Check,
  ChevronRight
} from '@gravity-ui/icons';

const features = [
  {
    icon: Persons,
    title: '10,000+ Members',
    description: 'Join thousands of pet lovers sharing experiences',
  },
  {
    icon: ChevronRight,
    title: 'Daily Discussions',
    description: 'Get advice, share stories, and connect daily',
  },
  {
    icon: Heart,
    title: 'Exclusive Events',
    description: 'Pet meetups, webinars, and adoption drives',
  },
];

const testimonials = [
  { name: 'Sarah M.', text: 'Found my best friend here!', avatar: 'SM' },
  { name: 'Mike T.', text: 'Amazing community support', avatar: 'MT' },
  { name: 'Emma L.', text: 'Learned so much about care', avatar: 'EL' },
  { name: 'John D.', text: 'Adopted 2 pets already!', avatar: 'JD' },
];

const JoinCommunity = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-accent/10 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6"
            >
              <Persons className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Join 10,000+ Pet Lovers</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Join Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Community
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Connect with fellow pet lovers, share your adoption stories, get expert advice, 
              and be the first to know about new pets available for adoption.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="relative"
            >
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitted}
                  className={`px-6 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                    isSubmitted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="h-5 w-5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <ArrowRight className="h-5 w-5" />
                      Join
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam, ever. Unsubscribe anytime. Join our newsletter for weekly pet tips and updates.
              </p>
            </motion.form>
          </motion.div>

          {/* Right: Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/bannerImage3.webp"
                alt="Pet community"
                width={600}
                height={500}
                className="object-cover w-full h-[450px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Floating Testimonial Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -left-8 top-8 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 3).map((t, i) => (
                    <div
                      key={t.name}
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold border-2 border-background"
                      style={{ zIndex: 3 - i }}
                    >
                      {t.avatar}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">+9,997</span>
              </div>
              <p className="text-xs text-muted-foreground">Happy members sharing their pet stories daily</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -right-4 bottom-20 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Verified Community</p>
                  <p className="text-xs text-muted-foreground">Trusted by pet experts</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-dashed border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-24 h-24 border-2 border-dashed border-accent/20 rounded-full"
            />

            {/* Social Proof Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 left-6 right-6 bg-background rounded-2xl p-4 shadow-xl border border-border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                  <span className="text-sm font-medium text-foreground">Join the love</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Weekly tips</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>Pet news</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>Events</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;

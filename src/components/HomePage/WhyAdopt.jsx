'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Heart, House, ShieldCheck, Wallet } from 'lucide-react';
import { FaceSmile } from '@gravity-ui/icons';
// import { Heart, ShieldCheck, Clock, FaceSmile, House, Wallet } from '@gravity-ui/icons';

const reasons = [
  {
    icon: Heart,
    title: 'Save a Life',
    description: 'By adopting, you give a homeless pet a second chance at life and free up space for another animal in need.',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
  },
  {
    icon: Wallet,
    title: 'Cost Effective',
    description: 'Adoption fees are much lower than buying from breeders, and pets often come vaccinated and spayed/neutered.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
  },
  {
    icon: ShieldCheck,
    title: 'Health Benefits',
    description: 'Studies show pet owners have lower stress, reduced blood pressure, and improved mental health.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
  },
  {
    icon: FaceSmile,
    title: 'Unconditional Love',
    description: 'Rescued pets often show immense gratitude and form deep, loyal bonds with their new families.',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950/20',
  },
  {
    icon: Clock,
    title: 'Perfect Match',
    description: 'Adult pets already have established personalities, making it easier to find your ideal companion.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: House,
    title: 'Fight Cruelty',
    description: 'Adoption helps combat puppy mills and irresponsible breeding practices that harm animals.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const WhyAdopt = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/10 to-primary/5 rounded-full blur-3xl" />
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
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Why Choose Adoption</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Why Adopt a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Pet?
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Adopting a pet is one of the most rewarding decisions you can make. 
              Not only do you gain a loyal companion, but you also make a real difference 
              in an animal&apos;s life.
            </p>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/bannerImage3.webp"
                alt="Happy adopted pet with owner"
                width={600}
                height={400}
                className="object-cover w-full h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-2xl p-4 flex justify-around"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">3.1M</p>
                  <p className="text-xs text-muted-foreground">Pets Adopted/Year</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">94%</p>
                  <p className="text-xs text-muted-foreground">Happy Owners</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-500">15Yrs</p>
                  <p className="text-xs text-muted-foreground">Avg. Lifespan</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group p-6 rounded-2xl ${reason.bgColor} border border-border hover:border-primary/30 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <reason.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;

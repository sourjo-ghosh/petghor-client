'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, MapPin, Calendar } from '@gravity-ui/icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PetsShowcase = ({sixPets}) => {

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4"
          >
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Meet Our Friends</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pets Waiting for a <span className="text-primary">Home</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These adorable companions are looking for their forever families. 
            Each one has a unique personality and lots of love to give.
          </p>
        </motion.div>

        {/* Pets Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sixPets.map((pet, index) => (
            <motion.div
              key={pet._id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-background rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pet.imageURL}
                  alt={pet.petName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                
                {/* Gender Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  pet.gender === 'Female' 
                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                }`}>
                  {pet.gender}
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-foreground">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground">{pet.type}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{pet.age}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{pet.location}</span>
                  </div>
                </div>
                {/* Name */}
                <p className="text-foreground mb-3 line-clamp-2 text-2xl font-semibold">
                  {pet.petName}
                </p>
                {/* Description */}
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {pet.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/all-pets/${pet._id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    View Details
                  </Link>
                  <Link href={`/all-pets/${pet._id}/adopt`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                    <Heart className="h-4 w-4" />
                    Adopt Now
                  </motion.button>
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/all-pets"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background border-2 border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all"
          >
            View All Pets
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PetsShowcase;

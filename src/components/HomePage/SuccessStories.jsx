'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { QuoteOpen, Star, Heart, Calendar } from '@gravity-ui/icons';

const stories = [
  {
    id: 1,
    petName: 'Luna',
    petType: 'Golden Retriever',
    ownerName: 'Sarah Johnson',
    ownerAvatar: 'SJ',
    location: 'New York, NY',
    date: 'Adopted 6 months ago',
    rating: 5,
    story: 'Luna has completely transformed our family. She was shy at first, but now she&apos;s the heart of our home. My kids absolutely adore her, and she brings so much joy to our daily lives.',
    image: '/bannerImage2.webp',
  },
  {
    id: 2,
    petName: 'Milo',
    petType: 'Tabby Cat',
    ownerName: 'Michael Chen',
    ownerAvatar: 'MC',
    location: 'San Francisco, CA',
    date: 'Adopted 1 year ago',
    rating: 5,
    story: 'I never knew I needed a cat until I met Milo. He&apos;s my work-from-home buddy and keeps me company during long coding sessions. Best decision I ever made!',
    image: '/bannerImage3.webp',
  },
  {
    id: 3,
    petName: 'Bella',
    petType: 'Beagle Mix',
    ownerName: 'Emma Williams',
    ownerAvatar: 'EW',
    location: 'Chicago, IL',
    date: 'Adopted 3 months ago',
    rating: 5,
    story: 'Bella came into my life when I needed her most. She&apos;s helped me through tough times with her unconditional love. We go on daily walks and she&apos;s made me more active and happy.',
    image: '/bannerImage4.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SuccessStories = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

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
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4"
          >
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Real Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every adoption creates a beautiful story. Here are some heartwarming tales 
            from families who found their perfect companions.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-background rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.petName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Pet Name Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2"
                >
                  <p className="font-bold text-foreground">{story.petName}</p>
                  <p className="text-xs text-muted-foreground">{story.petType}</p>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <QuoteOpen className="h-8 w-8 text-primary/30" />
                </div>

                {/* Story Text */}
                <p className="text-muted-foreground mb-6 line-clamp-4 leading-relaxed">
                  &ldquo;{story.story}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Owner Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {story.ownerAvatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{story.ownerName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{story.location}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{story.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '10,000+', label: 'Happy Adoptions' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '5,000+', label: 'Five Star Reviews' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;

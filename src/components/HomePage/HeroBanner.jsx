'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Shield, Clock } from '@gravity-ui/icons';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

const HeroBanner = () => {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 w-fit mb-6"
            >
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Find Your Perfect Companion</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Give a{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Home</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-2 left-0 h-3 bg-accent/30 -z-0"
                />
              </span>{' '}
              to a{' '}
              <span className="text-accent">Friend</span>
              <br />
              in Need
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-xl mb-8"
            >
              Every pet deserves a loving home. Browse our collection of adorable pets 
              waiting for their forever family. Adopt today and change a life forever.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/all-pets"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
                Adopt a Pet
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background/50 px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { number: '2,500+', label: 'Pets Adopted', icon: Heart },
                { number: '150+', label: 'Active Rescues', icon: Shield },
                { number: '24/7', label: 'Support', icon: Clock },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{stat.number}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 w-32 h-32 border-2 border-dashed border-primary/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-dashed border-accent/30 rounded-full"
            />

            {/* Main Image Container */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl scale-110" />
              
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/bannerImage.webp"
                  alt="Happy pets waiting for adoption"
                  width={600}
                  height={500}
                  className="object-cover"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -left-8 bottom-20 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Happy Adoptions</p>
                    <p className="text-xs text-muted-foreground">Every day</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -right-4 top-12 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Verified</p>
                    <p className="text-xs text-muted-foreground">Safe & Secure</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ d: 'M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z' }}
            animate={{
              d: [
                'M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z',
                'M0,60 C360,0 1080,120 1440,60 L1440,120 L0,120 Z',
                'M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            fill="rgb(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;

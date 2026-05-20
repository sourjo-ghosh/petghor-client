'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Magnifier, 
  Person, 
  HandsetArrowIn, 
  Heart, 
  House, 
  ChevronRight,
  Check
} from '@gravity-ui/icons';

const steps = [
  {
    number: '01',
    icon: Magnifier,
    title: 'Browse & Connect',
    description: 'Explore our database of loving pets. Filter by breed, age, size, and personality to find your perfect match.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    number: '02',
    icon: Person,
    title: 'Meet & Greet',
    description: 'Schedule a visit to meet your potential new family member. Spend quality time together to ensure compatibility.',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950/20',
  },
  {
    number: '03',
    icon: HandsetArrowIn,
    title: 'Application',
    description: 'Complete a simple adoption application. We review to ensure the best match for both you and the pet.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
  },
  {
    number: '04',
    icon: Heart,
    title: 'Home Check',
    description: 'We conduct a brief home visit or virtual check to ensure your space is safe and suitable for your new companion.',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950/20',
  },
  {
    number: '05',
    icon: Check,
    title: 'Finalization',
    description: 'Sign adoption papers, pay the fee, and receive your pet\'s medical records, supplies, and care guide.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
  },
  {
    number: '06',
    icon: House,
    title: 'Welcome Home',
    description: 'Bring your new best friend home! We provide ongoing support and resources for a smooth transition.',
    color: 'from-primary to-accent',
    bgColor: 'bg-primary/10 dark:bg-primary/20',
  },
];

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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const AdoptionProcess = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4"
          >
            <House className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Steps</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How to <span className="text-primary">Adopt</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;ve made the adoption process simple and transparent. 
            Follow these six easy steps to welcome your new best friend home.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Process Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className={`group relative flex gap-4 p-5 rounded-2xl ${step.bgColor} border border-border hover:border-primary/30 transition-all duration-300`}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-9 top-[4.5rem] w-0.5 h-8 bg-gradient-to-b from-border to-transparent" />
                )}

                {/* Number Badge */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/bannerImage2.webp"
                alt="Happy adoption moment"
                width={600}
                height={500}
                className="object-cover w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Floating Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Ready to Start?</h4>
                      <p className="text-sm text-muted-foreground">Average adoption time: 1-2 weeks</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <p className="text-2xl font-bold text-primary">$50-200</p>
                      <p className="text-xs text-muted-foreground">Adoption Fee</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <p className="text-2xl font-bold text-accent">100%</p>
                      <p className="text-xs text-muted-foreground">Vaccinated</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-500">Lifetime</p>
                      <p className="text-xs text-muted-foreground">Support</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionProcess;

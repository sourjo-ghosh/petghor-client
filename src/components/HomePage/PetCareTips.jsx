'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  Pencil, 
  Umbrella, 
  Stethoscope, 
  Sparkles, 
  ShieldCheck,
  ChevronRight
} from '@gravity-ui/icons';

const careCategories = [
  {
    icon: Pencil,
    title: 'Nutrition',
    tips: [
      'Choose age-appropriate food for your pet',
      'Maintain consistent feeding schedules',
      'Always provide fresh, clean water',
      'Avoid toxic foods like chocolate, grapes, onions',
    ],
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    icon: HeartPulse,
    title: 'Health & Wellness',
    tips: [
      'Schedule regular vet check-ups annually',
      'Keep vaccinations up to date',
      'Monitor for changes in behavior or appetite',
      'Maintain dental hygiene with regular cleaning',
    ],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950/20',
  },
  {
    icon: Umbrella,
    title: 'Exercise',
    tips: [
      'Daily walks for dogs (30+ minutes)',
      'Interactive play sessions for cats',
      'Mental stimulation with puzzle toys',
      'Adjust exercise to your pet\'s age and health',
    ],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
  },
  {
    icon: Sparkles,
    title: 'Grooming',
    tips: [
      'Brush coat regularly to prevent matting',
      'Trim nails every 2-4 weeks',
      'Clean ears weekly to prevent infections',
      'Bathe as needed based on coat type',
    ],
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950/20',
  },
  {
    icon: Stethoscope,
    title: 'Emergency Care',
    tips: [
      'Know your nearest 24/7 emergency vet',
      'Keep a pet first aid kit at home',
      'Learn basic pet CPR and Heimlich',
      'Save poison control hotline number',
    ],
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
  },
  {
    icon: ShieldCheck,
    title: 'Safety',
    tips: [
      'Microchip and ID tag your pet',
      'Pet-proof your home (toxic plants, chemicals)',
      'Use secure leashes and harnesses',
      'Never leave pets in hot cars',
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const PetCareTips = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

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
            className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-4 py-2 mb-4"
          >
            <HeartPulse className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Expert Advice</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pet Care <span className="text-emerald-500">Tips</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Taking care of your furry friend is a rewarding responsibility. 
            Here are essential tips to keep your pet healthy, happy, and thriving.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/bannerImage4.jpg"
                alt="Happy pet being cared for"
                width={600}
                height={500}
                className="object-cover w-full h-[400px] lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Vet Check Reminder</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular veterinary visits are crucial for early detection of health issues. 
                      Schedule annual check-ups for adult pets.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-24 h-24 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-full"
            />
          </motion.div>

          {/* Right: Care Categories Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {careCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group p-5 rounded-2xl ${category.bgColor} border border-border hover:border-transparent transition-all duration-300 cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  {category.title}
                  <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <ul className="space-y-1.5">
                  {category.tips.slice(0, 3).map((tip, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color} mt-1.5 flex-shrink-0`} />
                      <span className="line-clamp-2">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-muted/50 rounded-2xl px-8 py-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <p className="text-foreground">
              <span className="font-semibold">Pro Tip:</span>{' '}
              <span className="text-muted-foreground">
                Create a care routine and stick to it. Consistency helps pets feel secure and builds trust.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PetCareTips;

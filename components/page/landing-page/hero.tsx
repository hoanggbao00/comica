"use client";

import { Button } from "@/components/ui/button";
import { type Variants, motion } from "motion/react";
import Link from "next/link";

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const bubbleVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 300,
        delay: 1.2,
      },
    },
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center px-6 py-20">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <div className="mb-8">
          <motion.h1
            className="mb-6 font-bold font-comic text-5xl text-foreground leading-tight md:text-7xl"
            variants={itemVariants}
          >
            Create Epic
            <motion.span
              className="block bg-gradient-hero bg-clip-text text-transparent"
              initial={{ backgroundPosition: "200% center" }}
              animate={{ backgroundPosition: "0% center" }}
              transition={{ duration: 2, delay: 0.8 }}
            >
              AI Comics
            </motion.span>
            in Seconds!
          </motion.h1>

          {/* Comic Speech Bubble */}
          <motion.div
            className="comic-speech-bubble mb-8 inline-block p-4 font-bold font-comic text-lg"
            variants={bubbleVariants}
          >
            Transform your stories into stunning comic masterpieces! ⚡
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="mx-auto mb-12 max-w-2xl font-comic text-muted-foreground text-xl leading-relaxed md:text-2xl"
          variants={itemVariants}
        >
          No drawing skills? No problem! Our AI-powered comic creator turns your ideas into professional-looking comics
          with just a few clicks.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="mb-16 flex flex-col items-center justify-center gap-4" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="btn-hero px-8 py-6 font-comic text-xl">
              <Link href="/studio">Start Creating Free 🎨</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, rotate: -1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="rounded-2xl border-4 border-black px-6 py-4 font-comic text-lg shadow-comic transition-all hover:shadow-comic-lg"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
          {["✨ AI-Powered", "🎯 Easy to Use", "⚡ Instant Results", "🎨 Professional Quality"].map(
            (feature, index) => (
              <motion.div
                key={index}
                className="cursor-default rounded-full border-2 border-black bg-secondary/20 px-4 py-2 font-comic font-medium"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring" as const,
                  damping: 15,
                  stiffness: 300,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 },
                }}
              >
                {feature}
              </motion.div>
            ),
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

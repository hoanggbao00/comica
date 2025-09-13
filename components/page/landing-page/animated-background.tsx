"use client";

import { motion } from "motion/react";

const AnimatedBackground = () => {
  return (
    <div className="-z-10 fixed inset-0">
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50" />

      {/* Floating Comic Elements */}
      <motion.div
        className="absolute top-10 left-10 opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="h-20 w-20 rounded-full border-4 border-black bg-comic-yellow" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-20 opacity-10"
        animate={{
          y: [0, -25, 0],
          rotate: [45, 50, 45],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="h-16 w-16 rotate-45 transform border-4 border-black bg-comic-red" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 opacity-10"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="h-12 w-12 rounded-full border-4 border-black bg-comic-blue" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-1/2 opacity-10"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div className="comic-speech-bubble flex h-16 w-24 items-center justify-center font-comic text-xs">POW!</div>
      </motion.div>

      {/* Additional Comic Elements */}
      <motion.div
        className="absolute top-1/2 right-10 opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [12, 17, 12],
        }}
        transition={{
          duration: 6.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <div className="h-18 w-18 rotate-12 transform rounded-2xl border-4 border-black bg-comic-pink" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/3 opacity-10"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 7.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2.5,
        }}
      >
        <div className="comic-speech-bubble flex h-12 w-20 items-center justify-center font-comic text-xs">BAM!</div>
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/3 opacity-10"
        animate={{
          y: [0, -18, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div className="h-14 w-14 rounded-full border-4 border-black bg-comic-green" />
      </motion.div>

      <motion.div
        className="absolute right-1/6 bottom-1/3 opacity-10"
        animate={{
          y: [0, -22, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3.5,
        }}
      >
        <div className="comic-speech-bubble flex h-14 w-22 items-center justify-center font-comic text-xs">ZOOM!</div>
      </motion.div>

      <motion.div
        className="absolute top-1/6 left-2/3 opacity-10"
        animate={{
          y: [0, -16, 0],
          rotate: [45, 50, 45],
        }}
        transition={{
          duration: 8.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <div className="h-10 w-10 rotate-45 transform border-4 border-black bg-comic-purple" />
      </motion.div>

      {/* Subtle Dot Pattern */}
      <div className="comic-dot-pattern absolute inset-0" />
    </div>
  );
};

export default AnimatedBackground;

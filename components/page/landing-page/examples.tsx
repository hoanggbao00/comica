"use client";

import { type Variants, motion, useInView } from "motion/react";
import { useRef } from "react";

const Examples = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const examples = [
    {
      title: "Superhero Adventure",
      description: "Epic action scenes with dynamic characters",
      image: "/images/comic-example-1.jpg",
      genre: "Action",
    },
    {
      title: "Fantasy Quest",
      description: "Magical worlds and mythical creatures",
      image: "/images/comic-example-2.jpg",
      genre: "Fantasy",
    },
    {
      title: "Romance Comedy",
      description: "Cute characters and heartwarming stories",
      image: "/images/comic-example-3.jpg",
      genre: "Romance",
    },
  ];

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
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section id="examples" className="relative px-6 py-20" ref={ref}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="mb-6 font-bold font-comic text-4xl text-foreground md:text-6xl">
            Amazing Comics
            <span className="block bg-gradient-comic bg-clip-text text-transparent">Made by AI</span>
          </h2>

          {/* Comic Speech Bubble */}
          <motion.div
            className="comic-speech-bubble mb-8 inline-block p-4 font-bold font-comic text-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{
              type: "spring" as const,
              damping: 15,
              stiffness: 300,
              delay: 0.5,
            }}
          >
            Check out these incredible AI-generated comics! 💫
          </motion.div>

          <p className="mx-auto max-w-2xl font-comic text-muted-foreground text-xl">
            From superhero adventures to romantic comedies, our AI creates stunning visuals that bring your stories to
            life in vibrant detail.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {examples.map((example, index) => (
            <motion.div
              key={index}
              className="comic-card group p-6"
              variants={itemVariants}
              whileHover={{
                y: -10,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3 },
              }}
            >
              {/* Genre Badge */}
              <motion.div
                className="mb-4"
                initial={{ x: -20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span className="rounded-full border-2 border-black bg-accent px-3 py-1 font-bold font-comic text-accent-foreground text-sm">
                  {example.genre}
                </span>
              </motion.div>

              {/* Comic Image */}
              <div className="relative mb-6 overflow-hidden rounded-2xl border-4 border-black shadow-comic transition-all group-hover:shadow-comic-lg">
                <motion.img
                  src={example.image}
                  alt={example.title}
                  className="h-48 w-full object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.2,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  }}
                  whileHover={{ scale: 1.05 }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <h3 className="mb-2 font-bold font-comic text-foreground text-xl">{example.title}</h3>
                <p className="font-comic text-muted-foreground">{example.description}</p>
              </motion.div>

              {/* Action Button */}
              <motion.div
                className="mt-6"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  type: "spring" as const,
                  damping: 15,
                  stiffness: 300,
                  delay: 0.8 + index * 0.1,
                }}
              >
                <motion.button
                  className="btn-comic w-full py-2 text-sm"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Similar
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="btn-hero px-8 py-4 font-comic text-lg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Creating Your Comic 🚀
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Examples;

"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/og";
import { motion } from "motion/react";

const Header = () => {
  return (
    <motion.header
      className="relative z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-4 border-black bg-primary shadow-comic">
            <span className="font-bold text-primary-foreground text-xl">C</span>
          </div>
          <span className="font-bold font-comic text-2xl text-foreground">{APP_NAME}</span>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="hidden items-center gap-8 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#features" className="font-comic font-medium text-foreground transition-colors hover:text-primary">
            Features
          </a>
          <a href="#examples" className="font-comic font-medium text-foreground transition-colors hover:text-primary">
            Examples
          </a>
          <a href="#pricing" className="font-comic font-medium text-foreground transition-colors hover:text-primary">
            Pricing
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button variant="ghost" className="hidden font-comic md:inline-flex">
            Sign In
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="btn-comic font-comic">Try Free</Button>
          </motion.div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;

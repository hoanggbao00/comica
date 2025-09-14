"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Heart, X, Zap } from "lucide-react";
import { motion } from "motion/react";

const Pricing = () => {
  function handleSubscribe() {
    const a = document.createElement("a");
    a.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    a.target = "_blank";
    a.click();
  }

  function onClickImage() {
    const a = document.createElement("a");
    a.href = "https://youtu.be/6vwFnKLamKY?si=Dq_cdvCalpvmIww2&t=10";
    a.target = "_blank";
    a.click();
  }

  return (
    <section className="relative overflow-hidden px-4 py-20" id="pricing">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 font-bold font-comic text-5xl text-comic-dark">Our "Totally Fair" Pricing</h2>
          <p className="font-comic text-comic-purple text-xl">
            We are absolutely FREE, until we make you so addicted that you'll happily throw money at us! 💸
          </p>
        </motion.div>

        <TooltipProvider>
          {/* Pricing Cards */}
          <div className="mb-12 grid h-full gap-8 md:grid-cols-3">
            {/* Free Plan */}
            <motion.div
              className="comic-card relative flex flex-col p-8 text-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="-top-4 -right-4 absolute flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-comic-green shadow-comic">
                <Heart className="h-6 w-6 text-black" />
              </div>
              <div>
                <div>
                  <h3 className="mb-4 font-bold font-comic text-2xl text-comic-dark">Free Forever*</h3>
                  <div className="mb-2 font-bold font-comic text-5xl text-comic-blue">$0</div>
                  <p className="mb-6 text-comic-purple text-sm">*conditions may apply 😉</p>
                </div>

                <div>
                  <ul className="mb-8 space-y-3 text-left">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-comic-green" />
                      <span className="font-comic">3 Comics per day</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-comic-green" />
                      <span className="font-comic">Basic templates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <X className="h-5 w-5 text-comic-red" />
                      <span className="font-comic text-gray-500">No watermark (coming soon™)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="btn-comic mt-auto w-full" onClick={handleSubscribe}>
                    Start Creating!
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-center">
                  Click meee <br />
                  (▰˘◡˘▰)
                </TooltipContent>
              </Tooltip>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              className="comic-card relative border-4 border-comic-yellow bg-gradient-to-b from-comic-yellow/20 to-white p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -1 }}
            >
              <div className="-top-4 -left-4 -rotate-12 absolute transform rounded-xl border-4 border-black bg-comic-red px-4 py-2 shadow-comic">
                <span className="font-bold font-comic text-sm text-white">POPULAR!</span>
              </div>
              <div className="-top-4 -right-4 absolute flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-comic-yellow shadow-comic">
                <Zap className="h-6 w-6 text-black" />
              </div>

              <h3 className="mb-4 font-bold font-comic text-2xl text-comic-dark">Pro Creator</h3>
              <div className="mb-2 font-bold font-comic text-5xl text-comic-blue">Your Salary</div>
              <p className="mb-6 text-comic-purple text-sm">per month (you'll love it!)</p>

              <ul className="mb-8 space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-comic-green" />
                  <span className="font-comic">Unlimited comics</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-comic-green" />
                  <span className="font-comic">Premium templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-comic-green" />
                  <span className="font-comic">No watermark</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-comic-green" />
                  <span className="font-comic">Priority support</span>
                </li>
              </ul>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button className="btn-hero w-full" onClick={handleSubscribe}>
                      Upgrade Now!
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="text-center">
                    Click meee <br />
                    (▰˘◡˘▰)
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              className="comic-card relative flex flex-col p-8 text-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="-top-4 -right-4 absolute flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-comic-purple shadow-comic">
                <span className="font-bold font-comic text-white text-xs">🏢</span>
              </div>
              <div>
                <h3 className="mb-4 font-bold font-comic text-2xl text-comic-dark">Enterprise</h3>
                <div className="mb-2 font-bold font-comic text-5xl text-comic-purple">💰💰💰</div>
                <p className="mb-6 text-comic-purple text-sm">Call us (we need the money!)</p>

                <ul className="mb-8 space-y-3 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-comic-green" />
                    <span className="font-comic">Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-comic-green" />
                    <span className="font-comic">Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-comic-green" />
                    <span className="font-comic">24/7 Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-comic-green" />
                    <span className="font-comic">Our eternal gratitude</span>
                  </li>
                </ul>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      className="mt-auto w-full border-4 border-black font-bold font-comic hover:bg-comic-purple hover:text-white"
                      onClick={handleSubscribe}
                    >
                      Contact Sales
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="text-center">
                    Gimme your money <br />
                    (▰˘◡˘▰)
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>

          {/* Fun disclaimer with anime character */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border-4 border-black bg-gradient-to-r from-comic-yellow/30 to-comic-orange/30 p-8 text-center shadow-comic-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Cute anime character */}
            <motion.div
              className="-translate-y-1/2 absolute top-1/2 right-8 transform"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <img
                    src="/images/cute-anime-character.png"
                    alt="Cute anime character"
                    className="h-24 w-24 cursor-pointer object-contain"
                    onClick={onClickImage}
                  />
                </TooltipTrigger>
                <TooltipContent className="text-center">
                  Haiya <br />
                  (¬_¬")
                </TooltipContent>
              </Tooltip>
            </motion.div>

            <div className="max-w-2xl">
              <h3 className="mb-4 font-bold font-comic text-2xl text-comic-dark">
                Fine Print (That We Actually Want You to Read!)
              </h3>
              <p className="font-comic text-comic-purple text-lg leading-relaxed">
                We're so confident you'll love creating comics with our AI that we're betting you'll want to upgrade.
                But hey, if you're happy with the free plan forever, we're cool with that too!
                <span className="font-bold text-comic-red"> We just want to see your amazing creations! ✨</span>
              </p>
            </div>
          </motion.div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default Pricing;

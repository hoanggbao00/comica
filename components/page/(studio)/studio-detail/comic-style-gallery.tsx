import { useComicContext } from "@/components/providers/detail-context";
import { Badge } from "@/components/ui/badge";
import { comicStyles } from "@/lib/mock-comic-style";
import { motion } from "motion/react";
import type React from "react";

const GalleryCarousel: React.FC = () => {
  const { selectedStyleIndex, setSelectedStyleIndex } = useComicContext();

  // Handle infinite loop
  const getItemIndex = (index: number) => {
    return ((index % comicStyles.length) + comicStyles.length) % comicStyles.length;
  };

  const getVisibleItems = () => {
    // Create a continuous array of all items repeated to ensure smooth infinite scrolling
    const extendedItems = [];

    // Add enough items before and after to handle infinite scrolling
    for (let i = -10; i <= 10; i++) {
      const itemIndex = getItemIndex(selectedStyleIndex + i);

      extendedItems.push({
        ...comicStyles[itemIndex],
        position: i,
        isCenter: i === 0,
        uniqueKey: `${comicStyles[itemIndex].id}-${Math.floor((selectedStyleIndex + i) / comicStyles.length)}`, // Stable key for infinite scroll
      });
    }

    // Filter to only show visible items
    return extendedItems.filter((item) => Math.abs(item.position) <= 2);
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="w-full max-w-7xl py-4">
      {/* Main Carousel Container */}
      <div className="relative flex items-center justify-center">
        {/* Cards Container */}
        <div className="relative h-[400px] w-full max-w-6xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {visibleItems.map((item) => {
              const { position, isCenter } = item;
              const baseOffset = position * 280; // Base spacing between cards

              return (
                <motion.div
                  key={item.uniqueKey} // Use the stable unique key
                  className={`absolute cursor-pointer ${isCenter ? "z-20" : "z-10"}`}
                  animate={{
                    x: baseOffset,
                    scale: isCenter ? 1.1 : 0.85,
                    opacity: Math.abs(position) <= 2 ? 1 : 0.3,
                    zIndex: isCenter ? 20 : 10 - Math.abs(position),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    duration: 0.6,
                  }}
                  whileHover={{
                    scale: isCenter ? 1.15 : 0.9,
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setSelectedStyleIndex(selectedStyleIndex + position);
                    }
                  }}
                >
                  <div
                    className={`relative h-80 w-80 overflow-hidden rounded-2xl border border-gallery-border bg-background shadow-lg transition-all duration-300 hover:shadow-xl ${isCenter ? "shadow-2xl ring-2 ring-primary/20" : ""}
                    `}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {isCenter && (
                        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">SELECTED</Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="mb-2 font-bold text-foreground text-xl">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>

                    {/* Glassmorphism overlay for non-center items */}
                    {!isCenter && <div className="glass-bg absolute inset-0 backdrop-blur-[2px]" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="mt-8 flex justify-center space-x-2">
        {comicStyles.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedStyleIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-200 ${
              getItemIndex(selectedStyleIndex) === index
                ? "scale-125 bg-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;

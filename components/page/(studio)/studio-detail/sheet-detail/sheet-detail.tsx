"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { comicStyles } from "@/lib/mock-comic-style";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, Loader2Icon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GalleryCarousel from "./comic-style-gallery";

export default function SheetDetail() {
  const { selectedStyleIndex, setSelectedStyleIndex, storyText } = useComicContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePrevStyle = () => {
    setSelectedStyleIndex(selectedStyleIndex === 0 ? comicStyles.length - 1 : selectedStyleIndex - 1);
  };

  const handleNextStyle = () => {
    setSelectedStyleIndex(selectedStyleIndex === comicStyles.length - 1 ? 0 : selectedStyleIndex + 1);
  };

  async function onSubmit() {
    if (!storyText.trim()) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTimeout(() => {
        router.push("/studio/2");
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SheetContent side="bottom" hideClose className="max-h-[80svh] rounded-t-3xl border-0">
      <SheetHeader className="relative pt-8">
        <SheetClose className="-top-12 absolute right-2 grid size-8 place-items-center rounded-full bg-background">
          <XIcon size={24} />
        </SheetClose>
        <SheetTitle className="text-center font-bold text-4xl">Select Style</SheetTitle>
      </SheetHeader>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Button
          onClick={handlePrevStyle}
          className="-translate-y-1/2 absolute top-1/2 left-4 z-20 transform border-4 border-black bg-comic-yellow font-bold text-black shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-orange hover:shadow-comic-lg active:scale-95"
          size="icon"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>

        <GalleryCarousel />

        <Button
          onClick={handleNextStyle}
          className="-translate-y-1/2 absolute top-1/2 right-4 z-22 transform border-4 border-black bg-comic-yellow font-bold text-black shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-orange hover:shadow-comic-lg active:scale-95"
          size="icon"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>
      <SheetFooter className="pt-6">
        <Button
          className="mx-auto w-fit transform rounded-2xl border-4 border-black bg-comic-blue px-12 py-4 font-bold text-lg text-white shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-purple hover:shadow-comic-lg active:scale-95"
          size="lg"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading && <Loader2Icon className="animate-spin" />}
          {isLoading ? "Submitting" : "Next"}
          {!isLoading && <ArrowRightIcon />}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}

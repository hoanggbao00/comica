"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { comicStyles } from "@/lib/mock-comic-style";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, Loader2Icon, XIcon } from "lucide-react";
import GalleryCarousel from "./comic-style-gallery";
import OverviewDialog from "./overview-dialog";

export default function SheetDetail() {
  const { selectedStyleIndex, setSelectedStyleIndex, storyText, isCreating, setIsCreating, setIsCreateSuccess } =
    useComicContext();

  const handlePrevStyle = () => {
    setSelectedStyleIndex(selectedStyleIndex === 0 ? comicStyles.length - 1 : selectedStyleIndex - 1);
  };

  const handleNextStyle = () => {
    setSelectedStyleIndex(selectedStyleIndex === comicStyles.length - 1 ? 0 : selectedStyleIndex + 1);
  };

  async function onSubmit() {
    if (!storyText.trim()) return;
    setIsCreating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsCreateSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
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
            className="-translate-y-1/2 absolute top-1/2 left-4 z-22 transform border-4 border-black bg-comic-yellow font-bold text-black shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-orange hover:shadow-comic-lg active:scale-95"
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
            disabled={isCreating}
          >
            {isCreating && <Loader2Icon className="animate-spin" />}
            Create Comic
            {!isCreating && <ArrowRightIcon />}
          </Button>
        </SheetFooter>
        {isCreating && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="rounded-2xl border-4 border-black bg-white p-8 text-center shadow-comic">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-comic-blue border-t-transparent" />
              <div className="font-bold text-black text-xl">Creating Your Comic...</div>
              <div className="text-muted-foreground">This may take a moment</div>
            </div>
          </div>
        )}
        <OverviewDialog />
      </SheetContent>
    </>
  );
}

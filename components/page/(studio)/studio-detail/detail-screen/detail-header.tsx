"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Button } from "@/components/ui/button";
import { chapters } from "@/lib/mock-chapter";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { startTransition } from "react";

export default function DetailHeader() {
  const { currentChapterData, hasPrevious, hasNext, setCurrentChapterId, currentChapterIndex } = useComicContext();

  const handlePreviousChapter = () => {
    if (hasPrevious) {
      startTransition(() => setCurrentChapterId(chapters[currentChapterIndex - 1].id));
    }
  };

  const handleNextChapter = () => {
    if (hasNext) {
      startTransition(() => setCurrentChapterId(chapters[currentChapterIndex + 1].id));
    }
  };

  return (
    <header className="sticky top-0 z-50 border-black border-b-4 bg-card p-4 py-2 font-comic">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousChapter}
          disabled={!hasPrevious}
          className="btn-comic bg-comic-yellow px-2 hover:bg-comic-pink"
        >
          <ChevronLeftIcon className="size-4" />
          <span className="hidden md:inline">Previous</span>
        </Button>

        <p className="line-clamp-2 flex-1 text-center font-black">{currentChapterData?.title}</p>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextChapter}
          disabled={!hasNext}
          className="btn-comic bg-comic-yellow px-2 hover:bg-comic-pink"
        >
          <span className="hidden md:inline">Next</span>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </header>
  );
}

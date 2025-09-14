"use client";

import { Button } from "@/components/ui/button";
import type { ComicPlanResponseData } from "@/types/plan";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  currentChapterData?: ComicPlanResponseData["data"]["plan"]["page_plan"][number] | null;
  hasPrevious: boolean;
  hasNext: boolean;

  handleNext: () => void;
  handlePrevious: () => void;
}

export default function DetailHeader({
  currentChapterData,
  hasPrevious,
  hasNext,

  handleNext,
  handlePrevious,
}: Props) {
  return (
    <header className="sticky top-0 z-50 border-black border-b-4 bg-card p-4 py-2">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className="btn-comic bg-comic-yellow px-2 font-comic hover:bg-comic-pink"
        >
          <ChevronLeftIcon className="size-4" />
          <span className="hidden md:inline">Previous</span>
        </Button>

        <p
          className="line-clamp-2 flex-1 text-center font-black"
          style={{ fontFamily: "Comic Sans MS, Comic Sans, cursive" }}
        >
          Chapter {currentChapterData?.page_number}: {currentChapterData?.goal}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!hasNext}
          className="btn-comic bg-comic-yellow px-2 font-comic hover:bg-comic-pink"
        >
          <span className="hidden md:inline">Next</span>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </header>
  );
}

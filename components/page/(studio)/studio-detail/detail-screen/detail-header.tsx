"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { chapters } from "@/lib/mock-chapter";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  idMain: string;
}

export default function DetailHeader({ idMain }: Props) {
  const { currentChapterId, hasPrevious, hasNext, setCurrentChapterId, currentChapterIndex } = useComicContext();

  const handlePreviousChapter = () => {
    if (hasPrevious) {
      setCurrentChapterId(chapters[currentChapterIndex - 1].id);
    }
  };

  const handleNextChapter = () => {
    if (hasNext) {
      setCurrentChapterId(chapters[currentChapterIndex + 1].id);
    }
  };

  function scrollToTop() {
    document.getElementById(idMain)?.parentElement?.scrollTo({ behavior: "smooth", top: 0 });
  }

  return (
    <header className="sticky top-0 z-50 border-black border-b-4 bg-card p-4 font-comic">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousChapter}
          disabled={!hasPrevious}
          className="btn-comic"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <div className="max-w-xs flex-1">
          <Select
            value={currentChapterId}
            onValueChange={(v) => {
              setCurrentChapterId(v);
              setTimeout(() => {
                scrollToTop();
              }, 0);
            }}
          >
            <SelectTrigger className="btn-comic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" onClick={handleNextChapter} disabled={!hasNext} className="btn-comic">
          Next
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon, ZapIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  idMain: string;
}

export default function DetailFooter({ idMain }: Props) {
  const { isGenerating, setIsGenerating } = useComicContext();
  const mainSection = useRef<HTMLElement | null>(null);

  function scrollToTop() {
    if (mainSection.current) {
      mainSection.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function scrollToBottom() {
    if (mainSection.current) {
      mainSection.current.scrollTo({
        top: mainSection.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function generateNextChapter() {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      scrollToTop();
    }, 2000);
  }

  useEffect(() => {
    if (!mainSection.current) {
      const parentEle = document.getElementById(idMain)?.parentElement;
      mainSection.current = parentEle as HTMLElement;
    }
  }, [idMain]);

  return (
    <footer className="sticky bottom-0 border-black border-t-4 bg-card p-4 shadow-comic-lg">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={scrollToTop} className="btn-comic bg-comic-yellow/70">
            <ChevronUpIcon className="h-4 w-4" />
            Top
          </Button>
          <Button variant="outline" size="sm" onClick={scrollToBottom} className="btn-comic bg-comic-yellow/70">
            <ChevronDownIcon className="h-4 w-4" />
            Bottom
          </Button>
        </div>

        <Button
          onClick={generateNextChapter}
          disabled={isGenerating}
          className="btn-comic bg-comic-yellow font-comic text-black hover:bg-comic-pink"
        >
          {isGenerating ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ZapIcon className="mr-2 h-4 w-4" />
              Generate Next Chapter
            </>
          )}
        </Button>
      </div>
    </footer>
  );
}

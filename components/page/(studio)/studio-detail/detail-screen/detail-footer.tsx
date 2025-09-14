"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDownIcon, ChevronUpIcon, ZapIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  idMain: string;
}

export default function DetailFooter({ idMain }: Props) {
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

  useEffect(() => {
    if (!mainSection.current) {
      const parentEle = document.getElementById(idMain)?.parentElement;
      mainSection.current = parentEle as HTMLElement;
    }
  }, [idMain]);

  return (
    <footer className="sticky bottom-0 border-black border-t-4 bg-card p-2 shadow-comic-lg md:p-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-2 md:flex-row">
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

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="btn-comic !bg-comic-yellow !scale-100 font-comic text-black opacity-50">
                <ZapIcon className="mr-2 h-4 w-4" />
                Generate Next Chapter
              </Button>
            </TooltipTrigger>
            <TooltipContent>Coming soon</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
}

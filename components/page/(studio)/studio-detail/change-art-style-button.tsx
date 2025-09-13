"use client";

import { useComicContext } from "@/components/providers/detail-context";
import { SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Palette } from "lucide-react";

export default function ChangeArtStyleButton() {
  const { comicStyleSelected } = useComicContext();

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <SheetTrigger
          className="flex h-full items-center gap-2 border-r-2 px-2 font-comic hover:bg-comic-yellow"
          type="button"
        >
          <Palette className="size-5" />
          <div className="text-left">
            <div className="font-bold text-sm">{comicStyleSelected.title}</div>
            <div className="text-muted-foreground text-xs">Tap to change style</div>
          </div>
        </SheetTrigger>
      </TooltipTrigger>
      <TooltipContent>Tap to change art style</TooltipContent>
    </Tooltip>
  );
}

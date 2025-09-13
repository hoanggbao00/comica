"use client";

import { useComicContext } from "@/components/providers/detail-context";
import { SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

interface Props {
  id: string;
}

export default function ChangeArtStyleButton(props: Props) {
  const { comicStyleSelected } = useComicContext();

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <SheetTrigger
          className={cn(
            "flex h-full items-center gap-2 border-r-2 px-2 font-comic",
            props.id === "new-comic" ? "hover:bg-comic-yellow" : "cursor-default",
          )}
        >
          <Palette className="size-5" />
          <div className="text-left">
            <div className="font-bold text-sm">{comicStyleSelected.title}</div>
            {props.id === "new-comic" && <div className="text-muted-foreground text-xs">Tap to change style</div>}
          </div>
        </SheetTrigger>
      </TooltipTrigger>
      {props.id === "new-comic" && <TooltipContent>Tap to change art style</TooltipContent>}
    </Tooltip>
  );
}

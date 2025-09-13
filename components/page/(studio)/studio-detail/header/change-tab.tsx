"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ChangeTabHeader() {
  const { tabActive, setTabActive } = useComicContext();

  return (
    <div
      className={cn(
        "-translate-x-1/2 absolute left-1/2 flex h-full items-center gap-2 py-2.5 font-geist font-medium",
        " [&_button[data-active]]:text-black [&_button]:text-muted-foreground [&_button]:transition-colors [&_button]:hover:text-black",
      )}
    >
      <button type="button" data-active={tabActive === "story" ? "" : undefined} onClick={() => setTabActive("story")}>
        Story
      </button>
      <Separator orientation="vertical" className="rounded-full bg-gray-500" />
      <button
        type="button"
        data-active={tabActive === "preview" ? "" : undefined}
        onClick={() => setTabActive("preview")}
      >
        Preview
      </button>
    </div>
  );
}

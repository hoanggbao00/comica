"use client";

import { Card } from "@/components/ui/card";
import type { IComicPanel } from "@/lib/mock-chapter";

export const ComicPanel = ({ panel, index }: { panel: IComicPanel; index: number }) => {
  return (
    <Card className="!shadow-comic-lg min-h-96 overflow-hidden rounded-2xl border-4 border-black">
      <div className="relative">
        <img
          src={panel.imageUrl}
          alt={`Comic panel ${index + 1}`}
          className={"h-auto w-full transition-opacity duration-300"}
          loading="lazy"
        />
      </div>
    </Card>
  );
};

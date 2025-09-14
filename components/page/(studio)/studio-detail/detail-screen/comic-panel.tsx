"use client";

import { Card } from "@/components/ui/card";

export const ComicPanel = ({ base64, index }: { base64: string; index: number }) => {
  return (
    <Card className="!shadow-comic-lg overflow-hidden rounded-2xl border-4 border-black">
      <div className="relative">
        <img
          src={`data:image/png;base64,${base64}`}
          alt={`Comic panel ${index + 1}`}
          className={"h-auto w-full transition-opacity duration-300"}
          loading="lazy"
        />
      </div>
    </Card>
  );
};

"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { LoadingPanel } from "./loading-panel";

export default function GeneratingMoreState() {
  const { isGenerating } = useComicContext();

  if (!isGenerating) return null;

  return (
    <>
      <LoadingPanel />
      <LoadingPanel />
      <LoadingPanel />
    </>
  );
}

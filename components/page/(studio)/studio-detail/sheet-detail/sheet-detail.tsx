"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDifyWorkflow } from "@/hooks/useDify";
import { DifyEnpoint } from "@/lib/dify/cosnt";
import { comicStyles } from "@/lib/mock-comic-style";
import { useGetDetailWorkflow } from "@/queries/detail";
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon, XCircleIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import GalleryCarousel from "./comic-style-gallery";
import OverviewDialog from "./overview-dialog";

export default function SheetDetail() {
  const { selectedStyleIndex, setSelectedStyleIndex, storyText, comicStyleSelected } = useComicContext();
  const [workflowId, setWorkflowId] = useState("");
  const { runWorkflow, streamMessages, isStreaming } = useDifyWorkflow();
  const [isEnabled, setIsEnabled] = useState(true);
  const [isOverviewDialogOpen, setIsOverviewDialogOpen] = useState(false);

  const { data: workflowDetail, isLoading } = useGetDetailWorkflow(workflowId, isEnabled);

  const isRunning = workflowDetail?.status === "running";
  const isSucceed = workflowDetail?.status === "succeeded";
  const isFailed = workflowDetail?.status === "failed";
  const overviewData = isSucceed ? JSON.parse(workflowDetail?.outputs) : null;

  const isDisabled = isStreaming || isLoading || isRunning;

  const handlePrevStyle = () => {
    setSelectedStyleIndex(selectedStyleIndex === 0 ? comicStyles.length - 1 : selectedStyleIndex - 1);
  };

  const handleNextStyle = () => {
    setSelectedStyleIndex(selectedStyleIndex === comicStyles.length - 1 ? 0 : selectedStyleIndex + 1);
  };

  async function onSubmit() {
    if (!storyText.trim()) return;
    const comic_style = comicStyleSelected.name;
    const user_prompt = storyText.trim();
    const language = "follow user_prompt";

    if (isStreaming || !comic_style || !user_prompt) return;

    runWorkflow(DifyEnpoint.CreateOverview, { user_prompt, comic_style, language }, "streaming", "abc-123", true);
  }

  useEffect(() => {
    if (isDisabled || isFailed) {
      setIsOverviewDialogOpen(true);
    }
  }, [isDisabled, isFailed]);

  useEffect(() => {
    if (streamMessages.length === 0) return;

    const firstMessage = streamMessages[0];
    if (firstMessage) {
      setWorkflowId(firstMessage as unknown as string);
    }
  }, [streamMessages]);

  useEffect(() => {
    if (overviewData) {
      setIsEnabled(false);
    }
  }, [overviewData]);

  return (
    <>
      <SheetContent side="bottom" hideClose className="max-h-[80svh] rounded-t-3xl border-0">
        <SheetHeader className="relative pt-8">
          <SheetClose className="-top-12 absolute right-2 grid size-8 place-items-center rounded-full bg-background">
            <XIcon size={24} />
          </SheetClose>
          <SheetTitle className="text-center font-bold text-4xl">Select Style</SheetTitle>
        </SheetHeader>
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          <Button
            onClick={handlePrevStyle}
            className="-translate-y-1/2 absolute top-1/2 left-4 z-22 transform border-4 border-black bg-comic-yellow font-bold text-black shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-orange hover:shadow-comic-lg active:scale-95"
            size="icon"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>

          <GalleryCarousel />

          <Button
            onClick={handleNextStyle}
            className="-translate-y-1/2 absolute top-1/2 right-4 z-22 transform border-4 border-black bg-comic-yellow font-bold text-black shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-orange hover:shadow-comic-lg active:scale-95"
            size="icon"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </div>
        <SheetFooter className="pt-6">
          <Button
            className="mx-auto w-fit transform rounded-2xl border-4 border-black bg-comic-blue px-12 py-4 font-bold text-lg text-white shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-purple hover:shadow-comic-lg active:scale-95"
            size="lg"
            onClick={onSubmit}
            disabled={isDisabled}
          >
            {isDisabled && <Loader2Icon className="animate-spin" />}
            Create Comic
          </Button>
        </SheetFooter>

        {isOverviewDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-white p-8 text-center shadow-comic">
              {isFailed && <XCircleIcon className="text-red-500" size={36} />}
              {isDisabled && <Loader2Icon className="animate-spin" size={36} />}

              <p className="font-bold text-black text-xl">
                {isFailed ? "Failed to Create Comic" : "Creating Your Comic..."}
                <p className="text-base text-muted-foreground">
                  {isFailed ? "We're sorry, something went wrong." : "This may take a moment"}
                </p>
              </p>
              {isFailed && (
                <Button className="btn-comic mt-4 bg-comic-orange" onClick={() => setIsOverviewDialogOpen(false)}>
                  Close
                </Button>
              )}
            </div>
          </div>
        )}
        {overviewData && <OverviewDialog workflowId={workflowId} overviewData={overviewData} />}
      </SheetContent>
    </>
  );
}

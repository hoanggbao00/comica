"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { useGetDetailWorkflow } from "@/queries/detail";
import { useGetImage } from "@/queries/get-image";
import { useComicsStore } from "@/stores/recent-store";
import type { ComicPlanResponseData } from "@/types/plan";
import { useEffect, useState } from "react";
import NewScreen from "../new-screen";
import OverviewDialog from "../sheet-detail/overview-dialog";
import { ComicPanel } from "./comic-panel";
import DetailFooter from "./detail-footer";
import DetailHeader from "./detail-header";
import { ErrorPanel } from "./error-panel";
import GeneratingMoreState from "./generating-more-state";
import { LoadingPanel } from "./loading-panel";

interface Props {
  id: string;
}

export default function DetailScreen(props: Props) {
  const { id } = props;
  const { setStoryText, listStyles, setSelectedStyleIndex, tabActive } = useComicContext();
  const { updateRecentComic } = useComicsStore();
  const idMain = "reader-content";
  const [isEnabled, setIsEnabled] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const { data: detailWorkflow } = useGetDetailWorkflow(id, isEnabled);
  const isSucceed = detailWorkflow?.status === "succeeded";
  const isRunning = detailWorkflow?.status === "running";
  const isFailed = detailWorkflow?.status === "failed";
  const overviewData = isSucceed ? (JSON.parse(detailWorkflow?.outputs) as ComicPlanResponseData) : null;

  const {
    data: dataImage,
    isLoading: isLoadingImage,
    isError,
    refetch,
  } = useGetImage(id, overviewData ? JSON.stringify(overviewData.data) : undefined);

  const currentChapterData = overviewData?.data?.plan.page_plan[currentChapterIndex];

  const hasPrevious = !isLoadingImage && currentChapterIndex > 0;
  const hasNext =
    !isLoadingImage &&
    !!overviewData?.data &&
    currentChapterIndex < overviewData?.data?.plan.page_plan.length - 1 &&
    false;

  function handleNext() {
    if (hasNext) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  }

  function handlePrevious() {
    if (hasPrevious) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  }

  useEffect(() => {
    if (isSucceed || isFailed) {
      setIsEnabled(false);
    }
  }, [isSucceed, isFailed]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (dataImage && id !== "new-comic") {
      updateRecentComic(id, {
        thumbnailBase64: dataImage?.data?.base64Images[0],
      });
    }
  }, [dataImage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (detailWorkflow?.status === "succeeded") {
      try {
        const parsedInputs = JSON.parse(detailWorkflow?.inputs) as { comic_style: string; user_prompt: string };
        if (parsedInputs.user_prompt) {
          setStoryText(parsedInputs.user_prompt);
        }
        if (parsedInputs.comic_style && listStyles.length) {
          const foundIndex = listStyles.findIndex(
            (v) => v.name.toLowerCase() === parsedInputs.comic_style.toLowerCase(),
          );
          if (foundIndex !== -1) {
            setSelectedStyleIndex(foundIndex);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [detailWorkflow, listStyles, setStoryText]);

  if (tabActive === "story") return <NewScreen detailWorkflow={detailWorkflow} />;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto">
      <DetailHeader
        currentChapterData={currentChapterData}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <main id={idMain} className="flex-1 px-4 py-8">
        {isSucceed && (
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-bold text-4xl" style={{ fontFamily: "Comic Sans MS, Comic Sans, cursive" }}>
                {currentChapterData?.goal || "Loading..."}
              </h1>
              <div className="mx-auto h-1 w-32 rounded-full bg-primary shadow-comic" />
            </div>

            {isLoadingImage && (
              <div className="space-y-4">
                <LoadingPanel />
                <LoadingPanel />
                <LoadingPanel />
              </div>
            )}

            {!isLoadingImage && isError && <ErrorPanel retry={refetch} isLoading={isLoadingImage} />}

            {!isLoadingImage &&
              dataImage &&
              !isError &&
              dataImage?.data?.base64Images.map((base64, index) => (
                <ComicPanel key={index} base64={base64} index={index} />
              ))}
            <GeneratingMoreState />
          </div>
        )}
      </main>
      <DetailFooter idMain={idMain} />

      {isRunning && overviewData && <OverviewDialog workflowId={id} overviewData={overviewData} />}
    </div>
  );
}

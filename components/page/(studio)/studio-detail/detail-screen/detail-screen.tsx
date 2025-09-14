"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { useGetDetailWorkflow } from "@/queries/detail";
import { useEffect, useState } from "react";
import NewScreen from "../new-screen";
import OverviewDialog from "../sheet-detail/overview-dialog";
import { ComicPanel } from "./comic-panel";
import DetailFooter from "./detail-footer";
import DetailHeader from "./detail-header";
import GeneratingMoreState from "./generating-more-state";

interface Props {
  id: string;
}

export default function DetailScreen(props: Props) {
  const { tabActive } = useComicContext();
  const { id } = props;
  const { currentChapterData, setStoryText, listStyles, setSelectedStyleIndex } = useComicContext();
  const idMain = "reader-content";
  const [isEnabled, setIsEnabled] = useState(true);
  const { data: detailWorkflow } = useGetDetailWorkflow(id, isEnabled);

  const isSucceed = detailWorkflow?.status === "succeeded";
  const isRunning = detailWorkflow?.status === "running";
  const overviewData = isSucceed && JSON.parse(detailWorkflow?.outputs);

  useEffect(() => {
    if (isSucceed) {
      setIsEnabled(false);
    }
  }, [isSucceed]);

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
    <div className="h-full min-h-0 flex-1 overflow-y-auto">
      <DetailHeader />
      <main id={idMain} className="flex-1 px-4 py-8">
        {isSucceed && (
          <div className="mx-auto max-w-4xl space-y-8 font-comic">
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-bold text-4xl">{currentChapterData?.title || "Loading..."}</h1>
              <div className="mx-auto h-1 w-32 rounded-full bg-primary shadow-comic" />
            </div>
            {currentChapterData?.panels.map((panel, index) => (
              <ComicPanel key={panel.id} panel={panel} index={index} />
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

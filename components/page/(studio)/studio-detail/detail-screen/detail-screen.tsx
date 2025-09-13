"use client";
import { useComicContext } from "@/components/providers/comic-context";
import { ComicPanel } from "./comic-panel";
import DetailFooter from "./detail-footer";
import DetailHeader from "./detail-header";
import GeneratingMoreState from "./generating-more-state";

interface Props {
  id: string;
}

export default function DetailScreen(props: Props) {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { id } = props;
  const { currentChapterData } = useComicContext();
  const idMain = "reader-content";

  return (
    <div className="h-full min-h-0 flex-1 overflow-y-auto">
      <DetailHeader idMain={idMain} />
      <main id={idMain} className="flex-1 px-4 py-8">
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
      </main>
      <DetailFooter idMain={idMain} />
    </div>
  );
}

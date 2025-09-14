"use client";

import { useGetDetailWorkflow } from "@/queries/detail";
import type { WorkflowOutputParsed } from "@/types/plan";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}

export default function HeaderTaskDetail(props: Props) {
  const [isEnabled, setIsEnabled] = useState(true);
  const { data: detailWorkflow } = useGetDetailWorkflow(props.id, isEnabled);

  const isSucceed = detailWorkflow?.status === "succeeded";
  const overviewData = isSucceed ? (JSON.parse(detailWorkflow?.outputs) as WorkflowOutputParsed) : null;

  useEffect(() => {
    if (isSucceed) {
      setIsEnabled(false);
    }
  }, [isSucceed]);

  return (
    <div className="flex h-full items-center gap-2 border-r-2 px-2 font-comic">
      <div className="text-left">
        <div className="max-w-[200px] truncate font-bold text-sm">
          {!overviewData?.data.title ? "New Comic" : overviewData.data.title}
        </div>
        <div className="text-muted-foreground text-xs">{overviewData?.data.characters.length || 0} Chapters</div>
      </div>
    </div>
  );
}

import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ChangeArtStyleButton from "./change-art-style-button";
import ChangeTabHeader from "./change-tab";
import HeaderTaskDetail from "./header-task-detail";

interface Props {
  id: string;
}

export default function StudioDetailHeader(props: Props) {
  return (
    <TooltipProvider>
      <header className="relative flex h-11 items-center border-black border-b-4">
        <Link
          href="/studio"
          className="flex h-full items-center gap-1 border-r-2 px-2 py-1.5 pr-2.5 font-comic transition-colors hover:bg-comic-yellow/50"
        >
          <ArrowLeft size={20} />
        </Link>
        <HeaderTaskDetail id={props.id} />
        <ChangeArtStyleButton id={props.id} />
        {props.id !== "new-comic" && <ChangeTabHeader />}
      </header>
    </TooltipProvider>
  );
}

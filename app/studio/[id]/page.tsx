import type { PageProps } from "@/.next/types/app/studio/[id]/page";
import ChangeArtStyleButton from "@/components/page/(studio)/studio-detail/change-art-style-button";
import HeaderTaskDetail from "@/components/page/(studio)/studio-detail/header-task-detail";
import NewScreen from "@/components/page/(studio)/studio-detail/new-screen";
import { ComicProvider } from "@/components/providers/detail-context";
import { Sheet } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const SheetDetail = dynamic(() => import("@/components/page/(studio)/studio-detail/sheet-detail"));

export default async function DetailStudio(props: PageProps) {
  // 'new-comic' or id of existing comic
  const id = (await props.params).id;

  return (
    <Sheet>
      <ComicProvider>
        <div className="flex h-screen min-h-screen flex-col overflow-hidden">
          <TooltipProvider>
            <header className="flex h-11 items-center border-black border-b-4">
              <Link
                href="/studio"
                className="flex h-full items-center gap-1 border-r-2 px-2 py-1.5 pr-2.5 font-comic transition-colors hover:bg-comic-yellow/50"
              >
                <ArrowLeft size={20} />
              </Link>
              <HeaderTaskDetail id={id} />
              <ChangeArtStyleButton />
            </header>
          </TooltipProvider>
          {id === "new-comic" && <NewScreen />}
        </div>
        <SheetDetail />
      </ComicProvider>
    </Sheet>
  );
}

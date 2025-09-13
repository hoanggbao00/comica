import StudioDetailHeader from "@/components/page/(studio)/studio-detail/header/studio-detail-header";
import NewScreen from "@/components/page/(studio)/studio-detail/new-screen";
import { ComicProvider } from "@/components/providers/detail-context";
import { Sheet } from "@/components/ui/sheet";
import dynamic from "next/dynamic";

const SheetDetail = dynamic(() => import("@/components/page/(studio)/studio-detail/sheet-detail"));

export default async function StudioNewComic() {
  return (
    <ComicProvider>
      <Sheet>
        <div className="flex h-screen min-h-screen flex-col overflow-hidden">
          <StudioDetailHeader id={"new-comic"} />
          <NewScreen />
        </div>
        <SheetDetail />
      </Sheet>
    </ComicProvider>
  );
}

import DetailScreen from "@/components/page/(studio)/studio-detail/detail-screen/detail-screen";
import StudioDetailHeader from "@/components/page/(studio)/studio-detail/header/studio-detail-header";
import { ComicProvider } from "@/components/providers/comic-context";
import { Sheet } from "@/components/ui/sheet";
import type { PageProps } from "@/types/page-props";

export default async function DetailStudio(props: PageProps) {
  const id = (await props.params).id;

  return (
    <Sheet>
      <ComicProvider>
        <div className="flex h-screen min-h-screen flex-col overflow-hidden">
          <StudioDetailHeader id={id} />
          <DetailScreen id={id} />
        </div>
      </ComicProvider>
    </Sheet>
  );
}

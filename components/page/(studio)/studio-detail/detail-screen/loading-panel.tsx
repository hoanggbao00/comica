import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon } from "lucide-react";

export const LoadingPanel = () => (
  <Card className="overflow-hidden rounded-2xl border-4 border-black shadow-comic-lg">
    <div className="relative">
      <Skeleton className="h-96 w-full rounded-none" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
        <div className="text-center">
          <Loader2Icon className="mx-auto mb-2 h-8 w-8 animate-spin" />
          <p className="font-bold text-sm">Generating panel...</p>
        </div>
      </div>
    </div>
  </Card>
);

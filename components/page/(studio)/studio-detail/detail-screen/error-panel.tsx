import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcwIcon, XCircleIcon } from "lucide-react";

export const ErrorPanel = ({ retry, isLoading }: { retry: () => void; isLoading: boolean }) => (
  <Card className="overflow-hidden rounded-2xl border-4 border-black shadow-comic-lg">
    <div className="relative">
      <Skeleton className="h-96 w-full rounded-none" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
        <div className="text-center">
          <XCircleIcon className="mx-auto mb-2 h-8 w-8 text-red-500" />
          <p className="font-bold text-sm">We got some error when generating image</p>
          <p className="text-sm">Please try again later</p>
          <Button
            size={"sm"}
            className="mt-2 border-2 transition-all hover:scale-105 hover:shadow-comic active:scale-95"
            onClick={retry}
            disabled={isLoading}
          >
            <RefreshCcwIcon />
            Retry
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

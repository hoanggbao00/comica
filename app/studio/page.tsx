import RecentlySection from "@/components/page/(studio)/studio-home/recently-section";
import SalesBanner from "@/components/page/(studio)/studio-home/sales-banner";
import TutorialsSection from "@/components/page/(studio)/studio-home/tutorial-section";
import AnimatedBackground from "@/components/page/landing-page/animated-background";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/og";
import { ArrowLeft, PlusIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio",
};

export default function StudioPage() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <header className="sticky top-0 right-0 left-0 z-10 mx-auto flex max-w-7xl items-center justify-between bg-background px-2 py-4 font-comic md:max-w-[1600px] md:bg-transparent">
        <Button
          asChild
          className="w-fit transform border-4 border-black bg-comic-yellow px-2 font-bold text-black shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-orange hover:shadow-comic-lg active:scale-95 md:px-4"
        >
          <Link href="/">
            <ArrowLeft className="size-5" />
            <span className="hidden md:inline">Back</span>
          </Link>
        </Button>
        <p className="font-bold text-3xl md:hidden">{APP_NAME}</p>
        <Button
          asChild
          className="w-fit transform border-4 border-black bg-comic-blue px-2 font-bold shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-orange hover:shadow-comic-lg active:scale-95"
        >
          <Link href="/studio/new-comic">
            <PlusIcon className="size-5" />
            <span className="hidden md:inline">Create New</span>
          </Link>
        </Button>
      </header>
      <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 pt-4">
        <SalesBanner />
        <div className="flex flex-col gap-12">
          <RecentlySection />
          <TutorialsSection />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { examplePlanResponse } from "@/lib/example-response-plan";
import { cn } from "@/lib/utils";
import { BookOpenIcon, FileTextIcon, LayersIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export default function OverviewDialog() {
  const { isCreateSuccess } = useComicContext();

  return (
    <Dialog open={isCreateSuccess}>
      <DialogContent
        className="flex h-[90vh] flex-col gap-0 overflow-hidden rounded-lg border-4 border-black p-0 shadow-comic sm:max-w-4xl"
        showCloseButton={false}
      >
        <DialogHeader className="flex-shrink-0 border-black border-b-2 bg-background p-6">
          <DialogTitle className="text-center font-bold font-comic text-2xl">📚 Comic Plan Overview</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex flex-1 flex-col gap-0 overflow-hidden">
          <TabsList
            className={cn(
              "mx-0 grid w-full flex-shrink-0 grid-cols-5 rounded-none border-black border-b-2 bg-comic-yellow/20 p-0",
              "[&_[data-slot=tabs-trigger]:hover]:bg-background/80 [&_[data-slot=tabs-trigger]]:rounded-none [&_[data-slot=tabs-trigger]]:shadow-none",
            )}
          >
            <TabsTrigger value="overview" className="font-bold">
              <FileTextIcon className="size-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="characters" className="font-bold">
              <UsersIcon className="size-4" />
              Characters
            </TabsTrigger>
            <TabsTrigger value="scenes" className="font-bold">
              <BookOpenIcon className="size-4" />
              Scenes
            </TabsTrigger>
            <TabsTrigger value="pages" className="font-bold">
              <LayersIcon className="size-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="panels" className="font-bold">
              <LayersIcon className="size-4" />
              Panels
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <TabsContent value="overview" className="mt-6 space-y-4">
              <div className="rounded-2xl border-4 border-black bg-comic-blue/10 p-6">
                <h3 className="mb-2 font-bold text-xl">{examplePlanResponse.chapter.title}</h3>
                <p className="mb-4 text-muted-foreground">{examplePlanResponse.chapter.summary}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border-2 border-black bg-white p-4">
                    <div className="font-bold text-comic-purple">Chapter Number</div>
                    <div className="font-black text-2xl">{examplePlanResponse.chapter.number}</div>
                  </div>
                  <div className="rounded-xl border-2 border-black bg-white p-4">
                    <div className="font-bold text-comic-purple">Total Pages</div>
                    <div className="font-black text-2xl">{examplePlanResponse.plan.fixed_pages}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="characters" className="mt-6 space-y-4">
              <div className="grid gap-4">
                {examplePlanResponse.plan.characters.map((character, index) => (
                  <div key={index} className="rounded-2xl border-4 border-black bg-white p-6 shadow-comic">
                    <div className="flex items-start gap-4">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-2 border-black bg-gradient-to-br from-comic-blue to-comic-purple">
                        <img src={character.image_url} alt={character.name} className="size-full" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl">{character.name}</h4>
                        <Badge className="mb-2 border-2 border-black bg-comic-green text-black">{character.role}</Badge>
                        <p className="mb-3 text-muted-foreground">{character.visual_notes}</p>
                        <div className="flex flex-wrap gap-2">
                          {character.traits.map((trait, traitIndex) => (
                            <Badge key={traitIndex} variant="outline" className="border-2 border-black">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-2">
                          {character.palette.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="h-6 w-6 rounded-full border-2 border-black"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scenes" className="mt-6 space-y-4">
              <div className="grid gap-4">
                {examplePlanResponse.chapter.scenes.map((scene, index) => (
                  <div key={scene.id} className="rounded-2xl border-4 border-black bg-white p-6 shadow-comic">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-comic-orange font-bold">
                        {index + 1}
                      </div>
                      <h4 className="font-bold text-lg">{scene.beat}</h4>
                    </div>
                    <p className="text-muted-foreground">{scene.details}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pages" className="mt-6 space-y-4">
              <div className="grid gap-4">
                {examplePlanResponse.page_plan.map((page, index) => (
                  <div key={index} className="rounded-2xl border-4 border-black bg-white p-6 shadow-comic">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-comic-purple font-bold text-white">
                        {page.page_number}
                      </div>
                      <h4 className="font-bold text-lg">Page {page.page_number}</h4>
                    </div>
                    <p className="mb-4 text-muted-foreground">{page.goal}</p>
                    <div className="space-y-2">
                      <div className="font-semibold text-comic-purple text-sm">Panels ({page.panels.length})</div>
                      <div className="grid gap-2">
                        {page.panels.map((panel, panelIndex) => (
                          <div key={panelIndex} className="rounded-xl border-2 border-black bg-comic-yellow/20 p-3">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="font-bold text-sm">Panel {panel.panel_number}:</span>
                              <span className="font-medium text-sm">{panel.beat}</span>
                            </div>
                            <p className="text-muted-foreground text-sm">{panel.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="panels" className="mt-6 space-y-4">
              <div className="grid gap-3">
                {examplePlanResponse.panels_flat.map((panel, index) => (
                  <>
                    <div key={index} className={cn("rounded-xl border-4 border-black bg-white p-4 shadow-comic")}>
                      <div className="mb-2 flex items-center gap-3">
                        <Badge className="border-2 border-black bg-comic-blue text-white">
                          Ch.{panel.chapter_number} P.{panel.page_number} Panel {panel.panel_number}
                        </Badge>
                        <span className="font-bold">{panel.beat}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{panel.details}</p>
                    </div>
                    {examplePlanResponse.panels_flat[index + 1]?.page_number &&
                      panel.page_number !== examplePlanResponse.panels_flat[index + 1]?.page_number && (
                        <Separator className="my-2" />
                      )}
                  </>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex-shrink-0 border-black border-t-2 bg-background p-6">
          <Button
            className="btn-comic w-full transform rounded-2xl border-4 border-black font-bold font-comic text-lg hover:bg-comic-pink active:scale-95"
            asChild
          >
            <Link href={"/studio/2"}>Next</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

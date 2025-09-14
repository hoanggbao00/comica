"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ComicPlanResponseData } from "@/types/plan";
import { BookOpenIcon, FileTextIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export default function OverviewDialog({
  workflowId,
  overviewData,
}: { workflowId: string; overviewData: ComicPlanResponseData }) {
  const data = overviewData?.data;

  return (
    <Dialog open={!!data}>
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col gap-0 overflow-hidden border-4 border-black p-0 shadow-comic">
        <DialogHeader className="flex-shrink-0 border-black border-b-2 bg-background p-6">
          <DialogTitle className="text-center font-black font-comic text-2xl">📚 Comic Plan Overview</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="mx-0 grid w-full flex-shrink-0 grid-cols-3 rounded-none border-black border-b-2 bg-comic-yellow/20 py-0">
            <TabsTrigger value="overview" className="font-bold">
              <FileTextIcon className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="characters" className="font-bold">
              <UsersIcon className="mr-2 h-4 w-4" />
              Characters
            </TabsTrigger>
            <TabsTrigger value="scenes" className="font-bold">
              <BookOpenIcon className="mr-2 h-4 w-4" />
              Scenes
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="rounded-2xl border-4 border-black bg-comic-blue/10 p-6">
                <h3 className="mb-2 font-bold text-xl">{data?.plan.chapter_title}</h3>
                <p className="mb-4 text-muted-foreground">{data?.plan.chapter_summary}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border-2 border-black bg-white p-4">
                    <div className="font-bold text-comic-purple">Total Characters</div>
                    <div className="font-black text-2xl">{data?.characters?.length}</div>
                  </div>
                  <div className="rounded-xl border-2 border-black bg-white p-4">
                    <div className="font-bold text-comic-purple">Total Chapters</div>
                    <div className="font-black text-2xl">{data?.plan.chapter_number}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="characters" className="space-y-4">
              <div className="grid gap-4">
                {data.characters.map((character, index) => (
                  <div key={index} className="rounded-2xl border-4 border-black bg-white p-6 shadow-comic">
                    <div className="flex items-start gap-4">
                      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-2 border-black bg-gradient-to-br from-comic-blue to-comic-purple">
                        <img src={character.image_url} alt={character.name} className="relative z-1 size-full" />
                        <span className="absolute inset-0 grid place-items-center font-bold text-white text-xl">
                          {character.name[0]}
                        </span>
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

            <TabsContent value="scenes" className="space-y-4">
              <Accordion type="multiple">
                <div className="space-y-6">
                  {data?.plan?.page_plan.map((chapter) => (
                    <AccordionItem
                      id={chapter.page_number.toString()}
                      key={chapter.page_number}
                      className="space-y-4"
                      value={chapter.page_number.toString()}
                    >
                      <AccordionTrigger className="items-center rounded-xl border-2 border-black bg-comic-purple/10 p-4">
                        <div>
                          <h3 className="font-bold text-lg">Chapter {chapter.page_number}</h3>
                          <p className="text-muted-foreground text-sm">{chapter.goal}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="grid gap-3">
                        {chapter.panels.map((panel, index) => (
                          <div
                            key={panel.scene_id}
                            className="rounded-2xl border-4 border-black bg-white p-4 shadow-comic"
                          >
                            <div className="mb-3 flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-comic-orange font-bold">
                                {index + 1}
                              </div>
                              <h4 className="font-bold text-lg">{panel.beat}</h4>
                            </div>
                            <p className="text-muted-foreground">{panel.details}</p>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              </Accordion>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex-shrink-0 border-black border-t-2 bg-background p-6">
          <Button
            className="w-full transform rounded-2xl border-4 border-black bg-comic-purple px-12 py-4 font-bold text-lg text-white shadow-comic transition-all duration-300 hover:scale-105 hover:bg-comic-pink hover:shadow-comic-lg active:scale-95"
            asChild
          >
            <Link href={`/studio/${workflowId}`}>Next</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

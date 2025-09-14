"use client";

import { useComicContext } from "@/components/providers/comic-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useDifyWorkflow } from "@/hooks/useDify";
import { DifyEnpoint } from "@/lib/dify/cosnt";
import { exampleStory } from "@/lib/example-story";
import { APP_NAME } from "@/lib/og";
import { cn } from "@/lib/utils";
import type { GetDetailResponse } from "@/queries/detail";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NewScreen({ detailWorkflow }: { detailWorkflow?: GetDetailResponse | null }) {
  const { storyText, setStoryText, listStyles, setSelectedStyleIndex } = useComicContext();
  const { runWorkflow, streamMessages, closeConnection, isStreaming } = useDifyWorkflow();
  const [prompt, setPrompt] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const maxWords = 2000;

  const wordCount = storyText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  function setExampleStory() {
    setStoryText(exampleStory);
  }

  function onGenerateStory() {
    if (isStreaming) return;
    runWorkflow(DifyEnpoint.GenerateStoryEndpoint, { context: prompt }, "streaming");
  }

  useEffect(() => {
    setStoryText(streamMessages.map((msg) => msg.data?.text).join(""));
    if (textAreaRef.current) {
      textAreaRef.current.scrollTo({
        top: textAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [streamMessages, setStoryText]);

  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, [closeConnection]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (detailWorkflow?.status === "succeeded") {
      try {
        const parsedInputs = JSON.parse(detailWorkflow?.inputs) as { comic_style: string; user_prompt: string };
        if (parsedInputs.user_prompt) {
          setStoryText(parsedInputs.user_prompt);
        }
        if (parsedInputs.comic_style) {
          const foundIndex = listStyles.findIndex(
            (v) => v.name.toLowerCase() === parsedInputs.comic_style.toLowerCase(),
          );
          if (foundIndex !== -1) {
            setSelectedStyleIndex(foundIndex);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [detailWorkflow]);
  return (
    <>
      <div className="relative flex h-full min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden">
        <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center space-y-8 px-6 pb-4">
          <div
            className={`flex transform items-center gap-2 transition-all duration-500 ${
              storyText.length === 0
                ? "pointer-events-none translate-y-full opacity-0 md:translate-y-0"
                : "translate-y-[300%] opacity-100 md:translate-y-full"
            }`}
          >
            <img src="/logo-500.png" alt="Logo" className="size-10 md:size-16" />
            <div className="font-comic">
              <p className="font-bold text-2xl md:text-4xl">{APP_NAME}</p>
              <p className="text-sm md:text-base">Unleash your imagination — craft a story!</p>
            </div>
          </div>

          {/* Action Buttons - Hide when text is typed */}
          <div
            className={`transform transition-all duration-500 ${
              storyText.length > 0 ? "pointer-events-none translate-y-[-100px] opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="btn-comic data-[state=open]:hover:!scale-100 !bg-comic-green/50 hover:!bg-comic-pink/50 h-20 flex-1 transform rounded-2xl border-2 border-black font-bold text-black text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95">
                    ✨ Create a story from a text prompt
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-(--radix-popover-trigger-width)" sideOffset={10}>
                  <div className="">
                    <label className="block font-medium text-sm" htmlFor="story-prompt">
                      Describe your story
                    </label>
                    <span className="text-muted-foreground text-sm">We recommend stories with human characters</span>
                    <div className="mt-2 flex items-center gap-1">
                      <Input
                        id="story-prompt"
                        placeholder="Describe your story"
                        className="flex-1"
                        value={prompt}
                        disabled={isStreaming}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            onGenerateStory();
                          }
                        }}
                      />
                      <Button
                        className="inline-flex size-9 border-2 shadow-comic"
                        size={"icon"}
                        type="button"
                        disabled={!prompt || isStreaming}
                        onClick={onGenerateStory}
                      >
                        {isStreaming ? (
                          <Loader2Icon size={14} className="animate-spin" />
                        ) : (
                          <ArrowRightIcon size={14} />
                        )}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                className="btn-comic !bg-comic-yellow/50 hover:!bg-comic-yellow h-20 flex-1 transform rounded-2xl border-2 border-black font-bold text-black text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={setExampleStory}
              >
                📖 Get started with a sample story
              </Button>
            </div>
          </div>

          {/* Text Input */}
          <Textarea
            ref={textAreaRef}
            placeholder="Write or paste your story..."
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            className="max-h-[50svh] min-h-[200px] resize-none rounded-2xl border-4 border-black bg-white/90 text-lg shadow-comic backdrop-blur-sm transition-all duration-300 focus:shadow-comic-lg"
          />
        </div>

        {/* footer */}
        <div className={cn("w-full transform overflow-hidden backdrop-blur-sm transition-all duration-500")}>
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-4 border-black border-t-4 bg-comic-yellow/90 px-6 py-4 text-center",
              {
                "translate-y-0 opacity-100": storyText.length > 0,
                "translate-y-full opacity-0": storyText.length === 0,
              },
            )}
          >
            <div className={cn("font-medium text-black text-sm", wordCount > maxWords && "text-red-500")}>
              Word count: {wordCount}/{maxWords}
            </div>
            <SheetTrigger asChild>
              <Button className="btn-comic !bg-comic-blue !text-white w-fit" size="lg">
                Next <ArrowRightIcon />
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </div>
    </>
  );
}

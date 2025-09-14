"use client";

import { type IChapter, chapters } from "@/lib/mock-chapter";
import { useGetStyles } from "@/queries/style";
import type { ComicStyle } from "@/types/comic-styles";
import { type ReactNode, createContext, useContext, useState } from "react";

// Define the shape of your context's value
interface ComicContextType {
  storyText: string;
  setStoryText: (text: string) => void;
  listStyles: ComicStyle[];
  isListStyleLoading: boolean;

  selectedStyleIndex: number;
  setSelectedStyleIndex: (index: number) => void;
  comicStyleSelected: ComicStyle;

  tabActive: "story" | "preview";
  setTabActive: (tab: "story" | "preview") => void;

  currentChapterId: string;
  setCurrentChapterId: (chapter: string) => void;
  currentChapterData: IChapter | undefined;
  currentChapterIndex: number;
  hasPrevious: boolean;
  hasNext: boolean;

  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;

  isCreating: boolean;
  setIsCreating: (creating: boolean) => void;

  isCreateSuccess: boolean;
  setIsCreateSuccess: (success: boolean) => void;
}

// Create the context
const ComicContext = createContext<ComicContextType | undefined>(undefined);

// Define the props for the provider
interface ComicProviderProps {
  children: ReactNode;
}

// Create the provider component
export const ComicProvider = ({ children }: ComicProviderProps) => {
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [storyText, setStoryText] = useState("");
  const [tabActive, setTabActive] = useState<"story" | "preview">("preview");
  const [currentChapterId, setCurrentChapterId] = useState("1");
  const [isCreating, setIsCreating] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const { data, isLoading: isListStyleLoading } = useGetStyles();

  const listStyles = data?.data || [];

  const getItemIndex = (index: number) => {
    const i = ((index % listStyles.length) + listStyles.length) % listStyles.length;
    return listStyles[i];
  };

  const comicStyleSelected = getItemIndex(selectedStyleIndex);

  const currentChapterData = chapters.find((c) => c.id === currentChapterId);
  const currentChapterIndex = chapters.findIndex((c) => c.id === currentChapterId);
  const hasPrevious = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chapters.length - 1;

  // Chapters State
  const [isGenerating, setIsGenerating] = useState(false);

  const value = {
    storyText,
    setStoryText,

    selectedStyleIndex,
    setSelectedStyleIndex,
    comicStyleSelected,

    tabActive,
    setTabActive,

    currentChapterId,
    setCurrentChapterId,
    currentChapterData,
    currentChapterIndex,
    hasPrevious,
    hasNext,

    isGenerating,
    setIsGenerating,

    isCreating,
    setIsCreating,

    isCreateSuccess,
    setIsCreateSuccess,
    listStyles,
    isListStyleLoading,
  };

  return <ComicContext.Provider value={value}>{children}</ComicContext.Provider>;
};

export const useComicContext = () => useContext(ComicContext)!;

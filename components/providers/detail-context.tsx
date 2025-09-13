"use client";

import { type ComicStyle, comicStyles } from "@/lib/mock-comic-style";
import { type ReactNode, createContext, useContext, useState } from "react";

// Define the shape of your context's value
interface ComicContextType {
  selectedStyleIndex: number;
  setSelectedStyleIndex: (index: number) => void;
  storyText: string;
  setStoryText: (text: string) => void;
  comicStyleSelected: ComicStyle;
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

  const getItemIndex = (index: number) => {
    const i = ((index % comicStyles.length) + comicStyles.length) % comicStyles.length;
    return comicStyles[i];
  };

  const comicStyleSelected = getItemIndex(selectedStyleIndex);

  const value = {
    selectedStyleIndex,
    setSelectedStyleIndex,
    storyText,
    setStoryText,
    comicStyleSelected,
  };

  return <ComicContext.Provider value={value}>{children}</ComicContext.Provider>;
};

export const useComicContext = () => useContext(ComicContext)!;

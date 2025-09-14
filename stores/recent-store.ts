import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RecentComic = {
  id: string;
  title: string;
  summary: string;
  thumbnailBase64?: string;
  chapterLength: number;
};

interface ComicsStore {
  recentComics: RecentComic[];
  setRecentComics: (comics: RecentComic[]) => void;
  addRecentComic: (comic: RecentComic) => void;
  removeRecentComic: (id: string) => void;
  updateRecentComic: (id: string, updates: Partial<RecentComic>) => void;
  clearRecentComics: () => void;
}

export const useComicsStore = create<ComicsStore>()(
  persist(
    (set) => ({
      recentComics: [],

      setRecentComics: (comics) => set({ recentComics: comics }),

      addRecentComic: (comic) =>
        set((state) => {
          if (state.recentComics.find((c) => c.id === comic.id)) {
            return state;
          }

          return { recentComics: [...state.recentComics, comic] };
        }),

      removeRecentComic: (id) =>
        set((state) => ({
          recentComics: state.recentComics.filter((comic) => comic.id !== id),
        })),

      updateRecentComic: (id, updates) =>
        set((state) => ({
          recentComics: state.recentComics.map((comic) => (comic.id === id ? { ...comic, ...updates } : comic)),
        })),

      clearRecentComics: () => set({ recentComics: [] }),
    }),
    {
      name: "comics-store",
    },
  ),
);

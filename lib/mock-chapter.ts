export const chapters: IChapter[] = [
  {
    id: "1",
    title: "Chapter 1: The Beginning",
    panels: [
      { id: "1-1", imageUrl: "/images/studio/chapters/manga-panel-1.jpg" },
      { id: "1-2", imageUrl: "/images/studio/chapters/manga-panel-2.jpg" },
      { id: "1-3", imageUrl: "/images/studio/chapters/manga-panel-3.jpg" },
      { id: "1-4", imageUrl: "/images/studio/chapters/manga-panel-4.jpg" },
    ],
  },
  {
    id: "2",
    title: "Chapter 2: The Journey",
    panels: [
      { id: "2-1", imageUrl: "/images/studio/chapters/manga-panel-3.jpg" },
      { id: "2-2", imageUrl: "/images/studio/chapters/manga-panel-1.jpg" },
      { id: "2-3", imageUrl: "/images/studio/chapters/manga-panel-4.jpg" },
      { id: "2-4", imageUrl: "/images/studio/chapters/manga-panel-2.jpg" },
    ],
  },
];

export interface IComicPanel {
  id: string;
  imageUrl: string;
  isLoading?: boolean;
}

export interface IChapter {
  id: string;
  title: string;
  panels: IComicPanel[];
}

export const comicStyles: ComicStyle[] = [
  {
    id: "anime-craft",
    title: "Anime Craft",
    description:
      "Traditional Japanese artisan style, perfect for crafting stories with authentic cultural details and warm, inviting atmospheres.",
    image: "/images/comic-styles/anime-craft.jpg",
  },
  {
    id: "anime-forge",
    title: "Anime Forge",
    description:
      "Quintessential 2D anime style, perfect for immersive anime-like stories, webtoons, and vibrant character-driven narratives.",
    image: "/images/comic-styles/anime-forge.jpg",
  },
  {
    id: "noir-comix",
    title: "Noir Comix",
    description: "Dark, atmospheric noir style with high contrast",
    image: "/images/comic-styles/noir-comix.jpg",
  },
  {
    id: "classic-comic",
    title: "Classic Comic",
    description: "Traditional comic book style with bold outlines",
    image: "/images/comic-styles/anime-craft.jpg",
  },
  {
    id: "manga-style",
    title: "Manga Style",
    description: "Japanese manga aesthetic with expressive characters",
    image: "/images/comic-styles/anime-forge.jpg",
  },
];

export interface ComicStyle {
  id: string;
  title: string;
  description: string;
  image: string;
}

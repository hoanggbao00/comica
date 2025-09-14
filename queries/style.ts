import { getStyles } from "@/api/style";
import { useQuery } from "@tanstack/react-query";

const imageUrl = {
  noir: "/images/comic-styles/noir-comix.jpg",
  anime: "/images/comic-styles/anime-craft.jpg",
  chibi: "/images/comic-styles/chibi.jpg",
  western: "/images/comic-styles/western.webp",
};

function getImageUrl(name: string) {
  const _name = name.toLowerCase();
  if (_name.includes("noir")) {
    return imageUrl.noir;
  }

  if (_name.includes("anime")) {
    return imageUrl.anime;
  }

  if (_name.includes("chibi")) {
    return imageUrl.chibi;
  }

  if (_name.includes("western")) {
    return imageUrl.western;
  }

  return "/images/comic-styles/noir-comix.jpg";
}

export const useGetStyles = () => {
  return useQuery({
    queryKey: ["styles"],
    queryFn: () => getStyles(),
    select(data) {
      return {
        data: data.data.map((style) => ({
          ...style,
          image: getImageUrl(style.name),
        })),
      };
    },
  });
};

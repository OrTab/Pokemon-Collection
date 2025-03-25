export const checkIsImageUrl = (url: string) => {
  return (
    Boolean(url) &&
    typeof url === "string" &&
    (url.endsWith(".jpg") ||
      url.endsWith(".png") ||
      url.endsWith(".gif") ||
      url.endsWith(".bmp") ||
      url.endsWith(".jpeg"))
  );
};

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "gray",
    fire: "red",
    water: "blue",
    electric: "yellow",
    grass: "green",
    ice: "cyan",
    fighting: "orange",
    poison: "purple",
    ground: "orange",
    flying: "teal",
    psychic: "pink",
    bug: "lime",
    rock: "orange",
    ghost: "purple",
    dragon: "teal",
    dark: "gray",
    steel: "gray",
    fairy: "pink",
  };

  return typeColors[type.toLowerCase()] || "gray";
};

export const formatName = (name: string) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

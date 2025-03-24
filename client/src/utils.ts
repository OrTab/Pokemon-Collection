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

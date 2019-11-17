export const getVideoIdFromUrl = (url: string): string => {
  const videoId = url.replace(
    /(https?:\/\/)?(www.)?youtube.com\/watch\?v=/,
    ''
  );

  return videoId;
};

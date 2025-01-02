const extractVideoId = (url: string) => {
  try {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  } catch {
    return null;
  }
};

export const validateUrl = (url: string) => {
  if (!url.includes("youtube.com/watch?v=")) {
    throw new Error("Please enter a valid YouTube URL.");
  }
  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error("Invalid YouTube URL. Please enter a valid URL.");
  }
  return videoId;
};

export const fetchVideoData = async (videoId: string) => {
  const response = await fetch(`/api/transcript?videoId=${videoId}`);
  if (!response.ok) throw new Error("API request failed");
  return await response.json();
};

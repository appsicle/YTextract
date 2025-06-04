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

export const analyzeVideoDirectly = async (youtubeUrl: string, prompt?: string) => {
  const response = await fetch(`/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      youtubeUrl, 
      prompt: prompt || "Please provide a comprehensive analysis of this video including: 1) Overall Summary, 2) Key points and highlights, 3) Main topics discussed, 4) Important insights or takeaways" 
    }),
  });
  
  if (!response.ok) throw new Error("Video analysis failed");
  return await response.json();
};

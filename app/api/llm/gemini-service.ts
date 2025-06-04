import { getDefaultPrompt } from "./default-prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiResponse = async (videoTranscript: string, granularity: string = "Standard Analysis") => {
  console.log("Using GEMINI_API_KEY for transcript analysis");

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  
  const fullPrompt = getDefaultPrompt(videoTranscript, granularity);
  console.log(`Using granularity: ${granularity} for prompt.`);

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    console.log(text);
    return text.trim();
  } catch (err) {
    console.error("gemini error");
    console.error(err);
    throw err;
  }
};

export const analyzeVideoDirectly = async (youtubeUrl: string, prompt: string = "Please summarize the video in 3 sentences.") => {
  console.log("Using GEMINI_API_KEY for direct video analysis");

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      prompt,
      {
        fileData: {
          fileUri: youtubeUrl,
          mimeType: "video/mp4",
        },
      },
    ]);

    const text = result.response.text();
    console.log("Direct video analysis result:", text);
    return text.trim();
  } catch (err) {
    console.error("Direct video analysis error:", err);
    throw err;
  }
};

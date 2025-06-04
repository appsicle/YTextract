import { getDefaultPrompt } from "./default-prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiResponse = async (videoTranscript: string, granularity: string = "Standard Analysis") => {
  console.log("key");

  console.log(process.env.GEMINI_API_KEY);
  if (!process.env.GEMINI_API_KEY) {
    // Consider throwing an error here or returning a specific error response
    // instead of just returning undefined, to make error handling more explicit.
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  // Pass granularity to getDefaultPrompt
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

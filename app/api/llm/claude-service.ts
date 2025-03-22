import { getDefaultPrompt } from "./default-prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getClaudeResponse = async (videoTranscript: string) => {
  console.log("key");

  console.log(process.env.GEMINI_API_KEY);
  if (!process.env.GEMINI_API_KEY) {
    return;
  }
  const fullPrompt = getDefaultPrompt(videoTranscript);

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

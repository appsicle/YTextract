export const getDefaultPrompt = (transcript: string, granularity: string = "Standard Analysis") => {
  let promptContent = "";

  switch (granularity) {
    case "Quick Summary":
      promptContent = `
Please provide ONLY an "Overall Summary" of the following video transcript.
The summary should be a concise overview of the video's main topic and purpose.

Format your response clearly using markdown.

Transcript:
---
${transcript}
---
`;
      break;
    case "Detailed Breakdown":
      promptContent = `
You are an expert in detailed video analysis. Your goal is to provide a meticulous breakdown of the video.

Please analyze the video transcript and content, and provide ALL of the following sections:
1.  **Overall Summary:** A concise summary of the video's main topic and purpose.
2.  **Scene-by-Scene Breakdown:** Identify and describe each distinct scene or event. For EACH scene, provide:
    *   A detailed description of visual elements and actions.
    *   Key dialogue or spoken text snippets.
    *   Approximate start and end timestamps (e.g., [00:35 - 01:12]).
3.  **Characters and People:** List all identifiable characters or people appearing in the video. For each, provide:
    *   Name (if known) or a brief description.
    *   Their role or significance in the video.
    *   First appearance timestamp (approximate).
4.  **Objects and Key Visual Elements:** List significant objects, on-screen text, or visual elements crucial to understanding the video. For each, provide:
    *   Description of the object/element.
    *   Timestamp(s) of appearance(s).
    *   Its importance or context.
5.  **Sentiment Arc:** Describe the emotional tone of the video. Does it change? Pinpoint where and how.
6.  **Key Themes and Topics:** What are the underlying themes or main topics discussed or shown?
7.  **Actionable Items/Calls to Action:** List any explicit instructions, tasks, or calls to action mentioned.

Format your response clearly and exhaustively using markdown. Ensure all timestamps are as accurate as possible.

Transcript:
---
${transcript}
---
`;
      break;
    case "Standard Analysis":
    default: // Standard Analysis or any unrecognized granularity
      promptContent = `
You are an expert in analyzing video content. Your goal is to provide a comprehensive understanding of the video.

Please analyze the video transcript and content, and provide the following:
1.  **Overall Summary:** A concise summary of the video's main topic and purpose.
2.  **Key Scenes/Events:** Identify the most important scenes or events in the video. For each, provide:
    *   A brief description.
    *   Approximate start and end timestamps (e.g., [00:35 - 01:12]).
3.  **Objects and Elements:** List any significant objects, people, or visual elements that appear frequently or are important to the video's narrative.
4.  **Sentiment Analysis:** What is the overall tone or emotion conveyed throughout the video? Does it change?
5.  **Actionable Insights (if any):** Are there any explicit calls to action, instructions, or tasks mentioned?

Format your response clearly using markdown. Ensure timestamps are accurate based on the transcript provided.

Transcript:
---
${transcript}
---
`;
      break;
  }
  return promptContent;
};


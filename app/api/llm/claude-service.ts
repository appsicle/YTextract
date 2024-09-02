import { getDefaultPrompt } from './default-prompt';
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  // defaults to process.env["ANTHROPIC_API_KEY"]
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const getClaudeResponse = async (videoTranscript: string) => {
  const fullPrompt = getDefaultPrompt(videoTranscript);
  console.log('start claude');
  const res =  await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 3163,
    temperature: 0,
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": fullPrompt
          }
        ]
      },
      {
        "role": "assistant",
        "content": "Here is the JSON requested:"
      }
    ]
  });
  console.log(res);
  return res.content[0].text.trim();
}

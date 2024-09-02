import { extractCaptions } from "../transcript";
import { getClaudeResponse } from '../llm';

export const convertLongToShort = async (cache, videoId: string) => {
  try {
    if (cache.has(videoId)) {
      console.log('hit');
      return cache.get(videoId);
    }
    console.log('miss');
    const transcript = await extractCaptions(videoId);
    const transcriptResult = Object.values(transcript).toString();
    const msg = await getClaudeResponse(transcriptResult);
    try {
      JSON.parse(msg);
    } catch (e) {
      console.error(msg);
      console.error('JSON parse INVALID');
    }
    cache.set(videoId, msg);
    return msg;
  } catch (error) {
    throw error;
  }
}

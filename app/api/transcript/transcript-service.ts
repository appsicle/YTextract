import { Innertube } from 'youtubei.js';

let youtube: null | Innertube;

export const extractCaptions = async (videoId: string) => {
  
  try {
    if (!youtube) {
      youtube = await Innertube.create();
    }
    const videoInfo = await youtube.getInfo(videoId);
    const transcript = await videoInfo.getTranscript();
    const transcriptMap = new Map();

    if (transcript?.transcript?.content?.body.initial_segments) {
      transcript.transcript.content.body.initial_segments.forEach(segment => {

        if (segment.type === "TranscriptSegment" && segment['start_time_text']?.text && segment.snippet?.text) {
          transcriptMap.set(segment['start_time_text'].text, segment.snippet.text);
        }
      });
    } else {
      throw Error('No transcript found');
    }
    return Object.fromEntries(transcriptMap);
  } catch (error) {
    if (error?.info?.reason) {
      throw Error(error.info.reason);
    }
    throw error;
  }
}
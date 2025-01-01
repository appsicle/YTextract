import { Innertube } from "youtubei.js";

let youtube: null | Innertube;

interface INormalizedTranscriptSegments {
  startTimeMs: string;
  endTimeMs: string;
  text: string;
}

export const extractCaptions = async (videoId: string) => {
  try {
    if (!youtube) {
      youtube = await Innertube.create();
    }
    const videoInfo = await youtube.getInfo(videoId);
    const transcript = await videoInfo.getTranscript();
    const normalizedTranscript: INormalizedTranscriptSegments[] = [];

    if (transcript?.transcript?.content?.body?.initial_segments) {
      transcript.transcript.content.body.initial_segments.forEach((segment) => {
        if (
          segment.type === "TranscriptSegment" &&
          segment["start_ms"] &&
          segment["end_ms"] &&
          segment.snippet?.text
        ) {
          const normalizedTranscriptSegment: INormalizedTranscriptSegments = {
            startTimeMs: segment["start_ms"],
            endTimeMs: segment["end_ms"],
            text: segment.snippet?.text,
          };
          normalizedTranscript.push(normalizedTranscriptSegment);
        }
      });
    } else {
      throw Error("No transcript found");
    }
    return normalizedTranscript;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'info' in error) {
      const err = error as { info: { reason: string } };
      if (err.info?.reason) {
        throw Error(err.info.reason);
      }
    }
    throw error;
  }
};
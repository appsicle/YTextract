export interface TranscriptSegment {
  startTimeMs: string;
  endTimeMs: string;
  text: string;
}

export const getSegmentsInRange = (
  segments: TranscriptSegment[],
  startSeconds: number,
  endSeconds: number
): TranscriptSegment[] | undefined => {
  if (!segments?.length) return;
  const startMs = startSeconds * 1000;
  const endMs = endSeconds * 1000;

  return segments.filter(
    (segment) =>
      Number(segment.startTimeMs) <= endMs &&
      Number(segment.endTimeMs) >= startMs
  );
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [
    minutes.toString().padStart(2, "0"),
    remainingSeconds.toString().padStart(2, "0"),
  ];

  if (hours > 0) {
    parts.unshift(hours.toString());
  }

  return parts.join(":");
};

export const breakIntoChunks = (
  segments: Array<{ text: string }> | undefined,
  chunkSize: number = 500
): string[] | undefined => {
  if (!segments?.length) return;
  // Combine all text from segments
  const fullText = segments.map((segment) => segment.text).join(" ");

  const words = fullText.split(" ");
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentLength = 0;

  words.forEach((word) => {
    if (currentLength + word.length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.join(" "));
      currentChunk = [];
      currentLength = 0;
    }
    currentChunk.push(word);
    currentLength += word.length + 1; // +1 for the space
  });

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks;
};

export const parseTimestampToSeconds = (timestamp: string): number | null => {
  if (!timestamp) return null;

  // Check for range format e.g., [00:35 - 01:12] and take the first part
  const rangeMatch = timestamp.match(/\[\s*([^\]-]+)(\s*-\s*[^\]]+)?\s*\]/);
  if (rangeMatch && rangeMatch[1]) {
    timestamp = rangeMatch[1].trim();
  } else if (timestamp.includes('-')) {
    // If not in brackets but contains a dash, take the part before the dash
    timestamp = timestamp.split('-')[0].trim();
  }


  const parts = timestamp.split(':').map(Number);
  let seconds = 0;

  if (parts.some(isNaN)) return null; // Invalid number in parts

  if (parts.length === 3) { // HH:MM:SS
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) { // MM:SS
    seconds = parts[0] * 60 + parts[1];
  } else if (parts.length === 1) { // SS
    seconds = parts[0];
  } else {
    return null; // Invalid format
  }

  return isNaN(seconds) ? null : seconds;
};

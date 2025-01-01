

// Get text within a time range
export const getTextInRange = (
  segments: TranscriptSegment[],
  startSeconds: number,
  endSeconds: number
): string => {
  const relevantSegments = segments.filter(
    (segment) =>
      segment.startTime <= endSeconds && segment.endTime >= startSeconds
  );

  if (relevantSegments.length === 0) {
    return "";
  }

  // Process segments that fall within the range
  const result = relevantSegments.map((segment, index) => {
    let text = segment.text;

    // Handle first segment if it starts before our range
    if (index === 0 && segment.startTime < startSeconds) {
      const totalDuration = segment.endTime - segment.startTime;
      const skipDuration = startSeconds - segment.startTime;
      const skipRatio = skipDuration / totalDuration;
      const wordsToSkip = Math.floor(text.split(" ").length * skipRatio);
      text = text.split(" ").slice(wordsToSkip).join(" ");
    }

    // Handle last segment if it ends after our range
    if (index === relevantSegments.length - 1 && segment.endTime > endSeconds) {
      const totalDuration = segment.endTime - segment.startTime;
      const keepDuration = endSeconds - segment.startTime;
      const keepRatio = keepDuration / totalDuration;
      const wordsToKeep = Math.ceil(text.split(" ").length * keepRatio);
      text = text.split(" ").slice(0, wordsToKeep).join(" ");
    }

    return text;
  });

  return result.join(" ");
};

// Fuzzy search implementation
// const fuzzyMatch = (text: string, searchTerm: string): number => {
//   text = text.toLowerCase();
//   searchTerm = searchTerm.toLowerCase();

//   let score = 0;
//   let lastFoundIndex = -1;

//   // Check for consecutive character matches
//   for (let i = 0; i < searchTerm.length; i++) {
//     const char = searchTerm[i];
//     const foundIndex = text.indexOf(char, lastFoundIndex + 1);

//     if (foundIndex > -1) {
//       score += 1;
//       if (foundIndex === lastFoundIndex + 1) {
//         score += 0.5; // Bonus for consecutive matches
//       }
//       lastFoundIndex = foundIndex;
//     }
//   }

//   return score / Math.max(text.length, searchTerm.length);
// };

// const fuzzySearch = (
//   segments: TranscriptSegment[],
//   query: string,
//   threshold: number = 0.6
// ): SearchResult[] => {
//   return segments
//     .map((segment) => ({
//       ...segment,
//       score: fuzzyMatch(segment.text, query),
//     }))
//     .filter((result) => result.score > threshold)
//     .sort((a, b) => b.score - a.score);
// };

// Example usage:
const transcript: RawTranscript = {
  "0:02": "all right so if you've been online in",
  "0:04": "the past week you've probably had some",
  "0:07": "headline cross your path or in some way",
  "0:09": "been recommended to watch the video",
  "0:10": "about the greatest scam in the history",
  "0:14": "of the Creator economy or whatever else",
  "0:15": "is being called and it's actually it's",
};

// Initialize the segments
const segments = normalizeTranscript(transcript);

// Time range search
console.log(getTextInRange(segments, 8, 11));
// Output: "been recommended to watch the video about the greatest"

// Fuzzy search
// console.log(fuzzySearch(segments, "creator economy"));
// Output: [{text: "of the Creator economy or whatever else", startTime: 14, ...}]

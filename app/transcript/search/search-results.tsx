import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
import { TranscriptRenderer } from "../transcript-renderer";

const breakIntoChunks = (
  segments: Array<{ text: string }>,
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

export function SearchResults({ error, data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState([0, 100]);
  const [showSummary, setShowSummary] = useState(false);
  const textChunks = breakIntoChunks(data);
  console.log(textChunks);
  const handleSummarize = () => {
    setShowSummary(true);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Text Analysis App</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-400"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Time Range 13 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Time Range</h2>
          {/* <Slider
            min={0}
            max={100}
            step={1}
            value={timeRange}
            onValueChange={setTimeRange}
            className="w-full"
          /> */}
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{timeRange[0]}:00</span>
            <span>{timeRange[1]}:00</span>
          </div>
        </div>

        {/* Summarize Button */}
        <Button
          className="mb-6 bg-red-600 hover:bg-red-700 text-white border-0"
          onClick={handleSummarize}
        >
          Summarize Selected Range
        </Button>

        {/* Summary Section */}
        {showSummary && (
          <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-gray-300">
              This is a placeholder for the summary of the selected text range.
              In a fully functional app, this would contain an AI-generated
              summary of the content between {timeRange[0]}:00 and{" "}
              {timeRange[1]}:00.
            </p>
          </div>
        )}
        {textChunks?.length ? <TranscriptRenderer data={textChunks} /> : null}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DualEndedSlider } from "@/components/DualSlider";
import { TranscriptRenderer } from "./analysis-transcript-renderer";
import {
  getSegmentsInRange,
  formatTime,
  breakIntoChunks,
} from "./analysis-utils";
import Markdown from "react-markdown";

async function getSummary(transcript: string) {
  const response = await fetch(`/api/summarize`, {
    method: "POST",
    body: transcript,
  });
  if (!response.ok) throw new Error("API request failed");
  return await response.json();
}

export function AnalysisRenderer({ error, data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState([0, 100]);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");

  const lastSecond = data?.length
    ? Math.ceil(data[data.length - 1].endTimeMs / 1000)
    : 0;
  const filteredSegments = getSegmentsInRange(data, timeRange[0], timeRange[1]);
  const textChunks = breakIntoChunks(filteredSegments);

  const handleSummarize = async () => {
    if (!textChunks?.length) {
      return;
    }
    if (showSummary) {
      setShowSummary(false);
    }
    const transcriptInTimeRange = textChunks?.join(" ");
    const { data } = await getSummary(transcriptInTimeRange);
    setSummary(data);
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Time Range</h2>
          <DualEndedSlider
            min={0}
            max={lastSecond}
            step={5}
            value={timeRange}
            onChange={setTimeRange}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{formatTime(timeRange[0])}</span>
            <span>{formatTime(timeRange[1])}</span>
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
            <Markdown className="prose prose-invert">{summary}</Markdown>
          </div>
        )}
        {textChunks?.length ? <TranscriptRenderer data={textChunks} /> : null}
      </div>
    </div>
  );
}

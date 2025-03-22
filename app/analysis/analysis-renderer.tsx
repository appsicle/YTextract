import { useState, useMemo, useEffect } from "react";
import { Search, FileText, Clock, Sparkles, Youtube, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DualEndedSlider } from "@/components/DualSlider";
import { TranscriptRenderer } from "./analysis-transcript-renderer";
import {
  getSegmentsInRange,
  formatTime,
  breakIntoChunks,
  TranscriptSegment
} from "./analysis-utils";
import Markdown from "react-markdown";
import { VideoProcessingLoader } from "@/components/VideoProcessingLoader";
import { motion } from "framer-motion";

interface AnalysisRendererProps {
  error: string | null;
  data: TranscriptSegment[];
}

async function getSummary(transcript: string) {
  const response = await fetch(`/api/summarize`, {
    method: "POST",
    body: transcript,
  });

  if (!response.ok) throw new Error("API request failed");
  return await response.json();
}

export function AnalysisRenderer({ error, data }: AnalysisRendererProps) {
  const lastSecond = useMemo(() => {
    return data?.length ? Math.ceil(Number(data[data.length - 1].endTimeMs) / 1000) : 0;
  }, [data]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<[number, number]>([0, lastSecond]);
  
  // Update timeRange.end when lastSecond changes
  useEffect(() => {
    setTimeRange(prev => [prev[0], lastSecond]);
  }, [lastSecond]);
  
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<number[]>([]);
  const filteredSegments = getSegmentsInRange(data, timeRange[0], timeRange[1]);
  const textChunks = breakIntoChunks(filteredSegments);
  const videoId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('videoId') : '';

  // Get segments based on selection
  const getSelectedTranscript = () => {
    if (selectedSegments.length === 0) {
      return textChunks?.join(" "); // Use time range if no segments selected
    }
    
    // Get only selected segments
    const selectedChunks = selectedSegments.map(index => textChunks[index]);
    return selectedChunks.join(" ");
  };

  const handleSummarize = async () => {
    if (!textChunks?.length) {
      return;
    }

    setIsSummaryLoading(true);
    const transcriptToSummarize = getSelectedTranscript();
    try {
      const { data } = await getSummary(transcriptToSummarize);
      setSummary(data);
    } catch (error) {
      console.error("Error summarizing:", error);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const toggleSegmentSelection = (index: number) => {
    setSelectedSegments(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const selectAllSegments = () => {
    const allIndices = textChunks.map((_, index) => index);
    setSelectedSegments(allIndices);
  };

  const clearSelection = () => {
    setSelectedSegments([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pb-12">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>

      <div className="container mx-auto p-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* Video Info Header */}
          <div className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl mt-8">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#FF0000] to-[#FF5050] rounded-lg flex items-center justify-center shadow-lg">
                  <Youtube className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                  Video Analysis
                </h1>
                <div className="flex items-center mt-1 text-zinc-400">
                  <Clock className="inline-block w-4 h-4 mr-1" />
                  <span>{formatTime(lastSecond)}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <a 
                  href={`https://youtube.com/watch?v=${videoId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="mr-1">View on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-[#FF0000]" />
              <h2 className="text-lg font-semibold">Time Range Selection</h2>
            </div>
            
            <DualEndedSlider
              min={0}
              max={lastSecond}
              step={5}
              value={timeRange}
              onChange={setTimeRange}
            />
            <div className="flex justify-between mt-3 text-sm text-zinc-400">
              <span className="px-3 py-1 bg-zinc-700/50 rounded-full">{formatTime(timeRange[0])}</span>
              <span className="px-3 py-1 bg-zinc-700/50 rounded-full">{formatTime(timeRange[1])}</span>
            </div>
          </motion.div>

          {/* Transcript Section with Selectable Paragraphs */}
          {textChunks?.length ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#FF0000]" />
                  <h2 className="text-lg font-semibold">Transcript</h2>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={selectAllSegments}
                    className="text-xs border-zinc-600 hover:bg-zinc-700 bg-zinc-800"
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearSelection}
                    className="text-xs border-zinc-600 hover:bg-zinc-700 bg-zinc-800"
                  >
                    Clear Selection
                  </Button>
                  <Button
                    disabled={isSummaryLoading || selectedSegments.length === 0}
                    className="bg-gradient-to-r from-[#FF0000] to-[#FF5050] hover:shadow-lg hover:shadow-[#FF0000]/20 border-0 transition-all duration-200 text-xs"
                    onClick={handleSummarize}
                    size="sm"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isSummaryLoading ? "Summarizing..." : "Summarize Selection"}
                  </Button>
                </div>
              </div>
              <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60">
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {textChunks.map((chunk, index) => (
                    <div 
                      key={index}
                      onClick={() => toggleSegmentSelection(index)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedSegments.includes(index) 
                          ? 'bg-zinc-700/70 border border-[#FF5050]/50' 
                          : 'bg-zinc-800/50 border border-zinc-700/30 hover:bg-zinc-700/30'
                      }`}
                    >
                      <p className="text-sm text-zinc-300">{chunk}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}

          {/* Summary Section */}
          {isSummaryLoading ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
            >
              <VideoProcessingLoader />
            </motion.div>
          ) : summary ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-[#FF0000]" />
                <h2 className="text-lg font-semibold">AI Summary</h2>
              </div>
              <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60">
                <Markdown className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:my-3 prose-h3:text-zinc-300 prose-h2:text-white prose-li:text-zinc-300">{summary}</Markdown>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}

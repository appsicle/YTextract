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
  TranscriptSegment,
  parseTimestampToSeconds, // Import for timestamp parsing
} from "./analysis-utils";
import Markdown from "react-markdown";
import { VideoProcessingLoader } from "@/components/VideoProcessingLoader";
import { motion } from "framer-motion";

// Interfaces for parsed sections
interface ParsedKeyScene {
  description: string;
  timestamp?: string;
}

interface ParsedAnalysisSections {
  "Overall Summary"?: string;
  "Key Scenes/Events"?: ParsedKeyScene[];
  "Objects and Elements"?: string[]; // Assuming list of strings for now
  "Sentiment Analysis"?: string;
  "Actionable Insights (if any)"?: string; // Keeping the "(if any)" as it's part of the title
  [key: string]: any; // For any other sections
}

interface AnalysisRendererProps {
  error: string | null; // Error from page.tsx (parent)
  data: TranscriptSegment[]; // This is the transcript data
  seekToTime?: (timeInSeconds: number) => void; // Optional seekToTime prop
}

// Helper function to determine button variant for granularity
const getButtonVariant = (currentGranularity: string, buttonGranularity: string) => {
  return currentGranularity === buttonGranularity ? "default" : "outline";
};

// Parsing function for Gemini response
const parseGeminiMarkdown = (markdown: string): ParsedAnalysisSections => {
  const sections: ParsedAnalysisSections = {};
  if (!markdown) return sections;

  const lines = markdown.split('\n');
  let currentSectionTitle = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    // Assuming section titles are H2 (##)
    if (line.startsWith('## ')) {
      if (currentSectionTitle && currentContent.length > 0) {
        sections[currentSectionTitle] = currentContent.join('\n').trim();
      }
      currentSectionTitle = line.substring(3).trim();
      currentContent = [];
    } else if (currentSectionTitle) {
      currentContent.push(line);
    }
  }
  // Add the last section
  if (currentSectionTitle && currentContent.length > 0) {
    sections[currentSectionTitle] = currentContent.join('\n').trim();
  }

  // Further parsing for specific sections
  if (sections["Key Scenes/Events"] && typeof sections["Key Scenes/Events"] === 'string') {
    const scenesMd = sections["Key Scenes/Events"] as string;
    const sceneItems = scenesMd.split(/^\s*\*\s+/m).filter(s => s.trim() !== ""); // Split by markdown list items
    sections["Key Scenes/Events"] = sceneItems.map(item => {
      const match = item.match(/\[(.*?)\]\s*(.*)/); // Attempt to find timestamp and description
      if (match) {
        return { timestamp: match[1], description: match[2].trim() };
      }
      return { description: item.trim() }; // Fallback if no timestamp
    });
  }

  if (sections["Objects and Elements"] && typeof sections["Objects and Elements"] === 'string') {
    const objectsMd = sections["Objects and Elements"] as string;
    sections["Objects and Elements"] = objectsMd.split(/^\s*\*\s+/m).filter(s => s.trim() !== "").map(s => s.trim());
  }

  return sections;
};


export function AnalysisRenderer(props: AnalysisRendererProps) {
  const { error: parentError, data, seekToTime } = props; // Destructure props

  const lastSecond = useMemo(() => {
    return data?.length ? Math.ceil(Number(data[data.length - 1].endTimeMs) / 1000) : 0;
  }, [data]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<[number, number]>([0, lastSecond]);
  
  useEffect(() => {
    setTimeRange(prev => [prev[0], lastSecond]);
  }, [lastSecond]);
  
  const [summary, setSummary] = useState("");
  const [parsedSummarySections, setParsedSummarySections] = useState<ParsedAnalysisSections | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<number[]>([]);
  const [granularity, setGranularity] = useState<string>("Standard Analysis");
  const [rendererError, setRendererError] = useState<string | null>(parentError); // Internal error state

  useEffect(() => {
    setRendererError(parentError); // Sync with parent error prop
  }, [parentError]);

  const handleGranularityChange = (newGranularity: string) => {
    if (granularity !== newGranularity) {
      setGranularity(newGranularity);
      setParsedSummarySections(null); // Clear existing parsed summary
      setSummary(""); // Clear existing raw summary
      setRendererError(null); // Clear any local errors related to summary display
    }
  };

  const filteredSegments = getSegmentsInRange(data, timeRange[0], timeRange[1]);
  const textChunks = breakIntoChunks(filteredSegments);
  const videoId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('videoId') : '';

  const getSelectedTranscript = () => {
    if (selectedSegments.length === 0) {
      return textChunks?.join(" "); // Use time range if no segments selected
    }
    
    // Get only selected segments
    if (!textChunks) return "";
    const selectedChunks = selectedSegments.map(index => textChunks[index]);
    return selectedChunks.join(" ");
  };

  const handleSummarize = async () => {
    if (!textChunks?.length) {
      return;
    }

    setIsSummaryLoading(true);
    setParsedSummarySections(null); // Clear previous results
    setSummary("");
    setRendererError(null); // Clear previous errors
    const transcriptToSummarize = getSelectedTranscript();

    try {
      const response = await fetch(`/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcriptToSummarize, granularity: granularity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }
      const { data: rawSummary } = await response.json();

      setSummary(rawSummary);
      if (rawSummary) {
        const parsed = parseGeminiMarkdown(rawSummary);
        setParsedSummarySections(parsed);
      } else {
        // If rawSummary is empty or null from a successful response
        setParsedSummarySections({}); // Set to empty object to indicate no sections found
      }
    } catch (err: any) {
      console.error("Error summarizing:", err);
      setRendererError(err.message || "Failed to fetch summary.");
      setParsedSummarySections(null);
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
    if (!textChunks) return;
    const allIndices = textChunks.map((_, index) => index);
    setSelectedSegments(allIndices);
  };

  const clearSelection = () => {
    setSelectedSegments([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pb-12">
      {rendererError && ( // Display internal or parent error
        <div className="container mx-auto p-4 max-w-5xl relative z-10 mt-8">
          <div className="bg-red-800/70 border border-red-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl text-white">
            <h2 className="text-xl font-semibold mb-2">Could not load analysis:</h2>
            <p>{rendererError}</p>
          </div>
        </div>
      )}
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
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#FF0000]" />
                  <h2 className="text-lg font-semibold">Transcript Controls</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Granularity Buttons */}
                  <Button variant={getButtonVariant(granularity, "Quick Summary")} size="sm" onClick={() => handleGranularityChange("Quick Summary")} className="text-xs">Quick Summary</Button>
                  <Button variant={getButtonVariant(granularity, "Standard Analysis")} size="sm" onClick={() => handleGranularityChange("Standard Analysis")} className="text-xs">Standard Analysis</Button>
                  <Button variant={getButtonVariant(granularity, "Detailed Breakdown")} size="sm" onClick={() => handleGranularityChange("Detailed Breakdown")} className="text-xs">Detailed Breakdown</Button>

                  <Button variant="outline" size="sm" onClick={selectAllSegments} className="text-xs border-zinc-600 hover:bg-zinc-700 bg-zinc-800">Select All</Button>
                  <Button variant="outline" size="sm" onClick={clearSelection} className="text-xs border-zinc-600 hover:bg-zinc-700 bg-zinc-800">Clear</Button>
                  <Button
                    disabled={isSummaryLoading || !textChunks || textChunks.length === 0}
                    className="bg-gradient-to-r from-[#FF0000] to-[#FF5050] hover:shadow-lg hover:shadow-[#FF0000]/20 border-0 transition-all duration-200 text-xs px-3"
                    onClick={handleSummarize}
                    size="sm"
                  >
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    {isSummaryLoading ? "Analyzing..." : "Analyze Selection"}
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

          {/* Parsed Summary Sections */}
          {isSummaryLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
            >
              <VideoProcessingLoader />
            </motion.div>
          )}

          {!isSummaryLoading && parsedSummarySections && Object.keys(parsedSummarySections).length > 0 && (
            <>
              {parsedSummarySections["Overall Summary"] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-[#FF0000]" />
                    <h2 className="text-lg font-semibold">Overall Summary</h2>
                  </div>
                  <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60">
                    <Markdown className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:my-3 prose-h3:text-zinc-300 prose-h2:text-white prose-li:text-zinc-300">
                      {parsedSummarySections["Overall Summary"]}
                    </Markdown>
                  </div>
                </motion.div>
              )}

              {parsedSummarySections["Key Scenes/Events"] && Array.isArray(parsedSummarySections["Key Scenes/Events"]) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-[#FF0000]" />
                    <h2 className="text-lg font-semibold">Key Scenes/Events</h2>
                  </div>
                  <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60 space-y-3">
                    {(parsedSummarySections["Key Scenes/Events"] as ParsedKeyScene[]).map((scene, index) => {
                      const startTimeSeconds = scene.timestamp ? parseTimestampToSeconds(scene.timestamp) : null;
                      const isClickable = seekToTime && startTimeSeconds !== null;
                      return (
                        <div
                          key={index}
                          className={`p-3 bg-zinc-800/50 rounded-md border border-zinc-700/50 ${isClickable ? 'cursor-pointer hover:border-[#FF5050]/70 hover:bg-zinc-700/50' : ''}`}
                          onClick={() => {
                            if (isClickable && startTimeSeconds !== null) {
                              seekToTime(startTimeSeconds);
                            }
                          }}
                        >
                          {scene.timestamp && (
                            <p className={`text-xs font-mono mb-1 ${isClickable ? 'text-[#FF5050]' : 'text-zinc-400'}`}>
                              [{scene.timestamp}]
                            </p>
                          )}
                          <p className="text-sm text-zinc-300">{scene.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {parsedSummarySections["Objects and Elements"] && Array.isArray(parsedSummarySections["Objects and Elements"]) && (
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {/* Using Search as a generic icon for Objects/Elements */}
                      <Search className="w-5 h-5 text-[#FF0000]" />
                      <h2 className="text-lg font-semibold">Objects and Elements</h2>
                    </div>
                    <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60">
                      <ul className="list-disc list-inside space-y-1 text-sm text-zinc-300">
                        {(parsedSummarySections["Objects and Elements"] as string[]).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
              )}

              {parsedSummarySections["Sentiment Analysis"] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {/* Using Sparkles as a generic icon for Sentiment */}
                    <Sparkles className="w-5 h-5 text-[#FF0000]" />
                    <h2 className="text-lg font-semibold">Sentiment Analysis</h2>
                  </div>
                  <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60">
                    <Markdown className="prose prose-invert max-w-none prose-p:leading-relaxed">
                      {parsedSummarySections["Sentiment Analysis"]}
                    </Markdown>
                  </div>
                </motion.div>
              )}

              {parsedSummarySections["Actionable Insights (if any)"] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                     {/* Using FileText as a generic icon for Actionable Insights */}
                    <FileText className="w-5 h-5 text-[#FF0000]" />
                    <h2 className="text-lg font-semibold">Actionable Insights</h2>
                  </div>
                  <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60">
                    <Markdown className="prose prose-invert max-w-none prose-p:leading-relaxed">
                      {parsedSummarySections["Actionable Insights (if any)"]}
                    </Markdown>
                  </div>
                </motion.div>
              )}
            </>
          )}

          {!isSummaryLoading && !parsedSummarySections && summary && !rendererError && ( // Fallback for old summary or parse failure (and no active error)
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-[#FF0000]" />
                <h2 className="text-lg font-semibold">AI Summary (Raw)</h2>
              </div>
              <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700/60">
                <Markdown className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:my-3 prose-h3:text-zinc-300 prose-h2:text-white prose-li:text-zinc-300">{summary}</Markdown>
              </div>
            </motion.div>
          )}

          {!isSummaryLoading && !summary && !parsedSummarySections && !rendererError && ( // Message if no summary, no parsed sections, and no error
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl text-center"
            >
              <Sparkles className="w-8 h-8 text-[#FF0000] mx-auto mb-3" />
              <p className="text-zinc-300">Select transcript segments and click &quot;Analyze Selection&quot; to generate an AI analysis.</p>
              <p className="text-xs text-zinc-500 mt-1">If you&apos;ve already summarized, but see no results, the AI might not have provided a summary for the selection.</p>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
}

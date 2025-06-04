"use client";
import { analyzeVideoDirectly } from "../home/search-utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { LoadingPage } from "@/components/LoadingPage";
import { Button } from "@/components/ui/button";
import { Sparkles, Youtube, ExternalLink, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId");
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [player, setPlayer] = useState<any>(null);

  const youtubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
  };

  const handleAnalyze = async () => {
    if (!youtubeUrl) {
      setError("Invalid YouTube URL");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const result = await analyzeVideoDirectly(youtubeUrl);
      setAnalysis(result.data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!videoId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white p-4">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Video ID missing</h2>
        <p>Please provide a valid YouTube video ID.</p>
      </div>
    );
  }

  const playerOpts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto p-4 max-w-5xl">
        {/* Video Player */}
        <div className="mb-6 sticky top-4 z-50 rounded-xl overflow-hidden shadow-2xl border border-zinc-700/50">
          <YouTube videoId={videoId} opts={playerOpts} onReady={onPlayerReady} />
        </div>

        {/* Video Info Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#FF0000] to-[#FF5050] rounded-lg flex items-center justify-center shadow-lg">
                <Youtube className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                AI Video Analysis
              </h1>
              <p className="text-zinc-400 mt-1">
                Powered by Google Gemini 1.5 Pro
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a 
                href={youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span className="mr-1">View on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#FF0000] to-[#FF5050] hover:shadow-lg hover:shadow-[#FF0000]/20 border-0 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isLoading ? "Analyzing..." : "Analyze Video"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-6"
          >
            <LoadingPage message="AI is analyzing the video content..." />
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-500/50 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-6"
          >
            <h3 className="text-red-400 font-semibold mb-2">Analysis Error</h3>
            <p className="text-red-300">{error}</p>
          </motion.div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-[#FF0000]" />
              Video Analysis Results
            </h2>
            <div className="prose prose-invert max-w-none">
              <Markdown className="text-zinc-200 leading-relaxed">
                {analysis}
              </Markdown>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        {!analysis && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
            <p className="text-zinc-400">
              Click &ldquo;Analyze Video&rdquo; to get AI-powered insights about this video content.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

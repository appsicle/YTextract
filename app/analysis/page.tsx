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
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Video Player */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 border border-zinc-700/30 backdrop-blur-xl">
              <YouTube videoId={videoId} opts={playerOpts} onReady={onPlayerReady} />
            </div>

            {/* Video Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">AI Analysis</p>
                    <p className="text-xs text-zinc-500">Gemini 1.5 Pro</p>
                  </div>
                </div>
                <a 
                  href={youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 px-3 py-1.5 rounded-lg"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  <span>YouTube</span>
                </a>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/25"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Video
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Analysis Results */}
          <div className="space-y-6">

            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-zinc-700/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
              >
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-red-500/20 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-t-red-500 rounded-full animate-spin" />
                  </div>
                  <p className="mt-6 text-zinc-400 font-medium">AI is analyzing the video content...</p>
                  <p className="mt-2 text-zinc-500 text-sm">This may take a few moments</p>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-red-500/10 to-red-900/10 border border-red-500/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400">!</span>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-semibold mb-1">Analysis Error</h3>
                    <p className="text-red-300/80 text-sm">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-zinc-700/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 p-6 border-b border-zinc-700/30">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                      Video Analysis
                    </span>
                  </h2>
                  <p className="text-zinc-500 text-sm mt-2">AI-powered insights from your video</p>
                </div>
                <div className="p-6">
                  <div className="prose prose-invert prose-zinc max-w-none
                    prose-headings:text-zinc-100 prose-headings:font-semibold
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-strong:text-zinc-100 prose-strong:font-medium
                    prose-ul:text-zinc-300 prose-li:text-zinc-300
                    prose-code:text-red-400 prose-code:bg-zinc-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-blockquote:border-l-red-500 prose-blockquote:text-zinc-400">
                    <Markdown>{analysis}</Markdown>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Instructions */}
            {!analysis && !isLoading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 border border-zinc-700/30 backdrop-blur-xl rounded-2xl p-12 shadow-2xl"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    Ready to Analyze
                  </h3>
                  <p className="text-zinc-400 leading-relaxed max-w-md mx-auto">
                    Click &ldquo;Analyze Video&rdquo; to unlock AI-powered insights, summaries, and key takeaways from this video.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="w-4 h-4" />
                      <span>~30 seconds</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Gemini 1.5 Pro</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

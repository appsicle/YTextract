"use client";

import React, { useState } from "react";
import { validateUrl } from "./search-utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Youtube, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (!query.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }
    
    try {
      setIsLoading(true);
      const videoId = validateUrl(query);
      router.push(`/analysis?videoId=${encodeURIComponent(videoId)}`);
    } catch (err) {
      console.error(err);
      setError("Invalid YouTube URL. Please check and try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Youtube className="h-5 w-5 text-zinc-500" />
          </div>
          <Input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError("");
            }}
            placeholder="Paste YouTube URL here..."
            className={`w-full h-12 pl-10 pr-4 bg-black/40 border border-white/10 focus-visible:ring-[#FF0000]/30 focus-visible:border-[#FF0000]/50 rounded-lg ${
              error ? "border-red-500 focus-visible:border-red-500" : ""
            }`}
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          className={`h-12 px-6 bg-gradient-to-r from-[#FF0000] to-[#FF5050] text-white hover:shadow-lg hover:shadow-[#FF0000]/20 transition-all duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Loading...
            </>
          ) : (
            <>
              Convert
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center text-red-500 text-sm"
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </motion.div>
      )}
    </motion.form>
  );
};

"use client";

import React, { useState } from "react";
import { validateUrl } from "./search-utils";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/index";
import { ChevronRight } from "lucide-react";

export const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const videoId = validateUrl(query);
    router.push(`/analysis?videoId=${encodeURIComponent(videoId)}`);
  };

  // TODO: Make all routes come from some consts file

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="   Paste YouTube URL here..."
        className="w-full h-12 bg-black/40 border-0 focus-visible:ring-1 focus-visible:ring-white/20 rounded-lg"
      />
      <Button
        type="submit"
        className="h-12 px-6 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white transition-colors duration-200"
      >
        Convert
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

"use client";

import React, { useState } from "react";
import { validateUrl } from "./search-utils";
import { useRouter } from "next/navigation";

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
    <>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="w-full h-12 bg-black/40 border-0 focus-visible:ring-1 focus-visible:ring-white/20 rounded-lg"
        />
      </form>
    </>
  );
};

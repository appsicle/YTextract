"use client";
import { AnalysisRenderer } from "./analysis-renderer";
import { fetchVideoData } from "../home/search-utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import YouTube from "react-youtube"; // Import YouTube player
import { LoadingPage } from "@/components/LoadingPage";

const handleFetchVideoData = async (videoId: string) => {
  try {
    const response = await fetchVideoData(videoId);
    return { data: response, error: null };
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Failed to fetch transcript. Please try again.";
    return { data: null, error: errorMessage };
  }
};

export default function AnalysisContainer() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId");
  const [data, setData] = useState<any>(); // Consider a more specific type for data if available
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState("");
  const [player, setPlayer] = useState<any>(null); // State for the YouTube player instance

  useEffect(() => {
    if (!videoId) {
      setError("Video ID is missing.");
      setIsLoading(false);
      return;
    }
    // Only fetch data if videoId is present and not already loading/loaded (unless videoId changes)
    if (isLoading && videoId) {
      const getData = async () => {
        setError("");
        try {
          const { data: fetchedData, error: fetchError } = await handleFetchVideoData(videoId);
          if (fetchError) {
            setError(fetchError);
          } else if (fetchedData) {
            setData(fetchedData);
          }
        } catch (e: any) {
          setError(e.message || "An unexpected error occurred.");
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }
  }, [videoId, isLoading]); // Depend on videoId and isLoading to refetch if videoId changes or to start loading

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
  };

  const seekToTime = (timeInSeconds: number) => {
    if (player) {
      player.seekTo(timeInSeconds, true); // true allows seeking ahead
      player.playVideo(); // Optional: start playing after seek
    }
  };

  if (isLoading) {
    return <LoadingPage message="Fetching video data..." />;
  }

  if (error && !data) { // If there's an error and no data to display parts of the page
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white p-4">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Error loading video analysis</h2>
        <p>{error}</p>
        {/* You might want a button to go back or try again */}
      </div>
    );
  }

  // Default opts for the YouTube player
  const playerOpts = {
    height: '390',
    width: '100%', // Make it responsive
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {videoId && (
        <div className="mb-6 sticky top-4 z-50 rounded-xl overflow-hidden shadow-2xl border border-zinc-700/50">
          <YouTube videoId={videoId} opts={playerOpts} onReady={onPlayerReady} />
        </div>
      )}
      {/* Render AnalysisRenderer only if data is available */}
      {data ? (
        <AnalysisRenderer error={error} data={data} seekToTime={seekToTime} />
      ) : !isLoading && !error ? ( // If not loading, no error, but no data (e.g. initial state before videoId processed)
        <LoadingPage message="Preparing analysis viewer..." />
      ) : null /* Or some other placeholder if needed when data is absent but no error and not loading */ }
    </div>
  );
}

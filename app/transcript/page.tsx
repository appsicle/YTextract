"use client";
import ClipLoader from "react-spinners/ClipLoader";
import { Search } from "lucide-react";
import { SearchResults } from "@/app/transcript/search/search-results";
import { fetchVideoData } from "./search/search-utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function TranscriptOperationsPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const videoId = searchParams.get("videoId");
    if (isLoading || !videoId) return;

    const getData = async () => {
      setError("");

      const { data, error } = await handleFetchVideoData(videoId);

      if (error) {
        setError(error);
      } else if (data) {
        setData(data);
      }

      setIsLoading(false);
    };

    getData();
  }, [searchParams]);

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {isLoading ? (
          <ClipLoader color="white" loading={true} />
        ) : (
          <button type="submit" className="text-gray-400 hover:text-white">
            <Search size={20} />
          </button>
        )}
      </div>
      <SearchResults error={error} data={data} />
    </>
  );
}

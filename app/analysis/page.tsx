"use client";
import { AnalysisRenderer } from "./analysis-renderer";
import { fetchVideoData } from "../home/search-utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const videoId = searchParams.get("videoId");
    if (isLoading || !videoId) return;

    const getData = async () => {
      setError("");

      setIsLoading(true);
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

  return data ?<AnalysisRenderer error={error} data={data} /> : <LoadingPage />;
}

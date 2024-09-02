'use client';

import React, { useState } from 'react';
import { Search, } from 'lucide-react';
import ClipLoader from "react-spinners/ClipLoader";

interface ApiData {
  hook: string;
  title: string;
  thumbnail: string;
  points: string[];
  transcript: string[];
}

const mockData: ApiData = {
  "hook": "Have you ever wondered about the inner workings of online scams? This video takes you on an eye-opening journey behind the scenes of a Nigerian PS5 giveaway scam.",
  "title": "Exposing the Dark Side of Online Scams: A Firsthand Undercover Investigation",
  "thumbnail": "The thumbnail should feature a close-up image of the YouTuber's face with a concerned or intrigued expression, along with the title text overlaid. The background could be a blurred image of a computer screen or mobile device, hinting at the digital nature of the scam. The color scheme should be a mix of dark and bright tones to create a sense of mystery and intrigue.",
  "points": [
    "The YouTuber's personal experience and emotional response to the initial Facebook post about the grieving father offering a free PS5 sets the stage for the investigation.",
    "The discovery of multiple identical posts across Facebook, suggesting a coordinated scam, adds an element of mystery and raises questions about the true nature of the situation.",
    "The YouTuber's decision to go undercover and engage with the scammer directly provides a unique, first-hand perspective on how these scams operate, including the use of money mules and hacked Facebook accounts.",
    "The YouTuber's attempt to turn the tables on the scammer and ultimately teach him a lesson offers a satisfying conclusion and a message of empowerment for viewers.",
    "The YouTuber's final reflection on the importance of being grateful for one's own circumstances and the realization that there are always those worse off serves as a thought-provoking takeaway for the audience."
  ],
  "transcript": [
    "[HOOK] Have you ever wondered about the inner workings of online scams? This video takes you on an eye-opening journey behind the scenes of a Nigerian PS5 giveaway scam.",
    "[INTRODUCTION] The video begins with the YouTuber describing a Facebook post from a man named Harris Frank, who claimed his son was hit by a car and he wanted to give away the son's PS5 console. The YouTuber expresses sympathy for the father's situation and decides to reach out about the PS5.",
    "[INVESTIGATION] As the YouTuber communicates with Harris Frank, they become suspicious of the situation, noting that the story seems to be duplicated across multiple Facebook accounts. The YouTuber decides to investigate further, engaging with various scammers and uncovering the inner workings of the scam, including the use of money mules and hacked Facebook accounts.",
    "[UNDERCOVER OPERATION] The YouTuber goes undercover, posing as a potential victim and eventually gaining the trust of a scammer named Lance. Lance provides the YouTuber with instructions on how to become a money mule, including buying a hacked Facebook account and receiving money through CashApp to convert to Bitcoin.",
    "[TURNING THE TABLES] The YouTuber continues to play along with the scammer, eventually revealing their true identity and confronting Lance about the unethical nature of his actions. The YouTuber then teaches Lance a lesson by scamming him back, taking the money he had intended to steal.",
    "[REFLECTION] The video concludes with the YouTuber reflecting on the experience and the importance of being grateful for one's own circumstances, even in the face of those who are struggling and resorting to unethical means to get by. The YouTuber emphasizes the need to respond with empathy and understanding, rather than judgment.",
    "[OUTRO] The video ends with the YouTuber thanking the audience for their support and expressing a desire to continue sharing stories that provide insight into the world of online scams and the human experiences behind them."
  ]
};

const SearchBar = ({ onFetch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<ApiData | undefined>(undefined); // Added to store API response data
  const [isLoading, setIsLoading] = useState(false); // Added to track loading state

  const extractVideoId = (url: string) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setError('');
    setIsLoading(true); // Set loading state to true

    let videoId;
    if (query.includes('youtube.com/watch?v=')) {
      try {
        videoId = extractVideoId(query);
        if (!videoId) throw new Error('Invalid YouTube URL');
      } catch (err) {
        setError('Invalid YouTube URL. Please enter a valid URL.');
        setIsLoading(false); // Reset loading state
        return;
      }
    } else {
      setError('Please enter a valid YouTube URL.');
      setIsLoading(false); // Reset loading state
      return;
    }

    console.log('Video ID:', videoId);

    try {
      const response = await fetch(`/api?videoId=${videoId}`);
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      console.log('API response:', data);
      setData(data); // Store the API response data
      onFetch();
    } catch (err) {
      setError('Failed to fetch transcript. Please try again.');
      console.error('API error:', err);
    } finally {
      setIsLoading(false); // Reset loading state after fetch
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="w-full py-3 px-4 pr-12 bg-[#202222] text-white placeholder-gray-400 outline-none ring-2 ring-blue-500 rounded-lg"
        />
        {isLoading ? <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center"><ClipLoader color={'white'} loading={isLoading} /></div> :
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Search size={20} />
          </button>}
      </form>
      {isLoading && <h2 className="text-center mt-5 text-xl">AI is at work...</h2>} 
        <div className="text-left">
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {data && (
          <div className="mt-2">
            <h2 className="text-white text-xl font-bold mb-2">Hook 🎣</h2>
            <p className="text-gray-400">{data.hook}</p>
            <h2 className="text-white text-xl font-bold mt-4 mb-2">Title 📚</h2>
            <p className="text-gray-400">{data.title}</p>
            <h2 className="text-white text-xl font-bold mt-4 mb-2">Thumbnail Description 📷</h2>
            <p className="text-gray-400">{data.thumbnail}</p>
            <h2 className="text-white text-xl font-bold mt-4 mb-2">Points 🚀</h2>
            <ul className="list-disc list-inside text-gray-400">
              {data.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <h2 className="text-white text-xl font-bold mt-4 mb-2">Transcript 📜</h2>
            <ul className="list-disc list-inside text-gray-400">
              {data.transcript.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
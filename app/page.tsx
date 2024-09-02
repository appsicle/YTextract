"use client"

import React from 'react';
import SearchBar from './_components/Search';
import { ArrowRight, Play, List, FileText } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, textColor }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <Icon className="w-8 h-8 mb-4 text-blue-500" />
    <h4 className={`font-bold mb-2 ${textColor}`}>{title}</h4>
    <p className="text-gray-300">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
      <span className="text-2xl font-bold">{number}</span>
    </div>
    <h4 className="font-bold mb-2 text-green-400">{title}</h4>
    <p className="text-gray-300">{description}</p>
  </div>
);
export default function Home() {
  const [showInfo, setShowInfo] = React.useState(true);

  const handleDataFetch = () => {
    setShowInfo(false);
  };

  return (
    <div className="min-h-screen bg-[#191a1a] text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-2xl font-bold"><span className="text-[#ff2200]">YT</span>Extract</h1>
        </header>

        <main>
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Re-use Your <span className="text-[#ff2200]">YouTube</span> Video for <span className="text-[#00F2EA]">TikTok</span>/<span className="text-[#ed35a7]">Reels</span>/<span className="text-[#FFD700]">Shorts</span></h2>
            <p className="text-xl mb-8">🌱 Finding <span className="text-green-400">fresh</span>  ideas is the hardest part of content creation. 💡 <span className="text-green-400">Recycle</span> your ideas instead!</p>
            <div className="mb-8">
              <SearchBar onFetch={handleDataFetch} />
            </div>
          </section>


          {showInfo &&
            <div>
              <section className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-center text-blue-400">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <StepCard number="1" title="Paste URL 📎" description="Simply paste your YouTube video URL" />
                  <StepCard number="2" title="AI Analysis 🤖" description="Our AI analyzes your video content" />
                  <StepCard number="3" title="Get Ideas 💡" description="Receive tailored content suggestions" />
                </div>
              </section>

              <section className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-center">Key Features</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard icon={Play} title="Catchy Titles" description="Generate attention-grabbing titles for your shorts" textColor="text-blue-400" />
                  <FeatureCard icon={ArrowRight} title="Compelling Hooks" description="Craft irresistible opening lines to boost engagement" textColor="text-green-400" />
                  <FeatureCard icon={List} title="Discussion Points" description="Get key talking points to structure your content" textColor="text-yellow-400" />
                  <FeatureCard icon={FileText} title="Transcripts" description="Access accurate transcripts for easy editing" textColor="text-red-400" />
                </div>
              </section></div>}
        </main>

        <footer className="text-center text-gray-500">
          <p>&copy; Made with Next / Cursor / Claude 3.5 Sonnet. Improvements coming soon!</p>
        </footer>
      </div>
    </div>
  );
}
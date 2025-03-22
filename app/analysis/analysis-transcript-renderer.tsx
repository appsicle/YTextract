interface TranscriptRendererProps {
  data: string[];
}

export const TranscriptRenderer = ({ data }: TranscriptRendererProps) => {
  return (
    <>
      {/* Text Content */}
      <div className="space-y-2">
        {data.map((chunk: string, index: number) => (
          <p key={index} className="text-zinc-300 leading-relaxed">
            {chunk}
          </p>
        ))}
      </div>
    </>
  );
};

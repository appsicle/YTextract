export const TranscriptRenderer = ({ data }) => {
  return (
    <>
      {/* Text Content */}
      <div className="bg-[#2A2A2A] border border-[#3A3A3A] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Sample Text</h2>
        {data.map((chunk: string) => {
          return (
            <>
              <p className="text-gray-300 leading-relaxed">{chunk}</p>
              <br />
            </>
          );
        })}
      </div>
    </>
  );
};

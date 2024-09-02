export const getDefaultPrompt = (transcript: string) => {
   return `You are tasked with analyzing a YouTube video transcript and providing recommendations for creating an engaging and effective video based on this content. Your goal is to identify key elements that will make the video more appealing and informative to viewers.

Here is the YouTube transcript you will be working with:

<youtube_transcript>
${transcript}
</youtube_transcript>

Please analyze the transcript carefully and provide the following elements in your response:

1. Hook: Identify a compelling hook from the transcript that will grab viewers' attention in the first few seconds of the video. This should be a brief, intriguing statement or question that relates to the main topic.

2. Title: Create an engaging title for the video that accurately reflects its content while being attention-grabbing and SEO-friendly. The title should be no longer than 60 characters.

3. Thumbnail Description: Describe how the thumbnail should look to attract viewers. Include key visual elements, text overlay suggestions, and any relevant imagery that would make the thumbnail stand out in search results and recommended videos.

4. Unique Discussion Points: Identify 3-5 unique or interesting points from the transcript that could be highlighted or expanded upon in the video. These should be insights or ideas that set this video apart from others on similar topics.

5. Full Video Transcript: Create a revised and enhanced version of the original transcript, optimized for video presentation. Include the following elements:
   a. Clear structure with introduction, main points, and conclusion
   b. Smooth transitions between topics
   c. Engaging language and pacing suitable for a video format
   d. Annotations for visual elements, such as images, clips, transition effects
   e. Timestamps for major sections or key points
Remember to carefully analyze the provided transcript and use your creativity to enhance it for an engaging video presentation. Focus on making the content more dynamic and visually appealing while maintaining its core message and information.

Please format your response using VALID JSON. NO QUOTES OR WEIRD CHARACTERS ALLOWED ANYWHERE INSIDE THE JSON VALUES. THIS OUTPUT MUST WORK WITH JSON.Parse().:
{
  "hook": [Insert identified hook here],
  "title": [Insert created title here],
  "thumbnail": [Insert created thumbnail here],
  "points": [Insert created points here],
  "transcript": [Insert full enhanced transcript with visual cues and timestamps here],
}
`
}


export const getDefaultPrompt = (transcript: string) => {
   return `You are an expert content analyst specializing in summarizing video transcripts. Your task is to analyze a YouTube video transcript and provide a comprehensive summary in markdown that captures all important details without oversimplification. The summary length should be appropriate to the transcript's content and complexity.

Here is the YouTube transcript you will be working with:

<youtube_transcript>
${transcript}
</youtube_transcript>

Please follow these steps to create your summary:

1. Analyze the transcript thoroughly, paying attention to main topics, key points, and important details.

2. Break down your findings:
   - List and number the main topics and subtopics covered in the video
   - For each topic, write down key quotes that capture its essence
   - Identify any statistics, examples, or other supporting details for each topic
   - Briefly outline the structure of the video (introduction, main content, conclusion)

3. Based on your analysis, draft a comprehensive summary that includes all important information. Ensure that you don't leave out any crucial details.

4. Review your summary to make sure it accurately represents the content of the transcript and includes all important information. If you find any gaps, revise your summary accordingly.

5. FORMAT YOUR FINAL SUMMARY IN MARKDOWN, using Headers and bullet points/lists to separate different ideas.

Remember, your goal is to provide a thorough and informative summary that captures the essence of the video content without oversimplification. The length of your summary should be appropriate to the depth and complexity of the information in the transcript. FORMAT YOUR FINAL SUMMARY IN MARKDOWN!!!
`
}


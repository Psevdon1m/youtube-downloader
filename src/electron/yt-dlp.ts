import ffmpegPath from "ffmpeg-static";
import ytdlp from "yt-dlp-exec";

export const getVideoFormats = async (url: string): Promise<any> => {
  try {
    const result = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
    } as any);

    return result;
  } catch (error) {
    console.error("yt-dlp error:", error);
    throw error;
  }
};

export async function downloadVideo(
  url: string,
  format: string,
  outputPath: string
): Promise<any> {
  const cleanedFormat = format.replace("-drc", "");

  const options: any = {
    format: cleanedFormat,
    ffmpegLocation: ffmpegPath || undefined,
    output: `${outputPath}/%(title)s.%(ext)s`,
    mergeOutputFormat: "mp4",
  };

  console.log("Running yt-dlp with:", options);

  try {
    const result = await ytdlp(url, options);
    return result;
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}

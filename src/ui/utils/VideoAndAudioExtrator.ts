export type FormatInfo = {
  id: string;
  resolution: string;
  ext: string;
  filesize: number | null;
};

export type ExtractedFormats = {
  audio: { id: string };
  video: Partial<Record<"720p" | "1080p" | "1440p" | "2160p", FormatInfo>>;
};

export function extractBestAudioAndVideo(formats: any): ExtractedFormats {
  const audioCandidates = formats
    .filter((f: any) => f.vcodec === "none" && f.acodec !== "none")
    .sort((a: any, b: any) => (b.abr ?? 0) - (a.abr ?? 0));

  const bestAudio = audioCandidates[0];

  const resolutions = ["720", "1080", "1440", "2160"];

  const video: ExtractedFormats["video"] = {};

  for (const res of resolutions) {
    const candidates = formats.filter(
      (f: any) => f.vcodec !== "none" && f.height === parseInt(res)
    );

    if (candidates.length > 0) {
      const best = candidates.sort(
        (a: any, b: any) => (b.filesize ?? 0) - (a.filesize ?? 0)
      )[0];
      video[`${res}p` as keyof typeof video] = {
        id: best.format_id,
        resolution: `${best.height}p`,
        ext: best.ext,
        filesize: best.filesize ?? null,
      };
    }
  }

  return {
    audio: { id: bestAudio?.format_id ?? "unknown" },
    video,
  };
}

import { exec } from "child_process";
import ffmpegPath from "ffmpeg-static";

export const getVideoFormats = async (url: string) => {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -J --skip-download "${url}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

export function downloadVideo(url: string, format: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    const command = `yt-dlp -f ${format.replace(
      "-drc",
      ""
    )} --ffmpeg-location "${ffmpegPath}"  -o "${outputPath}/%(title)s" ${url}`;
    console.log({ command });

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

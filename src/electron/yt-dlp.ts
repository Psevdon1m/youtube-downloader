import { exec } from "child_process";

import ytdl from "ytdl-core";

export const getVideoFormats = async (url: string) => {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -J --skip-download "${url}"`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
};

export function downloadVideo(url: string, format: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    const command = `yt-dlp -f ${format.replace(
      "-drc",
      ""
    )} -o "${outputPath}/%(title)s" ${url}`;
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

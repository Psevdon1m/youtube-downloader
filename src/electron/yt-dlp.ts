import { exec } from "child_process";

export function downloadVideo(url: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    const command = `yt-dlp -f best -o "${outputPath}/%(title)s.%(ext)s" ${url}`;
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

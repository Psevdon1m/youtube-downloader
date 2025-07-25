import type { VideoFormats } from "@/ui/types/video-format";

export interface ElectronAPI {
  downloadVideo: (url: string, format: string) => Promise<string>;
  getVideoFormats: (url: string) => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

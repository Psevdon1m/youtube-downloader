import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  downloadVideo: (url: string) => ipcRenderer.invoke("download-video", url),
});

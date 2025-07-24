const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  downloadVideo: (url: string, format: string) =>
    ipcRenderer.invoke("download-video", url, format),
  getVideoFormats: (url: string) =>
    ipcRenderer.invoke("get-video-formats", url),
});

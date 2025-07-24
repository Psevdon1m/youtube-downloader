import { app, BrowserWindow, ipcMain } from "electron";

import path from "path";
import { fileURLToPath } from "url";
import { downloadVideo, getVideoFormats } from "./yt-dlp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  console.log({ __dirname });
  const win = new BrowserWindow({
    width: 1440,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../dist-electron/preload/index.js"),
      contextIsolation: true,
    },
  });
  win.webContents.openDevTools();

  win.loadFile(path.join(app.getAppPath(), "/dist-vue/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.handle("download-video", async (_, url, format) => {
  console.log({ url, format });

  const downloadsPath = app.getPath("downloads");
  return await downloadVideo(url, format, downloadsPath);
});
ipcMain.handle("get-video-formats", async (_, url) => {
  return await getVideoFormats(url);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

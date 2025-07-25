import { app, BrowserWindow, ipcMain, Tray } from "electron";

import path from "path";
import { fileURLToPath } from "url";
import { downloadVideo, getVideoFormats } from "./yt-dlp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let tray: Tray | null = null;

function createWindow() {
  console.log({ __dirname });
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../dist-electron/preload/index.js"),
      contextIsolation: true,
    },
  });
  // win.webContents.openDevTools();

  win.loadFile(path.join(app.getAppPath(), "/dist-vue/index.html"));

  const icon = path.join(
    app.getAppPath(),
    "/src/electron/assets/icons/youtube-tray.png"
  );

  tray = new Tray(icon);

  tray.on("click", () => {
    if (win.isVisible() === true) {
      win.hide();
    } else {
      win.show();
    }
  });
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
  tray?.destroy();
});

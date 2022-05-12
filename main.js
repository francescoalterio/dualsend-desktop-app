const { app, BrowserWindow } = require("electron");
const path = require("path");

//start server
require("./src/server/index.js");

try {
  require("electron-reloader")(module);
} catch (_) {}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 600,
    resizable: false,
    maximizable: false,
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
    },
  });
  win.removeMenu();
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

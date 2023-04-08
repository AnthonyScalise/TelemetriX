
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1630,
    minHeight: 925,
    icon: './images/small_logo.png',
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      contextIsolation: true,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'MainPage/index.html'));
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

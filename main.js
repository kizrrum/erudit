const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const { Menu } = require('electron');

function createWindow() {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  win.loadFile('index.html');
}

// Обработчик для чтения словаря из главного процесса
ipcMain.handle('read-dictionary', async () => {
  const dictPath = path.join(__dirname, 'words.txt');
  const data = fs.readFileSync(dictPath, 'utf-8');
  return data;
});

// Обработчик для получения списка MIDI-файлов
ipcMain.handle('get-midi-list', async () => {
  const musicDir = path.join(__dirname, 'music');
  if (!fs.existsSync(musicDir)) return [];
  const files = fs.readdirSync(musicDir);
  return files.filter(f => f.toLowerCase().endsWith('.mid'));
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
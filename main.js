const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const { Menu } = require('electron');  // добавь эту строку в начало main.js

function createWindow() {
  // Отключаем стандартное меню (Файл, Вид и т.д.) – останется только крестик
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

  // == УДАЛИ (или закомментируй) строку ниже перед финальной сборкой ==
  // win.webContents.openDevTools();
}
// Обработчик для чтения словаря из главного процесса
ipcMain.handle('read-dictionary', async () => {
  const dictPath = path.join(__dirname, 'words.txt');
  const data = fs.readFileSync(dictPath, 'utf-8');
  return data;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
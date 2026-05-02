const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDictionary: () => ipcRenderer.invoke('read-dictionary')
});
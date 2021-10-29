const { contextBridge, ipcMain ,ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  writeFile:(val)=>console.log(val,'1'),
  ipcRenderer
}
)
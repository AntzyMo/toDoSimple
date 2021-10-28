const { ipcMain} = require('electron')

ipcMain.on('writeFile',(event,arg)=>{
  console.log(event,arg,'event,arg')
})
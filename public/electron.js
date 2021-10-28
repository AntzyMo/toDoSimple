const { app, BrowserWindow, ipcMain } = require('electron')
// require('./file')
const path =require('path')

// 创建浏览器窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload:path.join(__dirname,'preload.js')
    }
  })

  win.loadURL('http://localhost:3000/')

  // 关闭window时触发下列事件.
  win.on('closed', function () {
    win = null
  })

}

// 监听初始化完成
app.whenReady().then(() => {
  createWindow()

   //监听应用打开 （macOs）
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  }
)})


// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('writeFile', (event, arg) => {
  console.log(event, arg, 'event,arg')
})
import path from 'path'
import { app, BrowserWindow, Menu, Tray, globalShortcut, Notification } from 'electron' // 清除标题栏
import './file'
const getIcon = path.resolve(__dirname, '../assets/favicon.ico') // 获取图标
const gotTheLock = app.requestSingleInstanceLock() // 监听多个窗口
const NODE_ENV = process.env.NODE_ENV
Menu.setApplicationMenu(null)

let tray = null // 托盘对象
let win = null

console.log('踩刹车时踩刹车1')

console.log(Notification.isSupported())

let notification = null

// 创建浏览器窗口
const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    ico: getIcon,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000/')
    win.webContents.toggleDevTools() // 打开调试工具
  } else {
    win.loadFile('./dist/index.html')
  }

  // 关闭window时触发下列事件.
  win.on('close', e => {
    e.preventDefault()
    win.hide()
    win.setSkipTaskbar(true)
  })
}

// 设置系统托盘

const setAppTray = () => {
  // 系统托盘图标目录
  tray = new Tray(getIcon)

  // 图标的上下文菜单  系统托盘右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click () {
        app.exit()
      }
    }
  ])

  // 监听鼠标单击
  tray.on('click', () => {
    const showwin = !win.isVisible()
    if (showwin) {
      win.show()
      win.setSkipTaskbar(false)
      return
    }

    win.hide()
    win.setSkipTaskbar(true)
  })

  // 设置此托盘图标的悬停提示内容
  tray.setToolTip('toDoSimple-待办事项')

  // 设置此图标的上下文菜单
  tray.setContextMenu(contextMenu)
}

// 监听初始化完成
app.whenReady().then(() => {
  if (!gotTheLock) return
  setAppTray()

  createWindow()

  // 监听应用打开 （macOs）
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  }
  )
})

app.on('ready', () => {
  notification = new Notification({
    title: '桌面通知！！！',
    body: '终于实现electron热加载啦！！！'
  })

  globalShortcut.register('ctrl+alt+a', () => {
    notification.show()
    console.log('快捷键2')
  })
})

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

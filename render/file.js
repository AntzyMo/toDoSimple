const { ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const baseFileUrl = (title = '') => `${path.join(__dirname, 'data', title)}`

// 封装读取文件
const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data))
    })
  })
}


// 封装写入文件
const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject(err)
        return
      }
      resolve('写入成功')
    })
  })
}





// 封装查找data文件夹里面的数据
const readdir = (file) => {
  return new Promise((resolve, reject) => {
    fs.readdir(file, 'utf8', (err, arr) => {
      if (err) {
        reject(err)
        return
      }
      resolve(arr)
    })
  })
}


// 封装删除文件
const deleteFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.unlink(url, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }

    })
  })
}


ipcMain.on('writeFile', async (event, arg) => {
  let { title } = arg
  let fileUrl = baseFileUrl(title) + '.json'

  try {
    // 先查找是否存在当前日期,有则放到第一位
    let { list, progress } = await readFile(fileUrl)
    let arr = [...arg.list, ...list]
    if (progress) {
      let num = Math.round(100 / arr.length)
      list.forEach(item => {
        if (item.checked) {
          arg.progress += num
        }
      })
    }
    arg.list = arr
  } finally {
    try {
      await writeFile(fileUrl, JSON.stringify(arg))
      event.reply('onWrite', { status: true })
    } catch (err) {
      event.reply('onWrite', { status: false, msg: err })
    }
  }

})


// 全部读取
// 单个读取

ipcMain.on('getFiles', async (event, arg) => {
  let fileUrl = null, FileArr = []
  if (arg) {
    // 单个读取
    fileUrl = baseFileUrl(arg) + '.json'
    FileArr = [readFile(fileUrl)]
  } else {
    // 获取的是文件名
    let filesArrName = await readdir(baseFileUrl())
    // 拼接绝对路径
    FileArr = filesArrName.map(item => readFile(baseFileUrl(item)))
  }


  try {
    let res = await Promise.all(FileArr)
    let handleArr = res.reverse()
    event.reply('getFile', handleArr)
  } catch (err) {
    console.log(err, 'err111')
  }
})


// 删除文件
ipcMain.on('deleteFile', async (event, { title, index }) => {
  let fileUrl = baseFileUrl(title) + '.json'
  try {
    if (index!=undefined) {
      let json = await readFile(fileUrl)
      json.list.splice(index, 1)
      console.log( json.list,' json.list')
      await writeFile(fileUrl, JSON.stringify(json))
      console.log('ccc')
    } else {
      await deleteFile(fileUrl)
    }

    event.reply('onDelete', { status: true })
  } catch (err) {
    console.log(err, 'err333')
    event.reply('onDelete', { status: false, msg: err })

  }
})



// 修改文件
ipcMain.on('updateFile', async (event, { title, list, progress }) => {
  let fileUrl = baseFileUrl(title) + '.json'
  let json = await readFile(fileUrl)
  json.progress = progress
  json.list = list
  writeFile(fileUrl, JSON.stringify(json))
})













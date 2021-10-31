const { createCipheriv } = require('crypto')
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
      console.log(err, 'err')
      if (err) {
        reject(err)
        return
      }
      resolve(arr)
    })
  })
}


// 封装删除文件
// url.replace(/\\/g, "/")
 function deleteFile(url) {
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
  console.log(arg, 'are')
  try {
    await writeFile(fileUrl, JSON.stringify(arg))
    event.reply('onWrite', { status: true })
  } catch (err) {
    event.reply('onWrite', { status: false, msg: err })

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
    console.log(res, 'res')
    event.reply('getFile', res)
  } catch (err) {
    console.log(err, 'err111')
  }
})


// 删除文件
ipcMain.on('deleteFile', async (event, arg) => {
 let fileUrl = baseFileUrl(arg) + '.json'
 try{
   await deleteFile(fileUrl)
   event.reply('onDelete',{status:true})
 }catch(err){
   console.log(err,'err')
   event.reply('onDelete',{status:false,msg:err})

 }
 
})















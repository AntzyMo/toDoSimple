const { ipcMain } = require('electron')
const fs = require('fs')
const { reject } = require('lodash')
const { resolve } = require('path')
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
      console.log(data, 'data')
      resolve(data)
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


ipcMain.on('writeFile', async (event, arg) => {
  let { title } = arg
  let fileUrl = baseFileUrl(title) + '.json'
  try {
    await writeFile(fileUrl, JSON.stringify(arg))
    event.reply('onWrite', true)
  } catch (err) {
    event.reply('onWrite', err)

  }
})


// 全部读取
// 单个读取

ipcMain.on('getFiles', async (event, arg) => {
  let fileUrl = null
  if(arg){
    // 单个读取
    fileUrl=  baseFileUrl(arg) + '.json'
    return 
  }

  fileUrl =baseFileUrl()
  let filesArrName=await readdir(fileUrl)
  fileUrl=baseFileUrl(filesArrName[0])
  console.log(filesArrName,'filesArrName')
  console.log(fileUrl,'fileUrl')
  try {
    let data=await readFile(fileUrl, JSON.stringify(arg))
    console.log(data,'daa')
    event.reply('getFile',[data])
  } catch (err) {

  }
})















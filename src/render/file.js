const { ipcMain } = require('electron')
const fs = require('fs')
const path=require('path')
const baseFileUrl=(title)=>`${path.join(__dirname,'data',title)}.json`

// 封装读取文件
const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      console.log(data,'data')
      resolve(data)
    })
  })
}


// 封装写入文件
const writeFile=(file,data)=>{
  return new Promise((resolve,reject)=>{
    fs.writeFile(file,data,err=>{
      if(err){
        reject(err)
        return 
      }
      resolve('写入成功')
    })
  })
}


ipcMain.on('writeFile', async (event, arg) => {
  let { title } = arg
  let fileUrl=baseFileUrl(title)
  try{
    await writeFile(fileUrl,JSON.stringify(arg))
    event.reply('onWrite',true)
  }catch(err){
    event.reply('onWrite',err)

  }
})


// 全部读取
// 单个读取

ipcMain.on('readFile', async (event, arg) => {
  let fileUrl=baseFileUrl(arg)
  console.log(fileUrl,'fileUrl')
  try{
    await readFile(fileUrl,JSON.stringify(arg))
  }catch(err){

  }
})











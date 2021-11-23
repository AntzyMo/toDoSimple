const webpack =require('webpack')
const config =require('./webpack.config')
const { spawn ,execFile,exec} = require('child_process')
const electron =require('electron')
const compiler=webpack(config)

const wacthing =compiler.watch(null,(err,status)=>{
  console.log('修改成功！')

  // 执行命令
  const child=exec('npm run start')

  child.stdout.on('data', data => {
    console.log('stdout 输出:', data);
  })

  child.stderr.on('data', err => {
    console.log('error 输出:', err);
  })

})
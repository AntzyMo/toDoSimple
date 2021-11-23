/** @type {import('webpack').Configuration} */
const path =require('path')

module.exports={
  mode:"development",
  target:'electron-main',
  entry:path.resolve(__dirname ,'electron.js'),
  output:{
    path:path.resolve(__dirname ,'dist'),
    filename:'index.js',
    clean:true
  },
  externals: {
    'shortcut-capture': 'require("shortcut-capture")'
  },
  
}
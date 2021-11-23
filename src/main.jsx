import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './layout/App'
import store from './store'
import 'animate.css'
import { Provider, connect } from 'react-redux'
// const ElectronShortcutCapture =require('electron-shortcut-capture')
// console.log(ElectronShortcutCapture)
//  ElectronShortcutCapture({multiScreen: false,onShow(){
//   console.log(111)
// }})
// import ElectronShortcutCapture from 'electron-shortcut-capture'
// const electronShortcutCapture = new ElectronShortcutCapture({multiScreen: false})
// console.log(electronShortcutCapture,'electronShortcutCapture')
// electronShortcutCapture.show()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

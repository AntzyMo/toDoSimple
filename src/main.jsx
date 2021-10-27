import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './layout/App'
import store from './store'
import 'animate.css'
import { Provider, connect } from 'react-redux'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

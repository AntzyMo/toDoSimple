/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/electron-screenshots/lib/event.js":
/*!********************************************************!*\
  !*** ./node_modules/electron-screenshots/lib/event.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Event = /** @class */ (function () {\n    function Event() {\n        this.defaultPrevented = false;\n    }\n    Event.prototype.preventDefault = function () {\n        this.defaultPrevented = true;\n    };\n    return Event;\n}());\nexports[\"default\"] = Event;\n\n\n//# sourceURL=webpack://todosimple/./node_modules/electron-screenshots/lib/event.js?");

/***/ }),

/***/ "./node_modules/electron-screenshots/lib/getBoundAndDisplay.js":
/*!*********************************************************************!*\
  !*** ./node_modules/electron-screenshots/lib/getBoundAndDisplay.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar electron_1 = __webpack_require__(/*! electron */ \"electron\");\nexports[\"default\"] = (function () {\n    var point = electron_1.screen.getCursorScreenPoint();\n    var _a = electron_1.screen.getDisplayNearestPoint(point), id = _a.id, bounds = _a.bounds, workArea = _a.workArea;\n    // win32 darwin linux??????????????????\n    var display = process.platform === 'linux' ? workArea : bounds;\n    return {\n        bound: {\n            x: bounds.x,\n            y: bounds.y,\n            width: bounds.width,\n            height: bounds.height\n        },\n        display: {\n            id: id,\n            x: display.x,\n            y: display.y,\n            width: display.width,\n            height: display.height\n        }\n    };\n});\n\n\n//# sourceURL=webpack://todosimple/./node_modules/electron-screenshots/lib/getBoundAndDisplay.js?");

/***/ }),

/***/ "./node_modules/electron-screenshots/lib/padStart0.js":
/*!************************************************************!*\
  !*** ./node_modules/electron-screenshots/lib/padStart0.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/**\n * ??????string????????????????????? length ????????????????????????\n * ????????????length?????????????????????????????????\n * @param {number} num\n * @param {number} len\n */\nexports[\"default\"] = (function (num, len) {\n    if (len === void 0) { len = 2; }\n    var str = String(num);\n    while (str.length < len) {\n        str = \"0\" + str;\n    }\n    return str;\n});\n\n\n//# sourceURL=webpack://todosimple/./node_modules/electron-screenshots/lib/padStart0.js?");

/***/ }),

/***/ "./node_modules/electron-screenshots/lib/screenshots.js":
/*!**************************************************************!*\
  !*** ./node_modules/electron-screenshots/lib/screenshots.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar electron_1 = __webpack_require__(/*! electron */ \"electron\");\nvar fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nvar event_1 = __importDefault(__webpack_require__(/*! ./event */ \"./node_modules/electron-screenshots/lib/event.js\"));\nvar events_1 = __importDefault(__webpack_require__(/*! events */ \"events\"));\nvar padStart0_1 = __importDefault(__webpack_require__(/*! ./padStart0 */ \"./node_modules/electron-screenshots/lib/padStart0.js\"));\nvar getBoundAndDisplay_1 = __importDefault(__webpack_require__(/*! ./getBoundAndDisplay */ \"./node_modules/electron-screenshots/lib/getBoundAndDisplay.js\"));\nvar Screenshots = /** @class */ (function (_super) {\n    __extends(Screenshots, _super);\n    function Screenshots() {\n        var _this = _super.call(this) || this;\n        // ??????????????????\n        _this.$win = null;\n        _this.listenIpc();\n        return _this;\n    }\n    /**\n     * ????????????\n     */\n    Screenshots.prototype.startCapture = function () {\n        var _this = this;\n        if (this.$win && !this.$win.isDestroyed())\n            this.$win.close();\n        var _a = getBoundAndDisplay_1.default(), bound = _a.bound, display = _a.display;\n        this.$win = this.createWindow(bound);\n        electron_1.ipcMain.once('SCREENSHOTS::DOM-READY', function () {\n            if (!_this.$win)\n                return;\n            _this.$win.webContents.send('SCREENSHOTS::SEND-DISPLAY-DATA', display);\n        });\n        // ??????????????????????????????\n        // ?????????????????????????????????\n        electron_1.ipcMain.once('SCREENSHOTS::CAPTURED', function () {\n            if (!_this.$win)\n                return;\n            // linux????????????????????????????????????false???????????????????????????\n            _this.$win.setFullScreen(true);\n            _this.$win.show();\n            _this.$win.focus();\n        });\n    };\n    /**\n     * ????????????\n     */\n    Screenshots.prototype.endCapture = function () {\n        if (!this.$win)\n            return;\n        this.$win.setSimpleFullScreen(false);\n        this.$win.close();\n        this.$win = null;\n    };\n    /**\n     * ???????????????\n     */\n    Screenshots.prototype.createWindow = function (_a) {\n        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;\n        var $win = new electron_1.BrowserWindow({\n            title: 'screenshots',\n            x: x,\n            y: y,\n            width: width,\n            height: height,\n            useContentSize: true,\n            frame: false,\n            show: false,\n            autoHideMenuBar: true,\n            transparent: true,\n            resizable: false,\n            movable: false,\n            focusable: true,\n            // ???true????????????????????????\n            // ??????????????????????????????????????????true\n            // ??????48-49???\n            fullscreen: false,\n            // ??????true mac????????????????????????????????????\n            simpleFullscreen: true,\n            backgroundColor: '#00000000',\n            titleBarStyle: 'hidden',\n            alwaysOnTop: true,\n            enableLargerThanScreen: true,\n            skipTaskbar: true,\n            minimizable: false,\n            maximizable: false,\n            webPreferences: {\n                nodeIntegration: true,\n                contextIsolation: false\n            }\n        });\n        $win.loadURL(\"file://\" + /*require.resolve*/(/*! react-screenshots/dist/index.html */ \"./node_modules/react-screenshots/dist/index.html\"));\n        return $win;\n    };\n    /**\n     * ??????ipc????????????\n     */\n    Screenshots.prototype.listenIpc = function () {\n        var _this = this;\n        /**\n         * OK??????\n         */\n        electron_1.ipcMain.on('SCREENSHOTS::OK', function (e, data) {\n            var event = new event_1.default();\n            _this.emit('ok', event, data);\n            if (!event.defaultPrevented) {\n                electron_1.clipboard.writeImage(electron_1.nativeImage.createFromDataURL(data.dataURL));\n                _this.endCapture();\n            }\n        });\n        /**\n         * CANCEL??????\n         */\n        electron_1.ipcMain.on('SCREENSHOTS::CANCEL', function () {\n            var event = new event_1.default();\n            _this.emit('cancel', event);\n            if (!event.defaultPrevented) {\n                _this.endCapture();\n            }\n        });\n        /**\n         * SAVE??????\n         */\n        electron_1.ipcMain.on('SCREENSHOTS::SAVE', function (e, data) {\n            var event = new event_1.default();\n            _this.emit('save', event, data);\n            if (!event.defaultPrevented) {\n                if (!_this.$win)\n                    return;\n                var time = new Date();\n                var year = time.getFullYear();\n                var month = padStart0_1.default(time.getMonth() + 1);\n                var date = padStart0_1.default(time.getDate());\n                var hours = padStart0_1.default(time.getHours());\n                var minutes = padStart0_1.default(time.getMinutes());\n                var seconds = padStart0_1.default(time.getSeconds());\n                var milliseconds = padStart0_1.default(time.getMilliseconds(), 3);\n                _this.$win.setAlwaysOnTop(false);\n                electron_1.dialog\n                    .showSaveDialog(_this.$win, {\n                    title: '????????????',\n                    defaultPath: \"\" + year + month + date + hours + minutes + seconds + milliseconds + \".png\"\n                })\n                    .then(function (_a) {\n                    var canceled = _a.canceled, filePath = _a.filePath;\n                    if (!_this.$win)\n                        return;\n                    _this.$win.setAlwaysOnTop(true);\n                    if (canceled || !filePath)\n                        return;\n                    fs_1.default.writeFile(filePath, Buffer.from(data.dataURL.replace(/^data:image\\/\\w+;base64,/, ''), 'base64'), function (err) {\n                        if (err)\n                            return;\n                        _this.endCapture();\n                    });\n                });\n            }\n        });\n    };\n    return Screenshots;\n}(events_1.default));\nexports[\"default\"] = Screenshots;\n\n\n//# sourceURL=webpack://todosimple/./node_modules/electron-screenshots/lib/screenshots.js?");

/***/ }),

/***/ "./node_modules/react-screenshots/dist/index.html":
/*!********************************************************!*\
  !*** ./node_modules/react-screenshots/dist/index.html ***!
  \********************************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> <!doctype html><html><head><meta charset=\\\"utf-8\\\"/><meta name=\\\"viewport\\\" content=\\\"width=device-width,initial-scale=1\\\"/><title>react-screenshots</title><script defer=\\\"defer\\\" src=\\\"js/app.031ff0aaadaaf60aa9c4.js\\\"></script><link href=\\\"css/app.0cafb2fb87f23262257e.css\\\" rel=\\\"stylesheet\\\"></head><body><noscript><strong>??????????????????JavaScript???????????????????????????????????????JavaScript???</strong></noscript><div id=\\\"app\\\"></div></body></html>\");\n\n//# sourceURL=webpack://todosimple/./node_modules/react-screenshots/dist/index.html?");

/***/ }),

/***/ "./render/electron.js":
/*!****************************!*\
  !*** ./render/electron.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var electron_screenshots__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron-screenshots */ \"./node_modules/electron-screenshots/lib/screenshots.js\");\n/* harmony import */ var electron_screenshots__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron_screenshots__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./file */ \"./render/file.js\");\n\n\nconst getIcon = path__WEBPACK_IMPORTED_MODULE_0___default().resolve(__dirname, '../assets/favicon.ico') //????????????\nconst gotTheLock = electron__WEBPACK_IMPORTED_MODULE_1__.app.requestSingleInstanceLock() // ??????????????????\nconst NODE_ENV = \"development\"\n;\nelectron__WEBPACK_IMPORTED_MODULE_1__.Menu.setApplicationMenu(null) // ???????????????\n;\n\nconsole.log(111)\n\nlet tray = null // ????????????\nlet win = null\n\nconsole.log('?????????????????????a1')\nconsole.log('?????????????????????a1')\n\n\n\n\nconsole.log(electron__WEBPACK_IMPORTED_MODULE_1__.Notification.isSupported())\n\nlet notification = null\n\n// ?????????????????????\nconst createWindow = () => {\n  win = new electron__WEBPACK_IMPORTED_MODULE_1__.BrowserWindow({\n    width: 1000,\n    height: 700,\n    ico: getIcon,\n    webPreferences: {\n      devTools: true,\n      nodeIntegration: true,\n      contextIsolation: false\n    }\n  })\n\n\n  if (NODE_ENV === 'development') {\n    win.loadURL('http://localhost:3000/')\n    win.webContents.toggleDevTools() //??????????????????\n  } else {\n    win.loadFile('./dist/index.html')\n  }\n\n  // ??????window?????????????????????.\n  win.on('close', e => {\n    e.preventDefault()\n    win.hide()\n    win.setSkipTaskbar(true)\n  })\n\n\n}\n\n// ??????????????????\n\nconst setAppTray = () => {\n  // ????????????????????????\n  tray = new electron__WEBPACK_IMPORTED_MODULE_1__.Tray(getIcon)\n\n  // ????????????????????????  ????????????????????????\n  const contextMenu = electron__WEBPACK_IMPORTED_MODULE_1__.Menu.buildFromTemplate([\n    {\n      label: '??????',\n      click() {\n        electron__WEBPACK_IMPORTED_MODULE_1__.app.exit()\n      }\n    }\n  ])\n\n  // ??????????????????\n  tray.on('click', () => {\n    let showwin = !win.isVisible()\n    if (showwin) {\n      win.show()\n      win.setSkipTaskbar(false)\n      return\n    }\n\n    win.hide()\n    win.setSkipTaskbar(true)\n\n\n  })\n\n  // ??????????????????????????????????????????\n  tray.setToolTip('toDoSimple-????????????')\n\n  // ?????????????????????????????????\n  tray.setContextMenu(contextMenu)\n}\n\n\n// ?????????????????????\nelectron__WEBPACK_IMPORTED_MODULE_1__.app.whenReady().then(() => {\n  if (!gotTheLock) return\n  setAppTray()\n\n  createWindow()\n\n  //?????????????????? ???macOs???\n  electron__WEBPACK_IMPORTED_MODULE_1__.app.on('activate', () => {\n    if (electron__WEBPACK_IMPORTED_MODULE_1__.BrowserWindow.getAllWindows().length === 0) {\n      createWindow()\n    }\n  }\n  )\n})\n\nlet shots = null\nelectron__WEBPACK_IMPORTED_MODULE_1__.app.on('ready', () => {\n  notification = new electron__WEBPACK_IMPORTED_MODULE_1__.Notification({\n    title: '?????????????????????',\n    body: '????????????electron?????????????????????'\n  })\n\n  shots = new (electron_screenshots__WEBPACK_IMPORTED_MODULE_2___default())()\n  electron__WEBPACK_IMPORTED_MODULE_1__.globalShortcut.register('ctrl+alt+a', () => {\n    // notification.show()\n    console.log('?????????2')\n\n    shots.startCapture()\n    shots.on('save', (e, data) => {\n      // ?????????????????????????????????\n      // ??????????????????????????????\n      // e.preventDefault()\n      // ??????????????????????????????????????????\n      console.log('capture', data)\n    })\n  })\n\n})\n\n\n// ?????????????????????????????????.\nelectron__WEBPACK_IMPORTED_MODULE_1__.app.on('window-all-closed', () => {\n  // macOS????????????????????? `Cmd + Q` ????????????,????????????????????????????????????????????????.\n  if (process.platform !== 'darwin') {\n    electron__WEBPACK_IMPORTED_MODULE_1__.app.quit()\n  }\n})\n\n\n//# sourceURL=webpack://todosimple/./render/electron.js?");

/***/ }),

/***/ "./render/file.js":
/*!************************!*\
  !*** ./render/file.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst baseFileUrl= (title='')=>`${path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../data', title)}`\n\n// ??????????????????\nconst readFile = file => {\n  return new Promise((resolve, reject) => {\n    fs__WEBPACK_IMPORTED_MODULE_1___default().readFile(file, 'utf8', (err, data) => {\n      if (err) {\n        reject(err)\n        return\n      }\n      resolve(JSON.parse(data))\n    })\n  })\n}\n\n\n// ??????????????????\nconst writeFile = (file, data) => {\n  return new Promise((resolve, reject) => {\n    fs__WEBPACK_IMPORTED_MODULE_1___default().writeFile(file, data, err => {\n      if (err) {\n        reject(err)\n        return\n      }\n      resolve('????????????')\n    })\n  })\n}\n\n\n\n// ????????????data????????????????????????\nconst readdir = (file) => {\n  return new Promise((resolve, reject) => {\n    fs__WEBPACK_IMPORTED_MODULE_1___default().readdir(file, 'utf8', (err, arr) => {\n      if (err) {\n        reject(err)\n        return\n      }\n      resolve(arr)\n    })\n  })\n}\n\n\n// ??????????????????\nconst deleteFile = (url) => {\n  return new Promise((resolve, reject) => {\n    fs__WEBPACK_IMPORTED_MODULE_1___default().unlink(url, err => {\n      if (err) {\n        reject(err)\n      } else {\n        resolve()\n      }\n\n    })\n  })\n}\n\n\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on('writeFile', async (event, arg) => {\n  let { title } = arg\n  let fileUrl = baseFileUrl(title) + '.json'\n\n  try {\n    // ?????????????????????????????????,?????????????????????\n    let { list, progress } = await readFile(fileUrl)\n    let arr = [...arg.list, ...list]\n    if (progress) {\n      let num = Math.round(100 / arr.length)\n      list.forEach(item => {\n        if (item.checked) {\n          arg.progress += num\n        }\n      })\n    }\n    arg.list = arr\n  } finally {\n    try {\n      await writeFile(fileUrl, JSON.stringify(arg))\n      event.reply('onWrite', { status: true })\n    } catch (err) {\n      event.reply('onWrite', { status: false, msg: err })\n    }\n  }\n\n})\n\n\n// ????????????\n// ????????????\n\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on('getFiles', async (event, arg) => {\n  let fileUrl = null, FileArr = []\n  if (arg) {\n    // ????????????\n    fileUrl = baseFileUrl(arg) + '.json'\n    FileArr = [readFile(fileUrl)]\n  } else {\n    // ?????????????????????\n    let filesArrName = await readdir(baseFileUrl())\n    // ??????????????????\n    FileArr = filesArrName.map(item => readFile(baseFileUrl(item)))\n  }\n\n\n  try {\n    let res = await Promise.all(FileArr)\n    let handleArr = res.reverse()\n    event.reply('getFile', handleArr)\n  } catch (err) {\n    console.log(err, 'err111')\n  }\n})\n\n\n// ????????????\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on('deleteFile', async (event, { title, index }) => {\n  let fileUrl = baseFileUrl(title) + '.json'\n  try {\n    if (index!=undefined) {\n      let json = await readFile(fileUrl)\n      json.list.splice(index, 1)\n      console.log( json.list,' json.list')\n      await writeFile(fileUrl, JSON.stringify(json))\n      console.log('ccc')\n    } else {\n      await deleteFile(fileUrl)\n    }\n\n    event.reply('onDelete', { status: true })\n  } catch (err) {\n    console.log(err, 'err333')\n    event.reply('onDelete', { status: false, msg: err })\n\n  }\n})\n\n\n\n// ????????????\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on('updateFile', async (event, { title, list, progress }) => {\n  let fileUrl = baseFileUrl(title) + '.json'\n  let json = await readFile(fileUrl)\n  json.progress = progress\n  json.list = list\n  writeFile(fileUrl, JSON.stringify(json))\n})\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://todosimple/./render/file.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./render/electron.js");
/******/ 	
/******/ })()
;
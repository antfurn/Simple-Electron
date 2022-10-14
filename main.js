'use strict'
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require("fs")

const createWindow = () => {
  // Read Setting files
  let settingsData = fs.readFileSync('pmtsBlanking.json');
  let jSettings = JSON.parse(settingsData);
  console.log(jSettings);
  // console.log(jSettings.default_url);

  let browserCfg = jSettings.BrowserWindowCfg[jSettings.config_set]
  let webPreferences = {
      preload: path.join(__dirname, 'preload.js')
    }
  browserCfg.webPreferences = webPreferences
  if (!browserCfg.hasOwnProperty('width'))  {
    browserCfg.width = 800,
    browserCfg.height = 600
  }

  console.log(browserCfg);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    browserCfg
  })

  
  // frame: jSettings.frame,
  // autoHideMenuBar: jSettings.autoHideMenuBar,
  // alwaysOnTop: jSettings.alwaysOnTop,
  // darkTheme: jSettings.darkTheme,

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  // mainWindow.loadURL('http://google.com')
  // mainWindow.loadURL('https://www.theracecentre.co.uk/')

  mainWindow.loadURL(jSettings.default_url)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
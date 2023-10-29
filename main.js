// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
const path = require('path')
// const {ipcMain} = require('electron')  
const remote = require('@electron/remote/main');
remote.initialize()


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
    }
  })
  remote.enable(mainWindow.webContents);


  // and load the index.html of the app.
//   mainWindow.loadFile('tray.html')
//   mainWindow.loadFile('index.html')
//   mainWindow.loadFile('node-notifier.html')
//   mainWindow.loadFile('webview.html')
//   mainWindow.loadFile('definingShortcuts.html')


  // Open the DevTools.
  mainWindow.webContents.openDevTools();


}

const template = [
  {
     label: 'Edit',
     submenu: [
        {
           role: 'undo'
        },
        {
           role: 'redo'
        },
        {
           type: 'separator'
        },
        {
           role: 'cut'
        },
        {
           role: 'copy'
        },
        {
           role: 'paste'
        }
     ]
  },
  
  {
     label: 'View',
     submenu: [
        {
           role: 'reload'
        },
        {
           role: 'toggledevtools'
        },
        {
           type: 'separator'
        },
        {
           role: 'resetzoom'
        },
        {
           role: 'zoomin'
        },
        {
           role: 'zoomout'
        },
        {
           type: 'separator'
        },
        {
           role: 'togglefullscreen'
        }
     ]
  },
  
  {
     role: 'window',
     submenu: [
        {
           role: 'minimize'
        },
        {
           role: 'close'
        }
     ]
  },
  
  {
     role: 'help',
     submenu: [
        {
           label: 'Learn More'
        }
     ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// ipcMain.on('openFile', (event, data) => { 
//   console.log(event, data, 'event, path');
//   const {dialog} = require('electron') 
//   const fs = require('fs') 
//   const fileNames = dialog.showOpenDialogSync({properties: ['openFile', 'openDirectory']})
//   // (function (fileNames) { 
     
//   //    // fileNames is an array that contains all the selected 
//      if(fileNames === undefined) { 
//         console.log("No file selected"); 
     
//      } else { 
//       console.log(fileNames, 'fileNames');
//         readFile(fileNames[0]); 
//      } 
//   // });
  
//   function readFile(filepath) { 
//      fs.readFile(filepath, 'utf-8', (err, data) => { 
        
//         if(err){ 
//            alert("An error ocurred reading the file :" + err.message) 
//            return 
//         } 
        
//         // handle the file content 
//         event.sender.send('fileData', data) 
//      }) 
//   } 
// })  

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

  // Register a 'CommandOrControl+X' shortcut listener.
   const ret = globalShortcut.register('CommandOrControl+X', () => {
      console.log('CommandOrControl+X is pressed')
   })

   if (!ret) {
      console.log('registration failed')
   }

   // Check whether a shortcut is registered.
   console.log(globalShortcut.isRegistered('CommandOrControl+X'))


   app.on('will-quit', () => {
      // Unregister a shortcut.
      globalShortcut.unregister('CommandOrControl+X')
   
      // Unregister all shortcuts.
      globalShortcut.unregisterAll()
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

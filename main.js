const {app, BrowserWindow, ipcMain, Menu, globalShortcut, dialog, Notification} = require('electron')
const path = require('path')

let win

const isDev = process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development"? true:false

app.setName("Myth Bot")

function createWindow(){
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, '/src' ,'icon.png'),
        fullscreen: true,
        show: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    win.loadFile('./src/index.html')
    if(isDev){
        win.webContents.openDevTools()
    }

    win.once('ready-to-show', ()=>{
        win.show()
    })

    ipcMain.on('redirect-to-client', () => {
        const newPath = path.join(__dirname, '/src/index.html')
        win.loadFile(newPath)
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)

    globalShortcut.register('Shift+I', () => {
        win.webContents.openDevTools()
      })

    ipcMain.on('open-dialog', (event) => {
        dialog.showOpenDialog(win, { properties: ['openDirectory'] }).then(result => {
          event.sender.send('selected-folder', result.filePaths);
        })
    })
}

app.whenReady().then(()=>{
    createWindow()
})

app.on('window-all-closed', ()=>{
    console.log("Todas as janelas foram fechadas!")
    app.quit()
})

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
})
  
app.on('will-quit', function () {
    globalShortcut.unregisterAll();
})

ipcMain.on('close-window', () => {
    win.close()
})

ipcMain.on('minimize-window', () => {
    win.minimize()
})

const menuTemplate = [

]
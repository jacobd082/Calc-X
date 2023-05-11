const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')


let menuTemplate = [
    {
        label: "Window Manager",
        submenu: [
            {
                label: "Clear",
                accelerator: process.platform === 'darwin' ? 'Command+Shift+C' : 'Ctrl+Shift+C',
                click: (nsp, window) => {
                    window.reload()
                }
            },
            {
                label: 'Toggle Developer Tools',
                click (item, focusedWindow) {
                  if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                label: 'Engine',
                click: () => {
                    const win = new BrowserWindow({
                        width: 800,
                        height: 600
                    })
                    win.loadFile('pages/engine.htm')
                }
            },
            {
                role: "quit"
            }
        ]
    },
    {
        label : "Functions",
        submenu: [
            {
                label: 'Trigonometry',
                submenu: [
                    {
                        label: 'sin',
                        click: (nsp, window) => {
                            window.loadURL('javascript:setValue("sin(")')
                        }
                    },
                    {
                        label: 'cos',
                        click: (nsp, window) => {
                            window.loadURL('javascript:setValue("cos(")')
                        }
                    },
                    {
                        label: 'tan',
                        click: (nsp, window) => {
                            window.loadURL('javascript:setValue("tan(")')
                        }
                    }
                ]
            },
            {
                label: "Algebra",
                submenu: [
                    {
                        label: 'π',
                        click: (nsp, window) => {
                            window.loadURL('javascript:setValue("pi")')
                        }
                    },
                    {
                        label: 'log',
                        click: (nsp, window) => {
                            window.loadURL('javascript:setValue("log(")')
                        }
                    }
                ]
            },
            {
                label: '√',
                click: (nsp, window) => {
                    window.loadURL('javascript:setValue("sqrt(")')
                }
            }
        ]
    },
    {
        label : "Edit",
        role: "edit",
        submenu: [
            { role: "copy"},
            { role: "paste"},
           {
            label: 'Select',
                click: (nsp, window) => {
                    window.loadURL('javascript:input.select()')
                }
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                label: 'Graph',
                click: () => {
                    const win = new BrowserWindow({
                        width: 800,
                        height: 600
                    })
                    win.loadFile('graph.html')
                }
            },
           {
              role: 'minimize'
           },
           {
              role: 'close'
           }
        ]
     },
    {
        label: 'About',
        submenu: [
            {role:'about'},
            {
                label: 'Functions',
                click: () => {
                    const win = new BrowserWindow({
                        width: 800,
                        height: 600
                    })
                    win.loadFile('pages/functions.htm')
                }
            },
            {
                label: 'Conversions',
                click: () => {
                    const win = new BrowserWindow({
                        width: 800,
                        height: 600
                    })
                    win.loadFile('pages/conv.htm')
                }
            }
        ]
    }
];


const createWindow = () => {
    const win = new BrowserWindow({
      width: 500,
      height: 500,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      icon: 'icons/icon.png'
    })
    win.setBackgroundColor("black")
    win.loadFile('index.html')
    let menu = Menu.buildFromTemplate(menuTemplate);
    menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
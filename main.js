const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;

process.env.NODE_ENV = '';

var mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        title: 'Discord Monitor',
        resizable: false,
        //frame: false,
    });
    // Load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

function createAddBotWindow(){
    addBotWindow = new BrowserWindow({
        width: 400,
        height: 150,
        title: 'Add a Bot',
        resizable: false
    });
    // Load HTML into window
    addBotWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addBot.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage Collection
    addBotWindow.on('closed', function(){
        addBotWindow = null;
    });
};


function createTokenWindow(){
    tokenWindow = new BrowserWindow({
        width: 400,
        height: 150,
        title: 'Monitor a Token',
        resizable: false
    });
    // Load HTML into window
    tokenWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'tokenWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage Collection
    tokenWindow.on('closed', function(){
        tokenWindow = null;
    });
};
function createViewWindow(){
    viewWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'View Settings',
        resizable: false
    });
    // Load HTML into window
    viewWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'viewWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage Collection
    viewWindow.on('closed', function(){
        viewWindow = null;
    });
};

ipcMain.on('bot:add', function(e, botLocation){
    console.log("Okay. Step two.")
    mainWindow.webContents.send('bot:add', botLocation);
    addBotWindow.close();
});
ipcMain.on('token:add', function(e, token){
    console.log(token)
    mainWindow.webContents.send('token:add', token);
    tokenWindow.close();
});

// menu
const mainMenuTemplate = [{
    label: "File",
    submenu: [
        {
            label: 'Add a Bot',
            accelerator: process.platform == 'darwin' ? 'Command+B' : 'Ctrl+B',
            click(){
                createAddBotWindow();
            }
        },
        {
            label: 'Monitor Token',
            accelerator: process.platform == 'darwin' ? 'Command+M' : 'Ctrl+M',
            click(){
                createTokenWindow();
            }
        },
        {
            label: "Clear",
            accelerator: process.platform == 'darwin' ? 'Command+C' : 'Ctrl+C',
            click(){
                mainWindow.webContents.send('message:clear');
            }
        }
    ]    
},/*
{
    label: "View",
    submenu: [
        {
            label: 'Settings',
            click(){
                createViewWindow();
            }
        }
    ]    
}*/];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
};

if(process.env.NODE_ENV != 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R'
            },
        ]
    })
};
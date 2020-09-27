const {app, BrowserWindow, ipcMain, Menu, Tray, nativeImage} = require('electron');
const rendererPath ='./index.html'
let win = null;
const quips = [
    {
        user: 'Gimli',
        quip: 'Let Them Come. There Is One Dwarf Yet In Moria Who Still Draws Breath.'
    },
    {
        user: 'Gimli',
        quip: 'Nobody Tosses A Dwarf!'
    },
    {
        user: 'Gimli',
        quip: 'And My Axe.'
    },
    {
        user: 'Gimli',
        quip: 'Aye. I Could Do That.'
    },
    {
        user: 'Gandelf',
        quip: 'There is only one lord of the rings. And he does not share power!'
    }
]


function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.webContents.on('did-finish-load', () => {

        win.webContents.send('from_main', `${new Date()}: App version ${app.getVersion()}`);
    });

    win.loadFile(rendererPath);

    setInterval(function () {
        const picker = Math.floor(Math.random() * quips.length);
        win.webContents.send('from_main', `${quips[picker].user}: "${quips[picker].quip}"`);

    }, 3000);

}

app.on('ready', createWindow);
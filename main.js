const {app, BrowserWindow, Menu, Tray, nativeImage} = require('electron');
const {autoUpdater} = require('electron-updater');

const rendererPath = './index.html'
const path = require('path');

const iconPath = path.join(__dirname, 'picture.jpg');
const trayIcon = nativeImage.createFromPath(iconPath).resize({width: 16, height: 16});

let win = null;
let tray = null;
autoUpdater.autoDownload = true;
autoUpdater.checkForUpdatesAndNotify();

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
    win.loadFile(rendererPath);
    tray = new Tray(trayIcon);

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('from_main', `${new Date()}: App version ${app.getVersion()}`);

        setInterval(function () {
            const picker = Math.floor(Math.random() * quips.length);
            win.webContents.send('from_main', `${quips[picker].user}: "${quips[picker].quip}"`);

        }, 3000);

    });

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show LOTOR',
            click: function () {
                win.show();
            }
        },
        {
            label: 'Quit',
            click: function () {
                app.quit();
            }
        }

    ]);


    tray.setToolTip('LOTORquips');
    tray.setContextMenu(contextMenu)
}

app.on('ready', createWindow);


autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
    win.webContents.send('from_main', `New update found, downloading....`);
});

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
});
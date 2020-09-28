const {ipcRenderer} = require('electron');

const log = document.getElementById('log');



ipcRenderer.on('from_main', (event, message) => {
    log.innerHTML = log.innerHTML + '<h5>' + message + '</h5>'
});




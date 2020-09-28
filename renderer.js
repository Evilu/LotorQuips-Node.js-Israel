const {ipcRenderer} = require('electron');

const log = document.getElementById('log');
const popup = document.getElementById('message');
const notification = document.getElementById('notification');


ipcRenderer.on('from_main', (event, message) => {
    log.innerHTML = log.innerHTML + '<h5>' + message + '</h5>'
});


ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    popup.innerText =
        `A new update found! downloading...`
    notification.classList.remove('hidden');
});

function closeNotification() {
    notification.classList.add('hidden');
}
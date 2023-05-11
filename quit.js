const { ipcRenderer } = require('electron');

function quitApp() {
    document.body.innerHTML="<p><b>Quitting...</b><br>Bye!</p>"
    ipcRenderer.send('quit-app');
}

function dontQuit() {
    ipcRenderer.send('dont-quit');
    window.close()
  }
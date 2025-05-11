const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const http = require('http');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contentIsolation: true
        }
    });

    const checkServer = () => {
        http.get('http://localhost:3000', () => {
            win.loadURL('http://localhost:3000');
        }).on('error', () => {
            setTimeout(checkServer, 1000);
        });
    };

    exec('npm start', (err, stdout, stderr) => {
        if (err) {
            console.error('Błąd uruchamiania serwera:', err);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });

    checkServer();
}

app.whenReady(). then(createWindow);
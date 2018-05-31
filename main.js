import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  mainWindow = new BrowserWindow({ width: 1000, height: 800, frame: false });
  mainWindow.loadURL("file://" + __dirname + "/index.html");
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

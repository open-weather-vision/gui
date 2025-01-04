// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		resizable: true,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true,
		},
		show: false,
	});

	mainWindow.removeMenu();

	if (process.env.REACT_APP_ENV === "development") {
		mainWindow.loadURL("http://localhost:3000");
	} else {
		mainWindow.loadFile(__dirname + "/../build/index.html");
	}

	// Open the DevTools.
	mainWindow.webContents.openDevTools()
	mainWindow.once("ready-to-show", () => {
		mainWindow.maximize();
		mainWindow.show();
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

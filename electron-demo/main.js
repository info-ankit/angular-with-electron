const electron = require('electron'), 
	path = require("path"), 
	url = require("url");

const { app, BrowserWindow, Menu, screen, ipcMain } = electron;

let mainWindow, newWindow=null, participantsWindow=null, activeMediaStreams;

// LISTEN FOR APP TO BE READY.
app.on('ready', function () {
	// CREATE NEW WINDOW.
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	mainWindow = new BrowserWindow({
		width, 
		height,
		webPreferences: {
			nodeIntegration: true
		},
		show: true
	});
	// LOAD HTML INTO WINDOW.
	mainWindow.loadURL(url.format({
    // pathname: path.join(__dirname, 'view/mainWindow.html'),
		pathname: path.join(__dirname, '../angular-demo/dist/angular-demo/index.html'),
		protocol: 'file:',
		slashes: true
	}))
	/* EMITTED WHEN THE WINDOW IS MINIMIZE.
	mainWindow.on('minimize', function () {
		if (newWindow === null) {
			createNewWindow();
		}
	})
	// EMITTED WHEN THE WINDOW IS RESTORE.
	mainWindow.on('restore', function () {
		if (newWindow !== null) {
			// newWindow = null;
			newWindow.close();
		}
	})
	*/
	// EMITTED WHEN THE WINDOW IS BLUR.
	mainWindow.on('blur', function () {
		if (newWindow === null && participantsWindow === null) {
			// 22/05/2021 - Blocking for truminds.in
			// createNewWindow();
		}
	})
	// EMITTED WHEN THE WINDOW IS FOCUS.
	mainWindow.on('focus', function () {
		// console.log("newWindow: ", newWindow)
		if (newWindow !== null) {
			// newWindow = null;
			newWindow.close();
		}
	})
	// EMITTED WHEN THE WINDOW IS CLOSED.
	mainWindow.on('closed', function () {
		mainWindow = null;
		app.quit();
	})
	
	// EMITTED WHEN APP LOUNCH.
	Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenuTemplate))
});

// FORCE SINGLE INSTANCE APPLICATION.
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (process.platform == 'win32' || process.platform === 'linux') {
      deepLinkUrl = process.argv.slice(1)
    }
    // SOMEONE TRIED TO RUN A SECOND INSTANCE, WE SHOULD FOCUS OUR WINDOW.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// HANDLE CREATE ADD WINDOW.
function createNewWindow () {
	
}

// CATCH REQUEST FROM CHILD WINDOW.
ipcMain.on("log", (event, arg) => {
	console.log("Local Variable: ", arg)
	newWindow.webContents.send("log", arg);
})

// CATCH REQUEST FROM CLIENT(`active-participate:stream`).
ipcMain.on("active-participate:stream", (event, arg) => {
	console.log("Camera Stream On Electron: ", arg)
	activeMediaStreams = arg
	if (newWindow !== null) {
		newWindow.webContents.send("active-participate:stream", activeMediaStreams);
	}
})

// MAXIMIZE `mainWindow` FROM `newWindow` PAGE.
ipcMain.on("maximize-main:window", (event, arg) => {
	if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.focus()
})

// SHARE SCREEN FROM `mainWindow`.
ipcMain.on("share-main:window", (event, arg) => {
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.focus()
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send("manageLounchApplication", {'name': 'Ankit', 'mobile': 7428772538 })
  }
})

// HANDLE CREATE ADD WINDOW.
function createParticipantsWindow (participants=[]) {
	// CREATE NEW WINDOW.
	participantsWindow = new BrowserWindow({
		x: 1050,
		y: 50,
		width: 310,
		height: 675,
		frame: true,
		// resizable: false,
		alwaysOnTop: true,
		skipTaskbar: true,
		minimizable: false,
		maximizable: false,
		backgroundColor: '#FFFFFF',
		webPreferences: {
			nodeIntegration: true
			// additionalArguments: [participants]
		},
		show: false	
	});
	// LOAD HTML INTO WINDOW.
	participantsWindow.loadFile(
		'view/participant-list.html',
		{
			query: {
				"participants": JSON.stringify(participants)
			}
		}
	)
	// OPEN DEVTOOLS ON NEWWINDOW.
	// participantsWindow.webContents.openDevTools()
	// EMITTED WHEN THE WINDOW IS CLOSED.
	participantsWindow.on('closed', function () {
		participantsWindow = null;
	})
	
	// EMITTED WHEN APP LOUNCH.
	Menu.setApplicationMenu(Menu.buildFromTemplate([]))
}

// CATCH REQUEST FROM CLIENT(`participants:list`).
ipcMain.on("participants:list", (event, arg) => {
	// console.log("Participants List: ", arg)
	if (participantsWindow === null) {
		createParticipantsWindow(arg)
	}
	participantsWindow.webContents.send("participants:list", arg);
	participantsWindow.show()
})

// CREATE MENU TEMPLATE.
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Add Item',
				click () {
					// 22/05/2021 - Blocking for truminds.in
					// createNewWindow();
				}
			},
			{
				label: 'Cleat Item'
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click () {
					app.quit();
				}
			}
		]
	}
];

// IF MAC, ADD EMPTY OBJECT TO MENU.
if (process.platform == 'darwin') {
	mainMenuTemplate.unshift({});
}
// ADDING DEVELOPER TOOL ITEM IF NOT IN PROD.
if (process.env.NODE_ENV !== 'production') {
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle DevTools',
				accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click (item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	});
}
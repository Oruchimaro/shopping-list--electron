const electron =require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({});
    //Load Html File into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    })); //this is: (file://dirname/mainWindow.html


    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert Menu 
    Menu.setApplicationMenu(mainMenu);
});


// Create a menu template Array of Objects
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item'
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){ //adding a click event for menu item
                    app.quit(); //close the app
                }
            }
        ],
    }
];

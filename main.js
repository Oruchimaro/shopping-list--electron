const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

var knex = require("knex")({
  client: "sqlite",
  connection: {
    filename: "./db/database.sqlite",
  },
});

// Determine the platform that is runing this app
const platform = process.platform;

// Set ENV To Production For Packaging
process.env.NODE_ENV = "production";

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on("ready", function () {
  //Create new window
  mainWindow = new BrowserWindow({
    // specifying node integration as true (wont get js errors )
    webPreferences: {
      nodeIntegration: true,
    },
  });
  //Load Html File into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "view/mainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  ); //this is: (file://dirname/mainWindow.html
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  //Quite app when closed (all windows)
  mainWindow.on("closed", function () {
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle create Add Window
function createAddWindow() {
  // Create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add Item",
    // specifying node integration as true (wont get js errors )
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // Load Html File into window
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "view/addWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Garbage collection handle (free memory on addWindow closing)
  addWindow.on("close", function () {
    addWindow = null;
  });
}

// catch main window loaded from browser
ipcMain.on("mainWindowLoaded", () => {
  // query data from database
  let result = knex.select("*").from("items");
  //send data to view
  result.then(function (rows) {
    mainWindow.webContents.send("resultSent", rows);
  });
});

// Catch item:add from view window.
ipcMain.on("item:add", function (e, item) {
  //save to sqlite db new item
  let result = knex("items").insert({ item: item });
  // send new item to view
  result.then(function () {
    mainWindow.webContents.send("item:add", item);
    addWindow.close();
  });
});

// catch item:delete
ipcMain.on("item:delete", function (e, id) {
  let result = deleteITem(id);
  // send new item to view
  result.then(function () {
    // send item:delted
    mainWindow.webContents.send("item:deleted", id);
    addWindow.close();
  });
});

function deleteITem(id) {
  //delete from db
  let result = knex("items").where("id", id).del();
  return result;
}
/* ********************** menu section ************************************ */
// Create a menu template Array of Objects
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        accelerator: platform == "darwin" ? "Command+N" : "Ctrl+N",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Items",
        click() {
          mainWindow.webContents.send("items:clear");
        },
      },
      {
        label: "Quit",
        accelerator: platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          //adding a click event for menu item
          app.quit(); //close the app
        },
      },
    ],
  },
];

// If mac, add empty object to menu
// cause it wont show the File menu
if (platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// Add Develper Tools menu item if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload", //get reload functionality
      },
    ],
  });
}

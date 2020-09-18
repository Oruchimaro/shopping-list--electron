# 1. Start a npm project

    ```SH
        $ npm init

        $ git init
    ```

    Setup the skeleton of project and added start script for easy runing the
    development server.

    Create a html file as view window of project with basic html syntax.

    Create a js file as backend starting point.

# 2.Set up first modules needed.

    In main.js Add this modules : **electron**, **url**, **path**.
    Then destructure **app** and **BrowserWindow** from **electron** module.

    Start listening for app to be ready with
    ```JS
        app.on(event, callback);
    ```

    In event use **ready** and in callback function start a BrowserWindow and
    pass the html file created as the starting point of project.

# 3.Create a Menu Template to Edit menus shown in project window

    Import (destructure) Menu from electron module, then create a object for
    menu Items (here it is mainMenuTemplate) and pass menu items there.

    Then in main listener use buildFromTemplate() method  And then insert it
    into app with setApplicationMenu() method.

    With **label** in menuTemplate we can a title for it, with **click()** method we
    can add a click event for it.
    and for adding a hotkey we will use **accelerator**.

    Should note that for hotkeys because of diffrence between platforms (mac,
            windows, linux) we need to determine which platform we are on, so
    we use **platform** from **process** object.
    ```JS
        process.platform == 'darwin' -> for **mac**
        process.platform == 'win32' -> for **windows**
        process.platform == 'linux' -> for **linux**
    ```

# 4.Create a menu Item with another window.

    First we will add a sub menu item called **Add Item** and on its click
    event we will call to a function for creating a subview.Then we will create
    a new variable for our new window.

    Then we will create that function and inside it we will add logic for
    createing a window and a path to a html file for its content.Now we will
    create that html file.

    Now there is a little bug that if we close the main window the sub window
    wont close, so for that we will go to our app listener and add a new
    listener and close all the apps there like this :

    ```JS
        mainWindow.on('closed', function(){
            app.quite();
        });
    ```

    After this for better performance we need to set addWindow variable that we


    created for our subwindow to **NULL** to free memory allocated to it.

### Devloper Tools menu Item

    We want to have devtools menuItem just for when we are developing the app
    but not on production.
    So we will use "process.env.NODE_ENV" to determine which enviorment we are
    on, if it is not production then push a menu item to menu template.

    Then set click event  and a hotkey for it.

    we also want reload functionality on development , so we add a new object,
    but all we have to do is set a **role** for it

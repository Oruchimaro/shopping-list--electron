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

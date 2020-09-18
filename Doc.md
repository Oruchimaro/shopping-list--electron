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

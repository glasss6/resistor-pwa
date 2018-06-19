# Resistor Calculate PWA

Simple open-source app to calculate a resistor value from it's color codes. Choose between two themes: drop-down menus or color picker mode. Also, available on the web as a progressive web app. 

## Getting Started

These instructions will guide you to install the software on your own system for development and testing.

### Prerequisites

* Web server such as XAMPP or Chrome Web Server [PWA]
* Apache Cordova [Android App]
* Node.js [Android App] 
* Java JDK 1.8 [Android App] (IMPORTANT: Must be JDK 1.8)
* Android SDK [Android App]
* Gradle [Android App]

### Installing PWA

Progressive web apps (PWAs) are reliable, fast, and engaging apps that are able to be installed on a user's homescreen directly from the web. PWAs can offer similar experiences to native apps but with all the benefits of being a web application such as fast updates and being cross-platform. Because a PWA is basically a web page, you will need to install a web server such as XAMPP or Chrome Web Server.

1. Copy the directory /pwa/ from the repo to your web directory
2. Edit the manifest.json and web files as desired

That's it.

### Installing Android App

The PWA is ported to Android and iOS by using Apache Cordova which allows us write mobile applications using standard HTML/CSS/JavaScript. We are able to easily port our PWA to mobile using Cordova. I will demonstrate how to build for the Android platform on Windows 10.

1. Install Apache Cordova and prerequisites (Node.js)
``` C:\>npm install -g cordova ```

2. Create the app project
Open a PowerShell window in the directory to create the app and invoke the Cordova CLI.
``` cordova create app com.example.app demoApp ```

3. Install the Android platform
Open the created directory and invoke the Cordova CLI again to add platforms.
``` 
cd app
cordova platform add android
```

4. Copy files to directory
Copy the files in the /cordova/ directory in the repo to your Cordova app directory.

5. Install plugins
The app uses two cordova plugins: statusbar to change the status bar color to match the app theme, devicefeedback to add haptic and acoustic feedback when a user presses a button.
```
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-velda-devicefeedback
```

6. Build and run
Build and run the app using the commands listed below.
```
cordova build android
cordova run android
```

## Built Using
* [Apache Cordova](https://github.com/apache/cordova-cli)
* [Devicefeedback Cordova plugin](https://github.com/VVelda/device-feedback)

## Author
* **Stephen Glass** - [stephen.glass](https://stephen.glass)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
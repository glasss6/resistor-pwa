/*
MIT License

Copyright (c) 2018 Stephen Glass

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var bandColors = ["Red", "Black", "Red", "Gold"]; // Initial band colors

var digitValues = {
    "Black"  : 0,
    "Brown"  : 1,
    "Red"    : 2,
    "Orange" : 3,
    "Yellow" : 4,
    "Green"  : 5,
    "Blue"   : 6,
    "Violet" : 7,
    "Grey"   : 8,
    "White"  : 9 
};

var multiplierValues = {
    "Silver" : 0.01,
    "Gold"   : 0.1,
    "Black"  : 1,
    "Brown"  : 10,
    "Red"    : 100,
    "Orange" : 1000,
    "Yellow" : 10000,
    "Green"  : 100000,
    "Blue"   : 1000000,
    "Violet" : 10000000
};

var toleranceValues = {
    "Brown"  : 1,
    "Red"    : 2,
    "Gold"   : 5,
    "Silver" : 10
}

function feedback()
{
    window.plugins.deviceFeedback.haptic();
    window.plugins.deviceFeedback.acoustic();
}

function hamburgerCheck()
{
    if(localStorage.getItem("theme")) document.getElementById("themeStatus").innerHTML = "Switch to color pickers";
    else document.getElementById("themeStatus").innerHTML = "Switch to dropdowns";
}

function hamburgerResult(param) { // Called when a item on the hamburger menu is selected
    document.getElementById("hamburgerCheck").checked = false; // Hide the menu after selecting an option
    if(param == 0) { // About menu
        toggleDialog(5, 1); // Show about dialog
    }
    else if(param === 1) { // Switch themes
        feedback();
        if(localStorage.getItem("theme")) {
            // Switch to color pickers
            localStorage.removeItem("theme");
            setColorPickers();
        }
        else {
            // Switch to dropdowns
            localStorage.setItem("theme", "1");
            setDropdowns();
        }
    }
}

function checkTheme()
{
    if(localStorage.getItem("theme")) {
        // Switch to dropdowns
        setDropdowns();
    }
    else {
        // Switch to color pickers
        setColorPickers();
    }
}

function setColorPickers()
{
    var i;
    for (i = 1; i < 5; i++) {
        document.getElementById("center-" + i).className = "center-picker";
        document.getElementById(String(i)).className = "scrollmenu";
        document.getElementById("dropdown-area-" + i).innerHTML = '';
    }
}

function setDropdowns()
{
    var i;
    for (i = 1; i < 5; i++) {
        document.getElementById("center-" + i).className = "center-picker dropdown";
        document.getElementById(String(i)).className = "dropdown-content";
        document.getElementById("dropdown-area-" + i).innerHTML = '<button onclick="toggleDialog(' + i + ', 1)" class="dropbtn">Band ' + i + '</button>';
    }
}


function toggleDialog(band, visible)
{
    if (visible) {
      document.getElementById("dialog-" + band).classList.add('dialog-container--visible');
      feedback();
    } 
    else {
      document.getElementById("dialog-" + band).classList.remove('dialog-container--visible');
    }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (event.target.className.includes("dialog-container")) { // If the user clicked outside the dialog, close it
        var i;
        for (i = 1; i < 6; i++) {
            var dialog = document.getElementById("dialog-" + i);
            if(dialog.classList.contains('dialog-container--visible')) {
                toggleDialog(i, 0);
                break;
            }
        }
    }
    if (!event.target.className.includes("hamburger") && !event.target.parentElement.id.includes("menuToggle")) { // If the user clicked outside the dialog, close it
        document.getElementById("hamburgerCheck").checked = false;
    }
}

function clickColor(band, color)
{
    var bandID = document.getElementById("band" + band);
    var locationID = document.getElementById("location-" + band);
    bandID.className = "band-color " + color.toLowerCase();
    locationID.innerHTML = "<span class='dummy-picker scrollmenu-" + color.toLowerCase() + "'></span> Band " + band + " (" + color + ")";
    bandColors[band-1] = color;
    toggleDialog(band, 0);
    calculateValue();
    feedback();
}

function calculateValue()
{
    var ohms = parseInt(String(digitValues[bandColors[0]]) + String(digitValues[bandColors[1]])) * multiplierValues[bandColors[2]];
    var calculate = parseValue(ohms) + ' &plusmn; ' + toleranceValues[bandColors[3]] + '%';
    document.getElementById("resistor-calculated").innerHTML = calculate;
}

function parseValue(ohms)
{
    var suffix = ' &Omega;'
    if (ohms/1000000 >= 1) {
      suffix = 'M &Omega;';
      ohms = ohms/1000000;
    }
    else if (ohms/1000 >= 1) {
      suffix = 'K &Omega;';
      ohms = ohms/1000;
    }
    // Fix to two decimal places
    return ohms.toFixed(2) + suffix;
}

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
}
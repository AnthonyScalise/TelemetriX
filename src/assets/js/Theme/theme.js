storage = new Storage();

if(storage.storage) {
    // if(localStorage.settingsConfig) {
        // var localStorageSettings = JSON.parse(localStorage.getItem("settingsConfig"));
        // var localColorSettings = JSON.parse(localStorageSettings["colorSettings"]);
        refreshColors();
    // }
} else {
    swal({
        title: 'Uh oh...',
        text: 'There was a problem while attempting to utilize local storage'
    })
}


// function saveToSettingsConfig() {
//     localStorage.setItem("settingsConfig", JSON.stringify(localStorageSettings));
// }


//  Function to set the theme colors
function setPrimaryColors(color) {
    document.documentElement.style.setProperty('--primaryColor', color);
    document.documentElement.style.setProperty('--primaryColor2', modifyColorBrightness(color, -50));
    document.documentElement.style.setProperty('--primaryColor3', modifyColorBrightness(color, -100));
}


//  Function to set the secondary theme colors
function setSecondaryColors(color) {
    document.documentElement.style.setProperty('--secondaryColor', color);
}


function refreshColors() {
    // var localStorageSettings = JSON.parse(localStorage.getItem("settingsConfig"));
    // var localColorSettings = JSON.parse(localStorageSettings["colorSettings"]);
    let primaryColor = storage.settings.appTheme.primaryColor;
    let secondaryColor = storage.settings.appTheme.secondaryColor;
    setPrimaryColors(primaryColor);
    setSecondaryColors(secondaryColor);
    if(window.location.pathname.split("/").pop() == "settings.html") {
        document.getElementById("colorPickPrimary").value = primaryColor;
        document.getElementById("colorPickSecondary").value = secondaryColor;
        document.getElementById("colorPickPrimary").style.setProperty("background-color", primaryColor);
        document.getElementById("colorPickSecondary").style.setProperty("background-color", secondaryColor);
    }
}


//  Function to adjust the brightness of a hex color value
function modifyColorBrightness(color, amount) {
    return('#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)));
}


function changeColorSetting(idNum, color) {
    switch(idNum) {
        case(0):
            setPrimaryColors(color.value);
            // localColorSettings["primaryColor"] = color.value;
            // localStorageSettings["colorSettings"] = JSON.stringify(localColorSettings);
            // saveToSettingsConfig();
            storage.settings.appTheme.primaryColor = color.value;
            storage.saveSettings();
            break;
        case(1):
            setSecondaryColors(color.value);
            // localColorSettings["secondaryColor"] = color.value;
            // localStorageSettings["colorSettings"] = JSON.stringify(localColorSettings);
            // saveToSettingsConfig();
            storage.settings.appTheme.secondaryColor = color.value;
            storage.saveSettings();
            break;
    }
    refreshColors();
}

styleElement = document.documentElement.style;

function modifyColorBrightness(color, amount) {
    return ('#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)));
}

function changeColorSetting(idNum, color) {
    if (idNum == 0) {
        console.log('change');
        setPrimaryColors(color.value);
        storage.settings.appTheme.primaryColor = color.value;
    } else {
        setSecondaryColors(color.value);
        storage.settings.appTheme.secondaryColor = color.value;
    }
    storage.saveSettings();
    refreshColors();
}

function setPrimaryColors() {
    styleElement.setProperty('--primaryColor', storage.settings.appTheme.primaryColor);
    styleElement.setProperty('--primaryColor2', modifyColorBrightness(storage.settings.appTheme.primaryColor, -50));
    styleElement.setProperty('--primaryColor3', modifyColorBrightness(storage.settings.appTheme.primaryColor, -100));
}

function setSecondaryColors() {
    styleElement.setProperty('--secondaryColor', storage.settings.appTheme.secondaryColor);
}

function setColorSelectors() {
    document.getElementById("colorPickPrimary").style.setProperty("background-color", storage.settings.appTheme.primaryColor);
    document.getElementById("colorPickSecondary").style.setProperty("background-color", storage.settings.appTheme.secondaryColor);
    document.getElementById("colorPickPrimary").value = storage.settings.appTheme.primaryColor;
    document.getElementById("colorPickSecondary").value = storage.settings.appTheme.secondaryColor;
}

function refreshColors() {
    setPrimaryColors();
    setSecondaryColors();
    setColorSelectors();
}

setPrimaryColors();
setSecondaryColors();

if (window.location.pathname.split("/").pop() == "settings.html") {
    window.onload = function () {
        setColorSelectors();
    };
}

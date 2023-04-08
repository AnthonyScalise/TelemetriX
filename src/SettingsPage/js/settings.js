
var storage = window.storage;

if (!storage.storageLocal) {
    swal({ title: 'Uh oh...', text: 'There was a problem while attempting to utilize local storage' });
}

function goToMainPage() {
    if (formatWidgetConfigurationTextareaJSON()) {
        window.location.replace("../MainPage/index.html");
    }
}

function resetDefaultSettings() {
    swal("Are you sure?", "This will reset all settings to their defaults", { buttons: ["Cancel", "Yes"] }).then((value) => {
        if (value) {
            storage.resetSettings();
            document.getElementById("widgetJson").value = JSON.stringify(storage.widgetConfig);
            refreshColors();
            swal({ title: 'Success!', text: 'Settings have been reset' });
        }
    });
}

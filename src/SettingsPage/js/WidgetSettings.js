
var storage = window.storage;

document.getElementById("gridSizeSlider").setAttribute("value", storage.settings.dragging.gridSize);
document.getElementById("gridSizeLabel").setAttribute("value", (storage.settings.dragging.gridSize + " px"));
document.getElementById("widgetGridSwitch").checked = storage.settings.dragging.grid;
document.getElementById("widgetSnapSwitch").checked = storage.settings.dragging.edgeSnap;

function uploadText() {
    return new Promise((resolve) => {
        let uploader = document.createElement('input');
        uploader.type = 'file';
        uploader.style.display = 'none';
        uploader.addEventListener('change', () => {
            let files = uploader.files;
            if (files.length) {
                let reader = new FileReader();
                reader.addEventListener('load', () => {
                    uploader.parentNode.removeChild(uploader);
                    resolve(reader.result);
                });
                reader.readAsText(files[0]);
            }
        });
        document.body.appendChild(uploader);
        uploader.click();
    });
}

function configDownload() {
    if (typeof (storage) !== "undefined") {
        if (storage.widgetData) {
            let widgetDataCopy = JSON.stringify(storage.widgetData);
            pywebview.api.download_dialog('WidgetLayoutProfile.txt', widgetDataCopy);
        } else {
            swal({ title: 'Oops...', text: 'No widget layout profile detected' });
        }
    } else {
        noLocalStorageMessage();
    }
}

function configUpload() {
    uploadText().then(config => {
        try {
            storage.widgetData = ((JSON.parse(config) == "[object Object]") ? config : JSON.parse(config));
            storage.saveSettings();
            swal({ title: 'Success!', text: 'The profile was uploaded successfully' });
        } catch (error) {
            swal({ title: 'Oops...', text: 'The profile uploaded was invalid' });
        }
    });
}

function resetConfig() {
    swal("Are you sure?", "This will reset your current widget layout profile", { buttons: ["Cancel", "Yes"] }).then((value) => {
        if (value) {
            storage.resetWidgetConfig();
            document.getElementById("widgetJson").value = JSON.stringify(storage.widgetConfig);
            formatWidgetConfigurationTextareaJSON();
            swal({ title: 'Success!', text: 'The profile was reset successfully' });
        }
    });
}

function changeGridSize(slider) {
    storage.settings.dragging.gridSize = slider.value;
    document.getElementById("gridSizeLabel").value = (slider.value + " px");
    storage.saveSettings();
}

function toggleSetting(btn, setting) {
    storage.settings.dragging[setting] = ((btn.checked) ? true : false);
    storage.saveSettings();
}

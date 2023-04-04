
storage = new Storage();

function noLocalStorageMessage() {
    swal({
        title: 'Uh oh...',
        text: 'There was a problem while attempting to utilize local storage'
    })
}

//  The function to upload json widget data
function uploadText() {
    return new Promise((resolve) => {
        // create file input
        let uploader = document.createElement('input');
        uploader.type = 'file';
        uploader.style.display = 'none';
        // listen for files
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
        })
        // trigger input
        document.body.appendChild(uploader);
        uploader.click();
    })
}

//  The function to download the local storage file for widget position and size
function configDownload() {
    if (typeof(storage) !== "undefined") {
        if(storage.widgetData) {
            // let previousConfigurationSave = JSON.stringify(localstorage.getItem("saveConfig"));
            let widgetDataCopy = JSON.stringify(storage.widgetData);
            pywebview.api.download_dialog('WidgetLayoutProfile.txt', widgetDataCopy);
        } else {
            swal({
                title: 'Oops...',
                text: 'No widget layout profile detected'
            })
        }
    } else {
        noLocalStorageMessage();
    }
}

//  The function to upload a widget position and size config file to local storage
function configUpload() {
    uploadText().then(config => {
        try {
            if(JSON.parse(config) != "[object Object]") {
                // localstorage.setItem("saveConfig", JSON.parse(config));
                storage.widgetData = JSON.parse(config);
            } else {
                // localstorage.setItem("saveConfig", config);
                storage.widgetData = config;
            }
            storage.saveSettings();
            swal({
                title: 'Success!',
                text: 'The profile was uploaded successfully'
            })
        } catch(error) {
            swal({
                title: 'Oops...',
                text: 'The profile uploaded was invalid'
            })
        }
    });
}

//  The function to reset the widget position config in local storage
function resetConfig() {
    swal("Are you sure?","This will reset your current widget layout profile", {buttons: ["Cancel", "Yes"]}).then((value) => {
        if(value) {
            // localstorage.removeItem("saveConfig");
            // let settingConfigurationSave = JSON.parse(localstorage.getItem("settingsConfig"));
            // let defaultJson = '{\n\t"buttons": [\n\t\t{"title": "", "onLabel": "", "offLabel": "", "momentary": false, "initially": false}\n\t],\n\t"inputs": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"displays": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"consoles": [\n\t\t{"title": ""}\n\t],\n\t"graphs": [\n\t\t{"title": ""}\n\t],\n\t"lights": [\n\t\t{"title": "", "initially": false}\n\t]\n}';
            // settingConfigurationSave["widgetJson"] = defaultJson;
            storage.resetWidgetConfig();
            // localstorage.setItem("settingsConfig", JSON.stringify(settingConfigurationSave));
            document.getElementById("widgetJson").value = JSON.stringify(storage.widgetConfig);
            swal({
                title: 'Success!',
                text: 'The profile was reset successfully'
            })
        }
    });
}

function toggleSetting(btn, setting) {
    if(storage.storage) {
        if(btn.checked) {
            // settingConfigurationSave[setting] = true;
            storage.settings.dragging[setting] = true;
        } else {
            // settingConfigurationSave[setting] = false;
            storage.settings.dragging[setting] = false;
        }
        // localstorage.setItem("settingsConfig", JSON.stringify(settingConfigurationSave));
        storage.saveSettings();
    } else {
        noLocalStorageMessage();
    }
}

function changeGridSize(slider) {
    if(storage.storage) {
        // settingConfigurationSave["gridSize"] = slider.value;
        storage.settings.dragging.gridSize = slider.value;
        document.getElementById("gridSizeLabel").value = (slider.value + " px");
        // localstorage.setItem("settingsConfig", JSON.stringify(settingConfigurationSave));
        storage.saveSettings();
    } else {
        noLocalStorageMessage();
    }
}

function initialization() {
    if(currentComPort != '') {
        while(document.getElementById("comPortSelector").options.length > 0) {
            document.getElementById("comPortSelector").options.remove(0);
        }
        let currentOption = document.createElement("option");
        currentOption.text = currentComPort;
        currentOption.selected = true;
        document.getElementById("comPortSelector").add(currentOption);
        document.getElementById("comPortSelector").removeAttribute("disabled");
    }
    window.addEventListener('pywebviewready', function() {
        setInterval(function() { 
            pywebview.api.get_available_ports().then(function(response) {
                comPorts = response;
                if(comPorts.length > 0) {
                    document.getElementById("comPortSelector").removeAttribute("disabled");
                    let existingOptions = [];
                    for(let i=0; i < document.getElementById("comPortSelector").options.length; i++) {
                        existingOptions.push(document.getElementById("comPortSelector").options[i].value);
                    }
                    for(let i=0; i < comPorts.length; i++) {
                        if(existingOptions.indexOf(comPorts[i]) == -1) {
                            let newOption = document.createElement("option");
                            newOption.text = comPorts[i];
                            if(comPorts[i] == storage.settings.comPort) {
                                newOption.selected = true;
                            }
                            document.getElementById("comPortSelector").add(newOption);
                        }
                    }
                    for(let i=0; i < existingOptions.length; i++) {
                        if(comPorts.indexOf(existingOptions[i]) == -1) {
                            document.getElementById("comPortSelector").options.remove(i);
                        }
                    }
                } else {
                    while(document.getElementById("comPortSelector").options.length > 0) {
                        document.getElementById("comPortSelector").options.remove(0);
                    }
                    let noOption = document.createElement("option");
                    noOption.text = 'No Ports Found';
                    noOption.selected = true;
                    document.getElementById("comPortSelector").add(noOption);
                    document.getElementById("comPortSelector").setAttribute("disabled", true);
                }
                portSelected();
            });
        }, 500);
    });

    document.getElementById("gridSizeSlider").setAttribute("value", storage.settings.dragging.gridSize);
    document.getElementById("gridSizeLabel").setAttribute("value", (storage.settings.dragging.gridSize + " px"));
    document.getElementById("widgetGridSwitch").checked = storage.settings.dragging.grid;
    document.getElementById("widgetSnapSwitch").checked = storage.settings.dragging.edgeSnap;
    document.getElementById("widgetJson").value = JSON.stringify(storage.widgetConfig);
    // document.getElementById("gridSizeSlider").setAttribute("value", settingConfigurationSave["gridSize"]);
    // document.getElementById("gridSizeLabel").setAttribute("value", (settingConfigurationSave["gridSize"] + " px"));
    // document.getElementById("widgetGridSwitch").checked = settingConfigurationSave["widgetGrid"];
    // document.getElementById("widgetSnapSwitch").checked = settingConfigurationSave["widgetSnap"];
    // document.getElementById("widgetJson").value = settingConfigurationSave["widgetJson"];
    document.getElementById("widgetJson").addEventListener("input", (event) => {
        // let json = String(document.getElementById("widgetJson").value);
        // settingConfigurationSave["widgetJson"] = json;
        // localstorage.setItem("settingsConfig", JSON.stringify(settingConfigurationSave));
        storage.widgetConfig = JSON.parse(String(document.getElementById("widgetJson").value));
        storage.saveSettings();
    });
}

document.getElementById('widgetJson').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
        this.selectionStart =
        this.selectionEnd = start + 1;
    }
});

document.getElementById('questionButton').addEventListener('click', (event) => {
    let htmlText = `{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"buttons": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"title": "", "onLabel": "", "offLabel": "", "momentary": true/false, "initially": true/false},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"inputs": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"title": "", "value": ""},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"displays": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"title": "", "value": ""},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"consoles": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"title": ""},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>}`;
    var htmlTextObject = document.createElement('div');
    htmlTextObject.innerHTML = htmlText;
    htmlTextObject.style.textAlign = "left";
    htmlTextObject.style.backgroundColor = "#202020";
    htmlTextObject.style.padding = "5px";
    htmlTextObject.style.border = "3px solid #121212";
    swal({
        className: "sweetalert-lg",
        title: 'Widget Configuration Notation With JSON',
        content: htmlTextObject,
        button: "Close"
    })
});

// if (typeof(storage) !== "undefined") {
//     var comPorts;
//     var currentComPort = '';
//     if(localstorage.comPort) {
//         currentComPort = localstorage.getItem("comPort");
//     } else {
//         localstorage.setItem("comPort", '');
//     }
//     if(localstorage.settingsConfig) {
//         var settingConfigurationSave = JSON.parse(localstorage.getItem("settingsConfig"));
//         initialization();
//     } else {
//         var defaultJson = '{\n\t"buttons": [\n\t\t{"title": "", "onLabel": "", "offLabel": "", "momentary": false, "initially": false}\n\t],\n\t"inputs": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"displays": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"consoles": [\n\t\t{"title": ""}\n\t],\n\t"graphs": [\n\t\t{"title": ""}\n\t],\n\t"lights": [\n\t\t{"title": "", "initially": false}\n\t]\n}}';
//         var defaultColors = '{"primaryColor": "#00f652", "secondaryColor": "#000000"}';
//         var settingConfigurationSave = {"widgetGrid": false, "gridSize": 1, "widgetSnap": true, "widgetJson": defaultJson, "colorSettings": defaultColors};
//         initialization();
//         localstorage.setItem("settingsConfig", JSON.stringify(settingConfigurationSave));
//     }
// } else {
//     noLocalStorageMessage();
// }

if(storage.storage) {
    var comPorts;
    var currentComPort = storage.widgetConfig.comPort;
    // if(localstorage.settingsConfig) {
        // var settingConfigurationSave = JSON.parse(localstorage.getItem("settingsConfig"));
        initialization();
    // } else {
    //     var defaultJson = '{\n\t"buttons": [\n\t\t{"title": "", "onLabel": "", "offLabel": "", "momentary": false, "initially": false}\n\t],\n\t"inputs": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"displays": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"consoles": [\n\t\t{"title": ""}\n\t],\n\t"graphs": [\n\t\t{"title": ""}\n\t],\n\t"lights": [\n\t\t{"title": "", "initially": false}\n\t]\n}}';
    //     var defaultColors = '{"primaryColor": "#00f652", "secondaryColor": "#000000"}';
    //     var settingConfigurationSave = {"widgetGrid": false, "gridSize": 1, "widgetSnap": true, "widgetJson": defaultJson, "colorSettings": defaultColors};
    //     initialization();
    //     localstorage.setItem("settingsConfig", JSON.stringify(settingConfigurationSave));
    // }
} else {
    noLocalStorageMessage();
}

function portSelected() {
    // let lastPort = localstorage.getItem("comPort");
    let port = document.getElementById("comPortSelector").value;
    if(storage.settings.comPort != port) {
        pywebview.api.close_connection();
        pywebview.api.set_selected_port(port);
    }
    // localstorage.setItem("comPort", port);
    storage.settings.comPort = port;
    storage.saveSettings();
}

function goToController() {
    location.replace("../index.html");
}

function resetDefaultSettings() {
    swal("Are you sure?","This will reset all settings to their defaults", {buttons: ["Cancel", "Yes"]}).then((value) => {
        if(value == true) {
            // var defaultJson = '{\n\t"buttons": [\n\t\t{"title": "", "onLabel": "", "offLabel": "", "momentary": false, "initially": false}\n\t],\n\t"inputs": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"displays": [\n\t\t{"title": "", "value": ""}\n\t],\n\t"consoles": [\n\t\t{"title": ""}\n\t],\n\t"graphs": [\n\t\t{"title": ""}\n\t],\n\t"lights": [\n\t\t{"title": "", "initially": false}\n\t]\n}';
            // var defaultColors = '{"primaryColor": "#00f652", "secondaryColor": "#000000"}';
            // settingConfigurationSave = {"widgetGrid": false, "gridSize": 1, "widgetSnap": true, "widgetJson": defaultJson, "colorSettings": defaultColors};
            // localstorage.setItem("settingsConfig", JSON.stringify(settingConfigurationSave));
            storage.resetSettings();
            // document.getElementById("widgetJson").value = settingConfigurationSave["widgetJson"];
            document.getElementById("widgetJson").value = JSON.stringify(storage.widgetConfig);
            // console.log(JSON.parse(localstorageSettings["colorSettings"]));
            refreshColors();
            swal({
                title: 'Success!',
                text: 'Settings have been reset'
            })
        }
    });
}
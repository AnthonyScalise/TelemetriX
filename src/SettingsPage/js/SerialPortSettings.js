
var storage = window.storage;

var comPorts;

function portSelected() {
    let port = document.getElementById("comPortSelector").value;
    if (storage.settings.comPort != port) {
        pywebview.api.close_connection();
        pywebview.api.set_selected_port(port);
    }
    storage.settings.comPort = port;
    storage.saveSettings();
}

if (storage.widgetConfig.comPort != '') {
    while (document.getElementById("comPortSelector").options.length > 0) {
        document.getElementById("comPortSelector").options.remove(0);
    }
    let currentOption = document.createElement("option");
    currentOption.text = storage.widgetConfig.comPort;
    currentOption.selected = true;
    document.getElementById("comPortSelector").add(currentOption);
    document.getElementById("comPortSelector").removeAttribute("disabled");
}

window.addEventListener('pywebviewready', function () {
    setInterval(function () {
        pywebview.api.get_available_ports().then(function (response) {
            comPorts = response;
            if (comPorts.length > 0) {
                document.getElementById("comPortSelector").removeAttribute("disabled");
                let existingOptions = [];
                for (let i = 0; i < document.getElementById("comPortSelector").options.length; i++) {
                    existingOptions.push(document.getElementById("comPortSelector").options[i].value);
                }
                for (let i = 0; i < comPorts.length; i++) {
                    if (existingOptions.indexOf(comPorts[i]) == -1) {
                        let newOption = document.createElement("option");
                        newOption.text = comPorts[i];
                        if (comPorts[i] == storage.settings.comPort) {
                            newOption.selected = true;
                        }
                        document.getElementById("comPortSelector").add(newOption);
                    }
                }
                for (let i = 0; i < existingOptions.length; i++) {
                    if (comPorts.indexOf(existingOptions[i]) == -1) {
                        document.getElementById("comPortSelector").options.remove(i);
                    }
                }
            } else {
                while (document.getElementById("comPortSelector").options.length > 0) {
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

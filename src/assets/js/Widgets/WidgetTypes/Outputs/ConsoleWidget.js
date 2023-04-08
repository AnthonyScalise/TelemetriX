
class ConsoleWidget extends Widget {

    constructor(name) {
        super(name, "console", "xy", 200, 300);
        ConsoleWidget.numberOfWidgets++;
        ConsoleWidget.widgetList.push(this);
        this.addConsoleWidgetSpecificHTML();
    }

    addConsoleWidgetSpecificHTML() {
        this.widgetBlock.style.setProperty("min-width", "187px");
        this.widgetBlock.style.setProperty("min-height", "213px");
        this.content.style.setProperty("padding", "15px 10px 7px");
        this.content.style.setProperty("min-width", "175px");
        this.content.style.setProperty("min-height", "168px");
        this.value = String("");
        this.valueChanged = false;
        this.header.appendChild(document.createTextNode(this.name));
        this.textArea = document.createElement("TEXTAREA");
        this.textArea.style.setProperty("min-width", "155px");
        this.textArea.style.setProperty("min-height", "128px");
        this.textArea.cols = 30;
        this.textArea.rows = 10;
        this.textArea.value = ">";
        this.textArea.readOnly = true;
        this.textArea.setAttribute("overflow", "auto");
        this.textArea.style.setProperty("resize", "none");
        this.textArea.style.setProperty("outline", "none");
        this.textArea.style.setProperty("background-color", "#202020");
        this.textArea.style.setProperty("color", "white");
        this.textArea.style.setProperty("border", "3px solid #121212");
        this.content.appendChild(this.textArea);
        this.buttonSpace = document.createElement("div");
        this.buttonSpace.style.setProperty("text-align", "right");
        this.consoleClearButton = document.createElement("BUTTON");
        this.consoleClearButton.appendChild(document.createTextNode("Clear"));
        this.consoleClearButton.className = "btn btn-secondary btn-sm";
        this.consoleClearButton.style.setProperty("padding", "0px 5px");
        this.consoleClearButton.style.setProperty("margin", "0px 5px 0px 0px");
        let clearLogData = function (widget) {
            return function () {
                swal("Are you sure?", ("This will clear the \"" + widget.name + "\" log console"), { buttons: ["Cancel", "Yes"] }).then((value) => {
                    if (value == true) {
                        widget.value = String("");
                        widget.textArea.value = String("");
                    }
                });
            }
        }(this);
        this.consoleClearButton.addEventListener("click", clearLogData);
        this.buttonSpace.appendChild(this.consoleClearButton);
        this.consoleSaveButton = document.createElement("BUTTON");
        this.consoleSaveButton.appendChild(document.createTextNode("Download"));
        this.consoleSaveButton.className = "btn btn-secondary btn-sm";
        this.consoleSaveButton.style.setProperty("padding", "0px 5px");
        let saveLogDataFile = function (widget) {
            return function () {
                pywebview.api.download_dialog((widget.name + '_LogSave.txt'), widget.value);
            }
        }(this);
        this.consoleSaveButton.addEventListener("click", saveLogDataFile);
        this.buttonSpace.appendChild(this.consoleSaveButton);
        this.content.appendChild(this.buttonSpace);
    }

    static getWidgetFromList(name) {
        for (let i = 0; i < ConsoleWidget.widgetList.length; i++) {
            if (ConsoleWidget.widgetList[i].name == name)
                return ConsoleWidget.widgetList[i];
        }
    }
}

ConsoleWidget.numberOfWidgets = 0;
ConsoleWidget.updateFunction = null;
ConsoleWidget.widgetList = [];
ConsoleWidget.defaultJson = [{ 'title': '' }];

Widget._register(ConsoleWidget);

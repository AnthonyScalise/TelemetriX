

class DisplayWidget extends Widget {

    constructor(name, initialValue) {
        super(name, "display", "x", 100, 100);
        this.initialValue = initialValue;
        DisplayWidget.numberOfWidgets++;
        DisplayWidget.widgetList.push(this);
        this.addDisplayWidgetSpecificHTML();
    }


    addDisplayWidgetSpecificHTML() {
        this.widgetBlock.style.setProperty("height", "100px");
        // let colors = JSON.parse(JSON.parse(localStorage.getItem("settingsConfig"))["colorSettings"]);
        // let primeColor = colors["primaryColor"];
        // let secondColor = colors["secondaryColor"];
        this.widgetBlock.style.setProperty("background-color", storage.settings.appTheme.primaryColor);
        this.header.appendChild(document.createTextNode(this.name));
        this.textNode = document.createTextNode(this.initialValue);
        this.content.appendChild(this.textNode);
        this.content.style.color = storage.settings.appTheme.secondaryColor;
        this.content.style.setProperty("font-weight", "bold");
    }


    static getWidgetFromList(name) {
        for (let i = 0; i < DisplayWidget.widgetList.length; i++) {
            if (DisplayWidget.widgetList[i].name == name)
                return DisplayWidget.widgetList[i];
        }
    }
}

DisplayWidget.numberOfWidgets = 0;
DisplayWidget.updateFunction = null;
DisplayWidget.widgetList = [];
DisplayWidget.defaultJson = {'title':'', 'value':''};

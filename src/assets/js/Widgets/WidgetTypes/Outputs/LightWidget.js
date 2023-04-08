
class LightWidget extends Widget {

    constructor(name, initialState) {
        super(name, "light", "x", 100, 100);
        this.state = initialState;
        LightWidget.numberOfWidgets++;
        LightWidget.widgetList.push(this);
        this.addLightWidgetSpecificHTML();
    }

    addLightWidgetSpecificHTML() {
        this.header.innerText = this.name;
        this.header.style.setProperty("width", "auto");
        this.widgetBlock.style.setProperty("max-height", "100px");
        this.light = document.createElement("SPAN");
        this.light.style.setProperty("height", "30px");
        this.light.style.setProperty("width", "30px");
        this.light.classList.add(((this.initialState ? "enabled" : "disabled") + "-light"));
        this.light.style.setProperty("border-radius", "50%");
        this.light.style.setProperty("display", "inline-block");
        this.light.style.setProperty("float", "center");
        this.content.appendChild(this.light);
        this.content.style.setProperty("max-height", "56px");
    }

    static getWidgetFromList(name) {
        for (let i = 0; i < LightWidget.widgetList.length; i++) {
            if (LightWidget.widgetList[i].name == name)
                return LightWidget.widgetList[i];
        }
    }
}

LightWidget.numberOfWidgets = 0;
LightWidget.updateFunction = null;
LightWidget.widgetList = [];
LightWidget.defaultJson = [{ 'title': '', 'initially': false }];

Widget._register(LightWidget);

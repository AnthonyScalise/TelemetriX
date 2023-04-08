
class InputWidget extends Widget {

    constructor(name, initialValue) {
        super(name, "input", "x", 100, 100);
        this.initialValue = initialValue;
        InputWidget.numberOfWidgets++;
        InputWidget.widgetList.push(this);
        this.addInputWidgetSpecificHTML();
    }

    addInputWidgetSpecificHTML() {
        this.widgetBlock.style.setProperty("max-height", "100px");
        this.widgetBlock.style.setProperty("width", "auto");
        this.header.innerText = (this.name);
        this.header.style.setProperty("width", "auto");
        this.header.style.setProperty("height", "32px");
        this.inputValue = this.initialValue;
        this.input = document.createElement("INPUT");
        this.input.style.setProperty("width", "30px");
        this.input.style.setProperty("background-color", "#202020");
        this.input.style.setProperty("color", "white");
        this.input.style.setProperty("border", "3px solid #121212")
        this.input.setAttribute("type", "number");
        this.input.setAttribute("value", this.initialValue);
        this.content.style.setProperty("padding", "20px 0px");
        this.content.appendChild(this.input);
    }

    static getWidgetFromList(name) {
        for (let i = 0; i < InputWidget.widgetList.length; i++) {
            if (InputWidget.widgetList[i].name == name)
                return InputWidget.widgetList[i];
        }
    }
}

InputWidget.numberOfWidgets = 0;
InputWidget.updateFunction = null;
InputWidget.widgetList = [];
InputWidget.defaultJson = [{ 'title': '', 'value': '' }];

Widget._register(InputWidget);

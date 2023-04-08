
class ButtonWidget extends Widget {

    constructor(name, onLabel, offLabel, momentary, initialState) {
        super(name, "button", "x", 100, 100);
        this.onLabel = onLabel;
        this.offLabel = offLabel;
        this.momentary = momentary;
        this.state = initialState;
        ButtonWidget.numberOfWidgets++;
        ButtonWidget.widgetList.push(this);
        this.addButtonWidgetSpecificHTML();
    }

    updateButtonWidget(name, state) {
        pywebview.api.update_button_widget(name, state);
    }

    addButtonWidgetSpecificHTML() {
        this.header.innerText = this.name;
        this.header.style.setProperty("width", "auto");
        this.widgetBlock.style.setProperty("max-height", "100px");
        this.button = document.createElement("BUTTON");
        this.button.style.setProperty("box-shadow", "none");
        this.button.onmouseup = function () { this.blur(); };
        this.button.style.setProperty("max-height", "36px");
        this.button.style.setProperty("font-weight", "bold");
        if (this.momentary) {
            this.button.appendChild(document.createTextNode(this.onLabel));
            this.button.className = "btn btn-secondary active";
        } else {
            this.button.appendChild(document.createTextNode(this.offLabel));
            this.button.className = "btn btn-secondary";
        }

        let handleVirtualButtons = function (self) {
            console.log(self.name + " was pressed");
            if (self.initialState) {
                self.updateButtonWidget(self.name, 0);
                self.initialState = false;
                self.button.innerText = self.offLabel;
            } else {
                self.updateButtonWidget(self.name, 1);
                self.initialState = true;
                self.button.innerText = self.onLabel;
            }
            self.button.classList.toggle("active");
        }(this);

        function handleLetGo() {
            handleVirtualButtons();
            this.button.removeEventListener("mouseout", handleLetGo);
            this.button.removeEventListener("mouseup", handleLetGo);
        }

        function handleVirtualButtonsMomentary() {
            handleVirtualButtons();
            this.button.addEventListener("mouseout", handleLetGo);
            this.button.addEventListener("mouseup", handleLetGo);
        }

        if (this.momentary)
            this.button.addEventListener("mousedown", handleVirtualButtonsMomentary);
        else
            this.button.addEventListener("click", handleVirtualButtons);
        this.button.style.setProperty("float", "center")
        this.content.appendChild(this.button);
    }

    setupWidgetAsNew(widget) {

    }

    static getWidgetFromList(name) {
        for (let i = 0; i < ButtonWidget.widgetList.length; i++) {
            if (ButtonWidget.widgetList[i].name == name)
                return ButtonWidget.widgetList[i];
        }
    }
}

ButtonWidget.numberOfWidgets = 0;
ButtonWidget.updateFunction = null;
ButtonWidget.widgetList = [];
ButtonWidget.defaultJson = [{ 'title': '', 'onLabel': '', 'offLabel': '', 'momentary': false, 'initially': false }];

Widget._register(ButtonWidget);

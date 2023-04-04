
class Widget {

    // static pywebview;

    // static get pywebview() {
    //     if(!this.pywebview) {
    //         throw new Error('pywebview is not set');
    //     }
    //     return this.pywebview;
    // }

    // static setPywebview(pywebview) {
    //     this.pywebview = pywebview;
    // }

    constructor(name, widgetType, resizingType, minHeight, minWidth) {
        this.name = name;
        this.type = widgetType;
        this.resizingType = resizingType;
        this.minHeight = minHeight;
        this.minWidth = minWidth;
        this.createWidgetHTML();
    }

    // static setWidgetSettings(widgetSettings) {
    //     Widget.widgetSettings = widgetSettings;
    // }

    createWidgetHTML() {
        this.widgetBlock = document.createElement("div");
        this.widgetBlock.classList.add("widgetBlock");
        this.widgetBlock.style.setProperty("min-height", (String(this.minHeight)+"px"));
        this.widgetBlock.style.setProperty("min-width", (String(this.minWidth)+"px"));
        this.sizers = document.createElement("div");
        this.sizers.className = "resizers";
        // let primeColor = JSON.parse(JSON.parse(localStorage.getItem("settingsConfig"))["colorSettings"])["primaryColor"];
        this.sizers.style.setProperty("background-color", storage.settings.appTheme.primaryColor);
        this.header = document.createElement("div");
        this.header.className = "widgetHeader unselectable";
        this.sizers.appendChild(this.header);
        this.content = document.createElement("div");
        this.content.className = "widgetContent";
        this.sizers.appendChild(this.content);
        let sizer1 = document.createElement("div");
        let sizer2 = document.createElement("div");
        let sizer3 = document.createElement("div");
        let sizer4 = document.createElement("div");
        sizer1.className = "resizer top-left";
        sizer2.className = "resizer top-right";
        sizer3.className = "resizer bottom-left";
        sizer4.className = "resizer bottom-right";
        this.sizers.appendChild(sizer1);
        this.sizers.appendChild(sizer2);
        this.sizers.appendChild(sizer3);
        this.sizers.appendChild(sizer4);
        this.widgetBlock.appendChild(this.sizers);
        let widgetBoard = document.getElementById("widgetBoard");
        $(this.widgetBlock).draggable({
            handle: $(this.header),
            containment: widgetBoard,
            scroll: false,
        });
        // $(this.widgetBlock).draggable({ grid: [Widget.widgetSettings.gridSize, Widget.widgetSettings.gridSize] });
        let gridSize = storage.settings.dragging.gridSize;
        let snap = storage.settings.dragging.edgeSnap;
        $(this.widgetBlock).draggable({ grid: [gridSize, gridSize] });
        $(this.widgetBlock).draggable({ snap: snap });
        $(this.widgetBlock).draggable("disable");
        this.widgetBlock.style.setProperty("position", "absolute");
        widgetBoard.appendChild(this.widgetBlock);
    }

    makeDraggable() {
        $(this.widgetBlock).draggable("enable");
    }

    makeNotDraggable() {
        $(this.widgetBlock).draggable("disable");
    }

    makeResizable() {

    }

    makeNotResizable() {

    }

}
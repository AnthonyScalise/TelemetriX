

class GraphWidget extends Widget {

    constructor(name) {
        super(name, "graph", "xy", 100, 100);
        GraphWidget.numberOfWidgets++;
        GraphWidget.widgetList.push(this);
        this.addGraphWidgetSpecificHTML();
    }


    addGraphWidgetSpecificHTML() {
        this.header.innerText = (this.name);
        this.header.style.setProperty("width", "auto");
        this.widgetBlock.style.setProperty("min-height", "200px");
        this.widgetBlock.style.setProperty("min-width", "300px");
        this.graph = document.createElement("canvas");
        this.graph.style.setProperty("max-height", "36px");
        this.graph.style.setProperty("font-weight", "bold");
        this.graph.style.setProperty("float", "center");
        this.graph.style.setProperty("width", "100%");
        this.graph.style.setProperty("height", "100%");
        this.graph.style.setProperty("display", "block");
        this.graph.style.setProperty("margin", "auto");
        this.content.appendChild(this.graph);
        new Chart(this.graph, {
            type: 'line',
            // data: {
            //   datasets: [{
            //     axis: 'y',
            //     label: 'Dataset',
            //     data: [65, 59, 80, 81, 56, 55, 40],
            //   }]
            // }
        });
        this.graph.style.setProperty("width", "auto");
        this.graph.style.setProperty("height", "auto");
    }
}

GraphWidget.numberOfWidgets = 0;
GraphWidget.updateFunction = null;
GraphWidget.widgetList = [];
GraphWidget.defaultJson = {'title':''};

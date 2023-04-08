


class WidgetDashboard {

    constructor() {
        this.widgets = {};
        this.totalWidgets = 0;
    }

    addWidget(widget) {
        if (widget instanceof Widget) {
            if (this.widgets[widget.type] == null)
                this.widgets[widget.type] = [];
            this.widgets[widget.type].push(widget);
            this.totalWidgets++;
        }
    }

    applyToEveryWidget(func) {
        for (let widgetType in this.widgets) {
            for (let widget in this.widgets[widgetType]) {
                func(this.widgets[widgetType][widget]);
            }
        }
    }

    makeWidgetsDraggable() {
        this.applyToEveryWidget(function (widget) { widget.makeDraggable(); });
    }

    makeWidgetsNotDraggable() {
        this.applyToEveryWidget(function (widget) { widget.makeNotDraggable(); });
    }

    makeWidgetsResizable() {
        this.applyToEveryWidget(function (widget) { widget.makeResizable(); });
    }

    makeWidgetsNotResizable() {
        this.applyToEveryWidget(function (widget) { widget.makeNotResizable(); });
    }


    // // var position = {"inputWidgets":{"x":[],"y":[]}, "buttonWidgets":{"x":[],"y":[]}, "displayWidgets":{"x":[],"y":[]}, "consoleWidgets":{"x":[],"y":[]}, "graphWidgets":{"x":[],"y":[]}, "lightWidgets":{"x":[],"y":[]}};
    // function setupWidgetsAsNew(type, num, stage, storage) {
    //     if(stage==0) {
    //         if(type != "consoleWidgets" && type != "graphWidgets") {
    //             if(type == "buttonWidgets") {
    //                 let longestLen;
    //                 widgetElements[type][num]["button"].innerText = dashboardData["buttons"][num]["onLabel"];
    //                 longestLen = widgetElements[type][num]["button"].getBoundingClientRect().width+35;
    //                 if(widgetElements[type][num]["header"].getBoundingClientRect().width+10 > longestLen) { longestLen = widgetElements[type][num]["header"].getBoundingClientRect().width+10; }
    //                 widgetElements[type][num]["button"].innerText = dashboardData["buttons"][num]["offLabel"];
    //                 if(widgetElements[type][num]["header"].getBoundingClientRect().width+10 > longestLen) { longestLen = widgetElements[type][num]["header"].getBoundingClientRect().width+10; }
    //                 if(widgetElements[type][num]["button"].getBoundingClientRect().width+35 > longestLen) { longestLen = widgetElements[type][num]["button"].getBoundingClientRect().width+35; }
    //                 widgetElements[type][num]["button"].style.setProperty("width", (longestLen-35+"px"));
    //                 widgetElements[type][num]["button"].style.setProperty("min-width", (longestLen-35+"px"));
    //                 widgetElements[type][num]["widget"].style.setProperty("width", (longestLen+2+"px"));
    //                 widgetElements[type][num]["widget"].style.setProperty("min-width", (longestLen+2+"px"));
    //                 widgetElements[type][num]["button"].innerText = ((dashboardData["buttons"][num]["initially"]==true)? dashboardData["buttons"][num]["onLabel"] : dashboardData["buttons"][num]["offLabel"]);  
    //             } else if(type == "displayWidgets") {
    //                 widgetElements[type][num]["content"].style.setProperty("padding", "17px 0px");
    //                 widgetElements[type][num]["widget"].style.setProperty("min-width", widgetElements[type][num]["header"].getBoundingClientRect().width+12+"px");
    //             } else if(type == "inputWidgets") {
    //                 widgetElements[type][num]["content"].style.setProperty("width", (widgetElements[type][num]["header"].getBoundingClientRect().width+"px"));
    //                 widgetElements[type][num]["input"].style.setProperty("width", (widgetElements[type][num]["content"].getBoundingClientRect().width-10+"px"));
    //                 widgetElements[type][num]["widget"].style.setProperty("width", (widgetElements[type][num]["input"].getBoundingClientRect().width+22+"px"));
    //                 widgetElements[type][num]["widget"].style.setProperty("min-width", (widgetElements[type][num]["widget"].getBoundingClientRect().width+"px"));
    //                 widgetElements[type][num]["content"].style.setProperty("min-width", (widgetElements[type][num]["content"].getBoundingClientRect().width+"px"));
    //                 widgetElements[type][num]["input"].style.setProperty("min-width", (widgetElements[type][num]["input"].getBoundingClientRect().width+"px"));
    //                 widgetElements[type][num]["content"].style.setProperty("width", "auto");
    //             } else if(type == "lightWidgets") {
    //                 widgetElements[type][num]["content"].style.setProperty("padding", "17px 0px");
    //                 widgetElements[type][num]["widget"].style.setProperty("min-width", widgetElements[type][num]["header"].getBoundingClientRect().width+12+"px");
    //             }
    //             makeWidgetResizable(type, num, "x");
    //         } else {
    //             if(type == "consoleWidgets") {
    //                 widgetElements[type][num]["widget"].style.setProperty("width", parseFloat(widgetElements[type][num]["widget"].style.minWidth)+1+"px"); 
    //                 widgetElements[type][num]["widget"].style.setProperty("height", parseFloat(widgetElements[type][num]["widget"].style.minHeight)+1+"px");
    //                 widgetElements[type][num]["textarea"].style.setProperty("width", parseFloat(widgetElements[type][num]["textarea"].style.minWidth)+1+"px");
    //                 widgetElements[type][num]["textarea"].style.setProperty("height", parseFloat(widgetElements[type][num]["textarea"].style.minHeight)+1+"px");
    //             } else if(type == "graphWidgets") {
    //                 widgetElements[type][num]["widget"].style.setProperty("width", parseFloat(widgetElements[type][num]["widget"].style.minWidth)+1+"px"); 
    //                 widgetElements[type][num]["widget"].style.setProperty("height", parseFloat(widgetElements[type][num]["widget"].style.minHeight)+1+"px");


    //             }
    //             makeWidgetResizable(type, num, "both");
    //         }
    //         $(widgetElements[type][num]["widget"]).draggable("enable");
    //         widgetElements[type][num]["widget"].style.setProperty("position", "relative");
    //         widgetElements[type][num]["widget"].style.setProperty("left", ("0px"));
    //         widgetElements[type][num]["widget"].style.setProperty("top", ("0px"));
    //     } else if(stage==1) {
    //         storage[type]["x"][num] = widgetElements[type][num]["widget"].offsetLeft+"px";
    //         storage[type]["y"][num] = widgetElements[type][num]["widget"].offsetTop+"px";
    //     } else if(stage==2) {
    //         widgetElements[type][num]["widget"].style.setProperty("position", "absolute");
    //         widgetElements[type][num]["widget"].style.setProperty("left", storage[type]["x"][num]);
    //         widgetElements[type][num]["widget"].style.setProperty("top", storage[type]["y"][num]);
    //     }
    //     return storage;
    // }


    // makeWidgetResizable(widgetType, widgetNum, axis) {
    //     let element = widgetElements[widgetType][widgetNum]["widget"];
    //     element.classList.add("resizable");
    //     let resizers = element.querySelectorAll(" .resizer");
    //     let minimum_width = parseFloat(element.style.minWidth);
    //     let minimum_height = parseFloat(element.style.minHeight);
    //     let original_width = 0;
    //     let original_height = 0;\
    //     let original_x = 0;
    //     let original_y = 0;
    //     let original_mouse_x = 0;
    //     let original_mouse_y = 0;
    //     switch(widgetType) {
    //         case("consoleWidgets"): 
    //             var consWindow = widgetElements[widgetType][widgetNum]["textarea"]; 
    //             consWindow.style.width = (parseFloat(consWindow.style.width.replace("px", ""))-10+"px");
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "10px 10px 2px 10px");
    //             break;

    //         case("inputWidgets"):
    //             var inpWindow = widgetElements[widgetType][widgetNum]["input"];
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "15px 5px");
    //             break;

    //         case("buttonWidgets"):
    //             var btnWindow = widgetElements[widgetType][widgetNum]["button"];
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "10px 10px");
    //             btnWindow.style.setProperty("width", (element.getBoundingClientRect().width-37+"px"));
    //             break;

    //         case("displayWidgets"):
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "17px 0px");
    //             widgetElements[widgetType][widgetNum]["header"].style.setProperty("padding", "5px 5px");
    //             break;
    //         case("graphWidgets"): 
    //             var graphWindow = widgetElements[widgetType][widgetNum]["graph"]; 
    //             graphWindow.style.width = (parseFloat(graphWindow.style.width.replace("px", ""))-10+"px");
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "10px 10px 2px 10px");
    //             break;
    //         case("lightWidgets"): 
    //             var lightWindow = widgetElements[widgetType][widgetNum]["light"]; 
    //             // lightWindow.style.width = (parseFloat(graphWindow.style.width.replace("px", ""))-10+"px");
    //             // widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "10px 10px 2px 10px");
    //             break;
    //     }
    //     for (let i = 0;i < resizers.length; i++) {
    //         const currentResizer = resizers[i];
    //         currentResizer.addEventListener('mousedown', function(e) {
    //             e.preventDefault()
    //             original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    //             original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
    //             original_x = element.getBoundingClientRect().left;
    //             original_y = element.getBoundingClientRect().top;
    //             original_mouse_x = e.pageX;
    //             original_mouse_y = e.pageY;
    //             window.addEventListener('mousemove', resize);
    //             window.addEventListener('mouseup', stopResize);
    //         })
    //         function resize(e) {
    //             if (currentResizer.classList.contains('bottom-right')) {
    //                 var width = original_width + (e.pageX - original_mouse_x);
    //                 var height = original_height + (e.pageY - original_mouse_y);
    //                 if (width > minimum_width && (axis=="x" || axis=="both")) {
    //                     element.style.width = width + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "inputWidgets") { inpWindow.style.width = ((width-22)+"px"); }
    //                     if(widgetType == "buttonWidgets") { btnWindow.style.width = ((width-37)+"px"); }
    //                     if(widgetType == "lightWidgets") { lightWindow.style.width = ((width-32)+"px"); }
    //                 }
    //                 if (height > minimum_height && (axis=="y" || axis=="both")) {
    //                     element.style.height = height + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.height = ((height-84.7)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.height = ((height-84.7)+"px"); }
    //                 }
    //             } else if (currentResizer.classList.contains('bottom-left')) {
    //                 var height = original_height + (e.pageY - original_mouse_y);
    //                 var width = original_width - (e.pageX - original_mouse_x);
    //                 if (height > minimum_height && (axis=="y" || axis=="both")) {
    //                     element.style.height = height + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.height = ((height-84.7)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.height = ((height-84.7)+"px"); }
    //                 }
    //                 if (width > minimum_width && (axis=="x" || axis=="both")) {
    //                     element.style.width = width + 'px';
    //                     element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "inputWidgets") { inpWindow.style.width = ((width-22)+"px"); }
    //                     if(widgetType == "buttonWidgets") { btnWindow.style.width = ((width-37)+"px"); }  
    //                     if(widgetType == "lightWidgets") { lightWindow.style.width = ((width-32)+"px"); }
    //                 }
    //             } else if (currentResizer.classList.contains('top-right')) {
    //                 var width = original_width + (e.pageX - original_mouse_x);
    //                 var height = original_height - (e.pageY - original_mouse_y);
    //                 if (width > minimum_width && (axis=="x" || axis=="both")) {
    //                     element.style.width = width + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "inputWidgets") { inpWindow.style.width = ((width-22)+"px"); }
    //                     if(widgetType == "buttonWidgets") { btnWindow.style.width = ((width-37)+"px"); } 
    //                     if(widgetType == "lightWidgets") { lightWindow.style.width = ((width-32)+"px"); }
    //                 }
    //                 if (height > minimum_height && (axis=="y" || axis=="both")) {
    //                     element.style.height = height + 'px';
    //                     element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.height = ((height-84.7)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.height = ((height-84.7)+"px"); }
    //                 }
    //             } else {
    //                 var width = original_width - (e.pageX - original_mouse_x);
    //                 var height = original_height - (e.pageY - original_mouse_y);
    //                 if (width > minimum_width && (axis=="x" || axis=="both")) {
    //                     element.style.width = width + 'px';
    //                     element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.width = ((width-32)+"px"); }
    //                     if(widgetType == "inputWidgets") { inpWindow.style.width = ((width-22)+"px"); }
    //                     if(widgetType == "buttonWidgets") { btnWindow.style.width = ((width-37)+"px"); }  
    //                     if(widgetType == "lightWidgets") { lightWindow.style.width = ((width-32)+"px"); }
    //                 }
    //                 if (height > minimum_height && (axis=="y" || axis=="both")) {
    //                     element.style.height = height + 'px';
    //                     element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
    //                     if(widgetType == "consoleWidgets") { consWindow.style.height = ((height-84.7)+"px"); }
    //                     if(widgetType == "graphWidgets") { graphWindow.style.height = ((height-84.7)+"px"); }
    //                 }
    //             }
    //         }
    //         function stopResize() {window.removeEventListener("mousemove", resize)}
    //     }
    // }



    // stopResizing(widgetType, widgetNum) {
    //     let widgetArea = widgetElements[widgetType][widgetNum]["widget"];
    //     widgetArea.classList.remove("resizable");
    //     switch(widgetType) {
    //         case("buttonWidgets"):
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "15px 10px");
    //             widgetElements[widgetType][widgetNum]["button"].style.setProperty("width", (widgetArea.getBoundingClientRect().width-37+"px"));
    //             break;

    //         case("displayWidgets"):
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "17px 0px");
    //             widgetElements[widgetType][widgetNum]["header"].style.setProperty("padding", "5px 10px");
    //             break;

    //         case("inputWidgets"):
    //             let inpSpace = widgetElements[widgetType][widgetNum]["input"];
    //             inpSpace.style.width = (widgetArea.getBoundingClientRect().width-22+"px");
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "20px 0px");
    //             break;

    //         case("consoleWidgets"):
    //             let consWindow = widgetElements[widgetType][widgetNum]["textarea"];
    //             let consWindowSpace = widgetElements[widgetType][widgetNum]["content"];
    //             consWindow.style.width = (parseFloat(consWindow.style.width.replace("px", ""))+10+"px");
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "15px 10px 7px 10px");
    //             consWindowSpace.style.setProperty("height", "");
    //             consWindowSpace.style.setProperty("width", "");
    //             break;
    //         case("graphWidgets"):
    //             let graphWindow = widgetElements[widgetType][widgetNum]["graph"]; 
    //             // graphWindow.style.width = (parseFloat(graphWindow.style.width.replace("px", ""))-10+"px");
    //             // widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "10px 10px 2px 10px");
    //             break;
    //         case("lightWidgets"):
    //             widgetElements[widgetType][widgetNum]["content"].style.setProperty("padding", "15px 10px");
    //             widgetElements[widgetType][widgetNum]["header"].style.setProperty("padding", "5px 10px");
    //             break;
    //     }
    // }





    //  $(".lock").click(function() {
    //     if (typeof(Storage) !== "undefined") {
    //         $(this).toggleClass("unlocked");
    //         if (document.getElementById("posLock").className == "lock unlocked") {
    //             for(let widgetType in widgetElements) {
    //                 if(widgetType != "countList") {
    //                     for(let widgetNum in widgetElements[widgetType]) {
    //                         //Type dependent settings
    //                         if(widgetType != "consoleWidgets" && widgetType != "graphWidgets") {
    //                             makeWidgetResizable(widgetType, widgetNum, "x");
    //                         } else {
    //                             makeWidgetResizable(widgetType, widgetNum, "both");
    //                         }
    //                         $(widgetElements[widgetType][widgetNum]["widget"]).draggable("enable");
    //                     } 
    //                 }
    //             }
    //         } else {
    //             let saveConfig = {};
    //             if(previousConfigurationExists == "found") {
    //                 saveConfig = previousConfigurationSave;
    //             } else if(previousConfigurationExists == "none") {
    //                 saveConfig = {"inputWidgets": [], "buttonWidgets": [], "displayWidgets": [], "consoleWidgets": [], "graphWidgets": [], "lightWidgets": []};
    //                 for(let type in saveConfig) {
    //                     for(let num in widgetElements[type]) { saveConfig[type][num] = {"position": {}, "size": {}}; }
    //                 }
    //             } else if(previousConfigurationExists == "modified") {
    //                 saveConfig = previousConfigurationSave;
    //                 for(let type in widgetElements) {
    //                     if(type != "countList") {
    //                         for(let num in widgetElements[type]) {
    //                             if(!(num in previousConfigurationSave[type])) {
    //                                 saveConfig[type][num] = {"position": {}, "size": {}};
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             for(let widgetType in widgetElements) {
    //                 if(widgetType != "countList") {
    //                     for(let widgetNum in widgetElements[widgetType]) {
    //                         let positionBox = widgetElements[widgetType][widgetNum]["widget"].getBoundingClientRect();
    //                         $(widgetElements[widgetType][widgetNum]["widget"]).draggable("disable");
    //                         let absolutePosX = $(widgetElements[widgetType][widgetNum]["widget"]).offset().left+"px";
    //                         let absolutePosY = $(widgetElements[widgetType][widgetNum]["widget"]).offset().top+"px";
    //                         widgetElements[widgetType][widgetNum]["widget"].style.setProperty("left", absolutePosX);
    //                         widgetElements[widgetType][widgetNum]["widget"].style.setProperty("top", absolutePosY);
    //                         widgetElements[widgetType][widgetNum]["widget"].style.setProperty("position", "absolute");
    //                         stopResizing(widgetType, widgetNum);
    //                         saveConfig[widgetType][widgetNum]["position"] = {"x": absolutePosX, "y": absolutePosY};
    //                         switch(widgetType) {
    //                             case("displayWidgets"):
    //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width}; 
    //                                 break;

    //                             case("buttonWidgets"):
    //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
    //                                 break;

    //                             case("inputWidgets"):
    //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
    //                                 break;

    //                             case("consoleWidgets"):
    //                                 saveConfig[widgetType][widgetNum]["size"] = {
    //                                     "height": positionBox.height,
    //                                     "width": positionBox.width
    //                                 }
    //                                 break;
    //                             case("graphWidgets"):
    //                                 saveConfig[widgetType][widgetNum]["size"] = {
    //                                     "height": positionBox.height,
    //                                     "width": positionBox.width
    //                                 }
    //                                 break;
    //                             case("buttonWidgets"):
    //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
    //                                 break;
    //                             case("lightWidgets"):
    //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
    //                                 break;
    //                         }
    //                     }
    //                 }
    //             }
    //             localStorage.setItem("saveConfig", JSON.stringify(saveConfig));
    //         }
    //     } else {
    //         swal({
    //             title: 'Uh oh...',
    //             text: 'There was a problem while attempting to utilize local storage'
    //         })
    //     }
    // });
}

// WidgetDashboard.widgetTypeList = [Widget];
// window.WidgetDashboard = WidgetDashboard;
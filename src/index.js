// import {WidgetDashboard} from './Widgets/WidgetDashboard.js';
// import {LightWidget} from './WidgetTypes/Outputs/LightWidget.js';
// import WidgetDashboard from "./Widgets/WidgetDashboard.js";
// import LightWidget from "./Widgets/WidgetTypes/Outputs/LightWidget.js";
// const WidgetDashboard = require("./Widgets/WidgetDashboard.js");
// const LightWidget = require("./Widgets/WidgetTypes/Outputs/LightWidget.js");
var serialConnection = false;
var repUpdateDashboard;
var repVirtualInputs;
var repVirtualDisplays;
var repVirtualConsoles;
var repVirtualGraphs;
var repVirtualLights;
var settingConfiguration;
var widgetJsonProfile;


// window.addEventListener('pywebviewready', function() {
//     console.log("WERE IN BUISNESS");
//     window.pwv = pywebview;
// });

// const apiReady = new Promise((resolve) => {
//     window.addEventListener('pywebviewready', () => {
//         resolve();
//     });
// });

// apiReady.then(() => {

// });






// if(!localStorage.comPort) {
//     localStorage.setItem('comPort', '');
// }

//  Variable to hold dashboard widget runtime data
var dashboardData = {};

//  Array to hold the dashboard widget elements
var widgetElements = {
    "countList": {"buttonWidgets": 0, "inputWidgets": 0, "displayWidgets": 0, "consoleWidgets": 0, "graphWidgets": 0, "lightWidgets": 0}, 
    "consoleWidgets": [], 
    "buttonWidgets": [],  
    "inputWidgets": [], 
    "displayWidgets": [],
    "graphWidgets": [],
    "lightWidgets": []
};

//  The function that initializes the driver dashboard
// function initializeDashboard() {
//     dashboardData = JSON.parse(arguments[0]);
//     widgetElements["countList"]["buttonWidgets"] = Object.keys(dashboardData["buttons"]).length;
//     widgetElements["countList"]["inputWidgets"] = Object.keys(dashboardData["inputs"]).length;
//     widgetElements["countList"]["displayWidgets"] = Object.keys(dashboardData["displays"]).length;
//     widgetElements["countList"]["consoleWidgets"] = Object.keys(dashboardData["consoles"]).length;
//     widgetElements["countList"]["graphWidgets"] = Object.keys(dashboardData["graphs"]).length;
//     widgetElements["countList"]["lightWidgets"] = Object.keys(dashboardData["lights"]).length;
//     var widgetBoardSpace = document.getElementById("widgetBoard");
//     //  Variable to hold the state of wether a previous widget position configuration exists
//     var previousConfigurationSave = {};
//     var previousConfigurationExists = "none";
//     var changedSinceSave = false;
//     if(typeof(Storage) !== "undefined") {
//         if(localStorage.saveConfig) {
//             previousConfigurationSave = JSON.parse(localStorage.getItem("saveConfig"));
//             for(let type in widgetElements) {
//                 if(type != "countList") {
//                     for(let num=0; num<widgetElements["countList"][type]; num++) {
//                         if(!(num == previousConfigurationSave[type])) { 
//                             changedSinceSave = true;
//                         }
//                     }
//                 }
//             }
//             if(changedSinceSave) { 
//                 previousConfigurationExists = "modified";
//             } else {
//                 $("#posLock").toggleClass("unlocked");
//                 previousConfigurationExists = "found";
//             }
//         }
//         if(localStorage.settingsConfig) {
//             settingConfiguration = JSON.parse(localStorage.getItem("settingsConfig"));
//             widgetJsonProfile = settingConfiguration["widgetJson"];
//         } else {
//             let defaultJson = '{\n\t"buttons": [\n\n\t],\n\t"inputs": [\n\n\t],\n\t"displays": [\n\n\t],\n\t"consoles": [\n\n\t],\n\t"graphs": [\n\n\t]\n\t"lights": [\n\n\t]\n}';
//             settingConfiguration = {"widgetGrid": false, "gridSize": 1, "widgetSnap": true, "widgetJson": defaultJson};
//             localStorage.setItem("settingsConfig", JSON.stringify(settingConfiguration));
//         }
//     }

//     for(let widgetType in widgetElements) {
//         if(widgetType != "countList") {
//             for(let widgetNum=0; widgetNum < widgetElements["countList"][widgetType]; widgetNum++) {
//                 widgetElements[widgetType][widgetNum] = {};
//                 widgetElements[widgetType][widgetNum]["widget"] = document.createElement("div");
//                 widgetElements[widgetType][widgetNum]["widget"].className = "widgetBlock";
//                 widgetElements[widgetType][widgetNum]["sizers"] = document.createElement("div");
//                 widgetElements[widgetType][widgetNum]["sizers"].className = "resizers";
//                 let primeColor = JSON.parse(JSON.parse(localStorage.getItem("settingsConfig"))["colorSettings"])["primaryColor"];
//                 widgetElements[widgetType][widgetNum]["sizers"].style.setProperty("background-color", primeColor);
//                 widgetElements[widgetType][widgetNum]["header"] = document.createElement("div");
//                 widgetElements[widgetType][widgetNum]["header"].className = "widgetHeader unselectable";
//                 widgetElements[widgetType][widgetNum]["sizers"].appendChild(widgetElements[widgetType][widgetNum]["header"]);
//                 widgetElements[widgetType][widgetNum]["content"] = document.createElement("div");
//                 widgetElements[widgetType][widgetNum]["content"].className = "widgetContent";
//                 widgetElements[widgetType][widgetNum]["sizers"].appendChild(widgetElements[widgetType][widgetNum]["content"]);
//                 let inputSizer1 = document.createElement("div");
//                 inputSizer1.className = 'resizer top-left';
//                 widgetElements[widgetType][widgetNum]["sizers"].appendChild(inputSizer1);
//                 let inputSizer2 = document.createElement("div");
//                 inputSizer2.className = 'resizer top-right';
//                 widgetElements[widgetType][widgetNum]["sizers"].appendChild(inputSizer2);
//                 let inputSizer3 = document.createElement("div");
//                 inputSizer3.className = 'resizer bottom-left';
//                 widgetElements[widgetType][widgetNum]["sizers"].appendChild(inputSizer3);
//                 let inputSizer4 = document.createElement("div");
//                 inputSizer4.className = 'resizer bottom-right';
//                 widgetElements[widgetType][widgetNum]["sizers"].appendChild(inputSizer4);
//                 widgetElements[widgetType][widgetNum]["widget"].appendChild(widgetElements[widgetType][widgetNum]["sizers"]);
//                 $(widgetElements[widgetType][widgetNum]["widget"]).draggable({
//                     handle: $(widgetElements[widgetType][widgetNum]["header"]),
//                     containment: widgetBoardSpace,
//                     scroll: false,
//                 });
//                 if(settingConfiguration["widgetGrid"]) {
//                     let gridSize = settingConfiguration["gridSize"];
//                     $(widgetElements[widgetType][widgetNum]["widget"]).draggable({ grid: [gridSize, gridSize] });
//                 }
//                 if(settingConfiguration["widgetSnap"]) {
//                     $(widgetElements[widgetType][widgetNum]["widget"]).draggable({ snap: true });
//                 }
//                 $(widgetElements[widgetType][widgetNum]["widget"]).draggable("disable");
//                 widgetElements[widgetType][widgetNum]["widget"].style.setProperty("position", "absolute");
//                 widgetBoardSpace.appendChild(widgetElements[widgetType][widgetNum]["widget"]);
//             }
//         }
//     } 


//     //  Virtual Inputs
//     for (let i = 0; i < widgetElements["countList"]["inputWidgets"]; i++) { 
//         widgetElements["inputWidgets"][i]["widget"].style.setProperty("max-height", "100px");
//         widgetElements["inputWidgets"][i]["widget"].style.setProperty("width", "auto");
//         widgetElements["inputWidgets"][i]["header"].innerText = (dashboardData["inputs"][i]["title"]);
//         widgetElements["inputWidgets"][i]["header"].style.setProperty("width", "auto");
//         widgetElements["inputWidgets"][i]["header"].style.setProperty("height", "32px");
//         dashboardData["inputs"][i]["inpValue"] = dashboardData["inputs"][i]["value"];
//         widgetElements["inputWidgets"][i]["input"] = document.createElement("INPUT");
//         let inputField = widgetElements["inputWidgets"][i]["input"];
//         inputField.style.setProperty("width", "30px");
//         inputField.style.setProperty("background-color", "#202020");
//         inputField.style.setProperty("color", "white");
//         inputField.style.setProperty("border", "3px solid #121212")
//         inputField.setAttribute("type", "number");
//         inputField.setAttribute("value", dashboardData["inputs"][i]["value"]);
//         widgetElements["inputWidgets"][i]["content"].style.setProperty("padding", "20px 0px");
//         widgetElements["inputWidgets"][i]["content"].appendChild(inputField);
//     }

//     //  Virtual Displays
//     for (let i = 0; i < widgetElements["countList"]["displayWidgets"]; i++) {
//         widgetElements["displayWidgets"][i]["widget"].style.setProperty("height", "100px");
//         let colors = JSON.parse(JSON.parse(localStorage.getItem("settingsConfig"))["colorSettings"]);
//         let primeColor = colors["primaryColor"];
//         let secondColor = colors["secondaryColor"];
//         widgetElements["displayWidgets"][i]["widget"].style.setProperty("background-color", primeColor);
//         widgetElements["displayWidgets"][i]["header"].appendChild(document.createTextNode(dashboardData["displays"][i]["title"]));
//         let displayNode = document.createTextNode(" ");
//         widgetElements["displayWidgets"][i]["content"].appendChild(displayNode);
//         widgetElements["displayWidgets"][i]["content"].style.color = secondColor;
//         widgetElements["displayWidgets"][i]["content"].style.setProperty("font-weight", "bold");
//     }

//     //  Virtual Consoles
//     for (let i = 0; i < widgetElements["countList"]["consoleWidgets"]; i++) {
//         widgetElements["consoleWidgets"][i]["widget"].style.setProperty("min-width", "187px");        
//         widgetElements["consoleWidgets"][i]["widget"].style.setProperty("min-height", "213px");
//         widgetElements["consoleWidgets"][i]["content"].style.setProperty("padding", "15px 10px 7px");
//         widgetElements["consoleWidgets"][i]["content"].style.setProperty("min-width", "175px");
//         widgetElements["consoleWidgets"][i]["content"].style.setProperty("min-height", "168px");
//         dashboardData["consoles"][i]["value"] = String("");
//         dashboardData["consoles"][i]["valueChanged"] = false;
//         widgetElements["consoleWidgets"][i]["header"].appendChild(document.createTextNode(dashboardData["consoles"][i]["title"]));
//         widgetElements["consoleWidgets"][i]["textarea"] = document.createElement("TEXTAREA");
//         widgetElements["consoleWidgets"][i]["textarea"].style.setProperty("min-width", "155px");
//         widgetElements["consoleWidgets"][i]["textarea"].style.setProperty("min-height", "128px");
//         widgetElements["consoleWidgets"][i]["textarea"].cols = 30;
//         widgetElements["consoleWidgets"][i]["textarea"].rows = 10;
//         widgetElements["consoleWidgets"][i]["textarea"].value = ">";
//         widgetElements["consoleWidgets"][i]["textarea"].readOnly = true;
//         widgetElements["consoleWidgets"][i]["textarea"].setAttribute("overflow", "auto");
//         widgetElements["consoleWidgets"][i]["textarea"].style.setProperty("resize", "none");
//         widgetElements["consoleWidgets"][i]["textarea"].style.setProperty("outline", "none");
//         widgetElements["consoleWidgets"][i]["textarea"].style.setProperty("background-color", "#202020");
//         widgetElements["consoleWidgets"][i]["textarea"].style.setProperty("color", "white");
//         widgetElements["consoleWidgets"][i]["textarea"].style.setProperty("border", "3px solid #121212");
//         widgetElements["consoleWidgets"][i]["content"].appendChild(widgetElements["consoleWidgets"][i]["textarea"]);
//         let buttonSpace = document.createElement("div");
//         buttonSpace.style.setProperty("text-align", "right");
//         let consoleClearBtn = document.createElement("BUTTON");
//         consoleClearBtn.appendChild(document.createTextNode("Clear"));
//         consoleClearBtn.className = "btn btn-secondary btn-sm";
//         consoleClearBtn.style.setProperty("padding", "0px 5px");
//         consoleClearBtn.style.setProperty("margin", "0px 5px 0px 0px");
//         let clearLogData = function(index) { return function() { 
//             swal("Are you sure?",("This will clear the \""+dashboardData["consoles"][index]["title"]+"\" log console"), {buttons: ["Cancel", "Yes"]}).then((value) => {
//                 if(value == true) {
//                     dashboardData["consoles"][index]["value"] = String(""); 
//                     widgetElements["consoleWidgets"][index]["textarea"].value = String("");
//                 }
//             });
//         }}(i);
//         consoleClearBtn.addEventListener("click", clearLogData);
//         buttonSpace.appendChild(consoleClearBtn);
//         let consoleSaveBtn = document.createElement("BUTTON");
//         consoleSaveBtn.appendChild(document.createTextNode("Download"));
//         consoleSaveBtn.className = "btn btn-secondary btn-sm";
//         consoleSaveBtn.style.setProperty("padding", "0px 5px");
//         let saveLogDataFile = function(index) { return function() {
//             pywebview.api.download_dialog((dashboardData["consoles"][index]["title"]+'_LogSave.txt'), dashboardData["consoles"][index]["value"]);
//         }}(i);
//         consoleSaveBtn.addEventListener("click", saveLogDataFile);
//         buttonSpace.appendChild(consoleSaveBtn);
//         widgetElements["consoleWidgets"][i]["content"].appendChild(buttonSpace);
//     }

//     //  Virtual Buttons
//     for (let i = 0; i < widgetElements["countList"]["buttonWidgets"]; i++) {
//         widgetElements["buttonWidgets"][i]["header"].innerText = (dashboardData["buttons"][i]["title"]);
//         widgetElements["buttonWidgets"][i]["header"].style.setProperty("width", "auto");
//         widgetElements["buttonWidgets"][i]["widget"].style.setProperty("max-height", "100px");
//         widgetElements["buttonWidgets"][i]["button"] = document.createElement("BUTTON");
//         widgetElements["buttonWidgets"][i]["button"].style.setProperty("box-shadow", "none");
//         widgetElements["buttonWidgets"][i]["button"].onmouseup = function() { this.blur(); };
//         widgetElements["buttonWidgets"][i]["button"].style.setProperty("max-height", "36px");
//         widgetElements["buttonWidgets"][i]["button"].style.setProperty("font-weight", "bold");
//         if (dashboardData["buttons"][i]["momentary"] == true) {
//             widgetElements["buttonWidgets"][i]["button"].appendChild(document.createTextNode(dashboardData["buttons"][i]["onLabel"]));
//             widgetElements["buttonWidgets"][i]["button"].className = "btn btn-secondary active";
//         } else {
//             widgetElements["buttonWidgets"][i]["button"].appendChild(document.createTextNode(dashboardData["buttons"][i]["offLabel"]));
//             widgetElements["buttonWidgets"][i]["button"].className = "btn btn-secondary";
//         }
        
//         let handleVirtualButtons = function() {
//             if (dashboardData["buttons"][i]["initially"] == true) {
//                 pywebview.api.update_button_widget(dashboardData["buttons"][i]["title"], 0);
//                 dashboardData["buttons"][i]["initially"] = false;
//                 widgetElements["buttonWidgets"][i]["button"].innerText = dashboardData["buttons"][i]["offLabel"];
//             } else {
//                 pywebview.api.update_button_widget(dashboardData["buttons"][i]["title"], 1);
//                 dashboardData["buttons"][i]["initially"] = true;
//                 widgetElements["buttonWidgets"][i]["button"].innerText = dashboardData["buttons"][i]["onLabel"];
//             }
//             widgetElements["buttonWidgets"][i]["button"].classList.toggle("active");
//         };
        
//         let handleLetGo = function() { 
//             handleVirtualButtons();
//             widgetElements["buttonWidgets"][i]["button"].removeEventListener("mouseout", handleLetGo);
//             widgetElements["buttonWidgets"][i]["button"].removeEventListener("mouseup", handleLetGo);
//         };

//         let handleVirtualButtonsMomentary = function() {
//             handleVirtualButtons();
//             widgetElements["buttonWidgets"][i]["button"].addEventListener("mouseout", handleLetGo);
//             widgetElements["buttonWidgets"][i]["button"].addEventListener("mouseup", handleLetGo);
//         };

//         if (dashboardData["buttons"][i]["momentary"] == true) {
//             widgetElements["buttonWidgets"][i]["button"].addEventListener("mousedown", handleVirtualButtonsMomentary);
//         } else { 
//             widgetElements["buttonWidgets"][i]["button"].addEventListener("click", handleVirtualButtons);
//         }
//         widgetElements["buttonWidgets"][i]["button"].style.setProperty("float", "center")
//         widgetElements["buttonWidgets"][i]["content"].appendChild(widgetElements["buttonWidgets"][i]["button"]);
//     }

//     //  Virtual Graphs
//     for (let i = 0; i < widgetElements["countList"]["graphWidgets"]; i++) {
//         widgetElements["graphWidgets"][i]["header"].innerText = (dashboardData["graphs"][i]["title"]);
//         widgetElements["graphWidgets"][i]["header"].style.setProperty("width", "auto");
//         widgetElements["graphWidgets"][i]["widget"].style.setProperty("min-height", "200px");
//         widgetElements["graphWidgets"][i]["widget"].style.setProperty("min-width", "100px");
//         widgetElements["graphWidgets"][i]["graph"] = document.createElement("canvas");
//         widgetElements["graphWidgets"][i]["graph"].style.setProperty("max-height", "36px");
//         widgetElements["graphWidgets"][i]["graph"].style.setProperty("font-weight", "bold");
//         widgetElements["graphWidgets"][i]["graph"].style.setProperty("float", "center");
//         widgetElements["graphWidgets"][i]["graph"].style.setProperty("width", "100%");
//         widgetElements["graphWidgets"][i]["graph"].style.setProperty("height", "100%");
//         widgetElements["graphWidgets"][i]["graph"].style.setProperty("display", "block");
//         widgetElements["graphWidgets"][i]["graph"].style.setProperty("margin", "auto");
//         widgetElements["graphWidgets"][i]["content"].appendChild(widgetElements["graphWidgets"][i]["graph"]);
//         new Chart(widgetElements["graphWidgets"][i]["graph"], {
//             type: 'line',
//             // data: {
//             //   datasets: [{
//             //     axis: 'y',
//             //     label: 'Dataset',
//             //     data: [65, 59, 80, 81, 56, 55, 40],
//             //   }]
//             // }
//         });
//     }

//     //  Virtual Lights
//     for (let i = 0; i < widgetElements["countList"]["lightWidgets"]; i++) {
//         widgetElements["lightWidgets"][i]["header"].innerText = (dashboardData["lights"][i]["title"]);
//         widgetElements["lightWidgets"][i]["header"].style.setProperty("width", "auto");
//         widgetElements["lightWidgets"][i]["widget"].style.setProperty("max-height", "100px");
//         widgetElements["lightWidgets"][i]["light"] = document.createElement("SPAN");
//         widgetElements["lightWidgets"][i]["light"].style.setProperty("height", "30px");
//         widgetElements["lightWidgets"][i]["light"].style.setProperty("width", "30px");
//         widgetElements["lightWidgets"][i]["light"].classList.add(((dashboardData["lights"][i]["initially"]? "enabled":"disabled")+"-light"));
//         widgetElements["lightWidgets"][i]["light"].style.setProperty("border-radius", "50%");
//         widgetElements["lightWidgets"][i]["light"].style.setProperty("display", "inline-block");
//         widgetElements["lightWidgets"][i]["light"].style.setProperty("float", "center");
//         widgetElements["lightWidgets"][i]["content"].appendChild(widgetElements["lightWidgets"][i]["light"]);
//         widgetElements["lightWidgets"][i]["content"].style.setProperty("max-height", "56px");
//     }


//     repVirtualInputs = window.setInterval(handleVirtualInputs, 50); //  Set interval to update virtual inputs
//     repVirtualDisplays = window.setInterval(handleVirtualDisplays, 50); //  Set interval to update virtual display
//     repVirtualConsoles = window.setInterval(handleVirtualConsoles, 50); //  Set interval to update virtual console
//     repVirtualGraphs = window.setInterval(handleVirtualGraphs, 50); //  Set interval to update virtual graphs
//     repVirtualLights = window.setInterval(handleVirtualLights, 50); //  Set interval to update virtual lights

//     // $(".lock").click(function() {
//     //     if (typeof(Storage) !== "undefined") {
//     //         $(this).toggleClass("unlocked");
//     //         if (document.getElementById("posLock").className == "lock unlocked") {
//     //             for(let widgetType in widgetElements) {
//     //                 if(widgetType != "countList") {
//     //                     for(let widgetNum in widgetElements[widgetType]) {
//     //                         //Type dependent settings
//     //                         if(widgetType != "consoleWidgets" && widgetType != "graphWidgets") {
//     //                             makeWidgetResizable(widgetType, widgetNum, "x");
//     //                         } else {
//     //                             makeWidgetResizable(widgetType, widgetNum, "both");
//     //                         }
//     //                         $(widgetElements[widgetType][widgetNum]["widget"]).draggable("enable");
//     //                     } 
//     //                 }
//     //             }
//     //         } else {
//     //             let saveConfig = {};
//     //             if(previousConfigurationExists == "found") {
//     //                 saveConfig = previousConfigurationSave;
//     //             } else if(previousConfigurationExists == "none") {
//     //                 saveConfig = {"inputWidgets": [], "buttonWidgets": [], "displayWidgets": [], "consoleWidgets": [], "graphWidgets": [], "lightWidgets": []};
//     //                 for(let type in saveConfig) {
//     //                     for(let num in widgetElements[type]) { saveConfig[type][num] = {"position": {}, "size": {}}; }
//     //                 }
//     //             } else if(previousConfigurationExists == "modified") {
//     //                 saveConfig = previousConfigurationSave;
//     //                 for(let type in widgetElements) {
//     //                     if(type != "countList") {
//     //                         for(let num in widgetElements[type]) {
//     //                             if(!(num in previousConfigurationSave[type])) {
//     //                                 saveConfig[type][num] = {"position": {}, "size": {}};
//     //                             }
//     //                         }
//     //                     }
//     //                 }
//     //             }
//     //             for(let widgetType in widgetElements) {
//     //                 if(widgetType != "countList") {
//     //                     for(let widgetNum in widgetElements[widgetType]) {
//     //                         let positionBox = widgetElements[widgetType][widgetNum]["widget"].getBoundingClientRect();
//     //                         $(widgetElements[widgetType][widgetNum]["widget"]).draggable("disable");
//     //                         let absolutePosX = $(widgetElements[widgetType][widgetNum]["widget"]).offset().left+"px";
//     //                         let absolutePosY = $(widgetElements[widgetType][widgetNum]["widget"]).offset().top+"px";
//     //                         widgetElements[widgetType][widgetNum]["widget"].style.setProperty("left", absolutePosX);
//     //                         widgetElements[widgetType][widgetNum]["widget"].style.setProperty("top", absolutePosY);
//     //                         widgetElements[widgetType][widgetNum]["widget"].style.setProperty("position", "absolute");
//     //                         stopResizing(widgetType, widgetNum);
//     //                         saveConfig[widgetType][widgetNum]["position"] = {"x": absolutePosX, "y": absolutePosY};
//     //                         switch(widgetType) {
//     //                             case("displayWidgets"):
//     //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width}; 
//     //                                 break;

//     //                             case("buttonWidgets"):
//     //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
//     //                                 break;

//     //                             case("inputWidgets"):
//     //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
//     //                                 break;

//     //                             case("consoleWidgets"):
//     //                                 saveConfig[widgetType][widgetNum]["size"] = {
//     //                                     "height": positionBox.height,
//     //                                     "width": positionBox.width
//     //                                 }
//     //                                 break;
//     //                             case("graphWidgets"):
//     //                                 saveConfig[widgetType][widgetNum]["size"] = {
//     //                                     "height": positionBox.height,
//     //                                     "width": positionBox.width
//     //                                 }
//     //                                 break;
//     //                             case("buttonWidgets"):
//     //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
//     //                                 break;
//     //                             case("lightWidgets"):
//     //                                 saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
//     //                                 break;
//     //                         }
//     //                     }
//     //                 }
//     //             }
//     //             localStorage.setItem("saveConfig", JSON.stringify(saveConfig));
//     //         }
//     //     } else {
//     //         swal({
//     //             title: 'Uh oh...',
//     //             text: 'There was a problem while attempting to utilize local storage'
//     //         })
//     //     }
//     // });

//     function setupWidgetsFromSave(type, num) {
//         widgetElements[type][num]["widget"].style.setProperty("position", "absolute");
//         let heightHolder = previousConfigurationSave[type][num]["size"]["height"];
//         let widthHolder = previousConfigurationSave[type][num]["size"]["width"];
//         switch(type) {
//             case("displayWidgets"):
//                 widgetElements[type][num]["widget"].style.setProperty("min-width", widgetElements[type][num]["header"].getBoundingClientRect().width+12+"px");
//                 widgetElements[type][num]["content"].style.setProperty("padding", "17px 0px");
//                 widgetElements[type][num]["widget"].style.width = widthHolder+"px";
//                 break;

//             case("buttonWidgets"):
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
//                 widgetElements[type][num]["widget"].style.width = widthHolder+"px";
//                 widgetElements[type][num]["button"].style.width = (parseFloat(widgetElements[type][num]["widget"].style.width.replace("px", ""))-32+"px");
//                 break;

//             case("inputWidgets"):
//                 widgetElements[type][num]["content"].style.setProperty("width", (widgetElements[type][num]["header"].getBoundingClientRect().width+"px"));
//                 widgetElements[type][num]["input"].style.setProperty("width", (widgetElements[type][num]["content"].getBoundingClientRect().width-10+"px"));
//                 widgetElements[type][num]["widget"].style.setProperty("width", (widgetElements[type][num]["input"].getBoundingClientRect().width+22+"px"));
//                 widgetElements[type][num]["widget"].style.setProperty("min-width", (widgetElements[type][num]["widget"].getBoundingClientRect().width+"px"));
//                 widgetElements[type][num]["content"].style.setProperty("min-width", (widgetElements[type][num]["content"].getBoundingClientRect().width+"px"));
//                 widgetElements[type][num]["input"].style.setProperty("min-width", (widgetElements[type][num]["input"].getBoundingClientRect().width+"px"));
//                 widgetElements[type][num]["content"].style.setProperty("width", "auto");
//                 widgetElements[type][num]["widget"].style.width = widthHolder+"px";
//                 widgetElements[type][num]["input"].style.setProperty("width", (widgetElements[type][num]["widget"].getBoundingClientRect().width-22+"px"));
//                 break;

//             case("consoleWidgets"):
//                 widgetElements[type][num]["widget"].style.height = heightHolder+"px";
//                 widgetElements[type][num]["widget"].style.width = widthHolder+"px";
//                 widgetElements[type][num]["textarea"].style.height = (parseFloat(widgetElements[type][num]["widget"].style.height.replace("px", ""))-84.7+"px");
//                 widgetElements[type][num]["textarea"].style.width = (parseFloat(widgetElements[type][num]["widget"].style.width.replace("px", ""))-22+"px");
//                 break;

//             case("graphWidgets"):
//                 widgetElements[type][num]["widget"].style.height = heightHolder+"px";
//                 widgetElements[type][num]["widget"].style.width = widthHolder+"px";
//                 widgetElements[type][num]["textarea"].style.height = (parseFloat(widgetElements[type][num]["widget"].style.height.replace("px", ""))-84.7+"px");
//                 widgetElements[type][num]["textarea"].style.width = (parseFloat(widgetElements[type][num]["widget"].style.width.replace("px", ""))-22+"px");
//                 break;
            
//             case("lightWidgets"):
//                 widgetElements[type][num]["widget"].style.setProperty("min-width", widgetElements[type][num]["header"].getBoundingClientRect().width+12+"px");
//                 widgetElements[type][num]["content"].style.setProperty("padding", "17px 0px");
//                 widgetElements[type][num]["widget"].style.width = widthHolder+"px";
//                 break;
            
//         }
//         widgetElements[type][num]["widget"].style.setProperty("left", previousConfigurationSave[type][num]["position"]["x"]);
//         widgetElements[type][num]["widget"].style.setProperty("top", previousConfigurationSave[type][num]["position"]["y"]);
//     }

//     var position = {"inputWidgets":{"x":[],"y":[]}, "buttonWidgets":{"x":[],"y":[]}, "displayWidgets":{"x":[],"y":[]}, "consoleWidgets":{"x":[],"y":[]}, "graphWidgets":{"x":[],"y":[]}, "lightWidgets":{"x":[],"y":[]}};
//     function setupWidgetsAsNew(type, num, stage, storage) {
//         if(stage==0) {
//             if(type != "consoleWidgets" && type != "graphWidgets") {
//                 if(type == "buttonWidgets") {
//                     let longestLen;
//                     widgetElements[type][num]["button"].innerText = dashboardData["buttons"][num]["onLabel"];
//                     longestLen = widgetElements[type][num]["button"].getBoundingClientRect().width+35;
//                     if(widgetElements[type][num]["header"].getBoundingClientRect().width+10 > longestLen) { longestLen = widgetElements[type][num]["header"].getBoundingClientRect().width+10; }
//                     widgetElements[type][num]["button"].innerText = dashboardData["buttons"][num]["offLabel"];
//                     if(widgetElements[type][num]["header"].getBoundingClientRect().width+10 > longestLen) { longestLen = widgetElements[type][num]["header"].getBoundingClientRect().width+10; }
//                     if(widgetElements[type][num]["button"].getBoundingClientRect().width+35 > longestLen) { longestLen = widgetElements[type][num]["button"].getBoundingClientRect().width+35; }
//                     widgetElements[type][num]["button"].style.setProperty("width", (longestLen-35+"px"));
//                     widgetElements[type][num]["button"].style.setProperty("min-width", (longestLen-35+"px"));
//                     widgetElements[type][num]["widget"].style.setProperty("width", (longestLen+2+"px"));
//                     widgetElements[type][num]["widget"].style.setProperty("min-width", (longestLen+2+"px"));
//                     widgetElements[type][num]["button"].innerText = ((dashboardData["buttons"][num]["initially"]==true)? dashboardData["buttons"][num]["onLabel"] : dashboardData["buttons"][num]["offLabel"]);  
//                 } else if(type == "displayWidgets") {
//                     widgetElements[type][num]["content"].style.setProperty("padding", "17px 0px");
//                     widgetElements[type][num]["widget"].style.setProperty("min-width", widgetElements[type][num]["header"].getBoundingClientRect().width+12+"px");
//                 } else if(type == "inputWidgets") {
//                     widgetElements[type][num]["content"].style.setProperty("width", (widgetElements[type][num]["header"].getBoundingClientRect().width+"px"));
//                     widgetElements[type][num]["input"].style.setProperty("width", (widgetElements[type][num]["content"].getBoundingClientRect().width-10+"px"));
//                     widgetElements[type][num]["widget"].style.setProperty("width", (widgetElements[type][num]["input"].getBoundingClientRect().width+22+"px"));
//                     widgetElements[type][num]["widget"].style.setProperty("min-width", (widgetElements[type][num]["widget"].getBoundingClientRect().width+"px"));
//                     widgetElements[type][num]["content"].style.setProperty("min-width", (widgetElements[type][num]["content"].getBoundingClientRect().width+"px"));
//                     widgetElements[type][num]["input"].style.setProperty("min-width", (widgetElements[type][num]["input"].getBoundingClientRect().width+"px"));
//                     widgetElements[type][num]["content"].style.setProperty("width", "auto");
//                 } else if(type == "lightWidgets") {
//                     widgetElements[type][num]["content"].style.setProperty("padding", "17px 0px");
//                     widgetElements[type][num]["widget"].style.setProperty("min-width", widgetElements[type][num]["header"].getBoundingClientRect().width+12+"px");
//                 }
//                 makeWidgetResizable(type, num, "x");
//             } else {
//                 if(type == "consoleWidgets") {
//                     widgetElements[type][num]["widget"].style.setProperty("width", parseFloat(widgetElements[type][num]["widget"].style.minWidth)+1+"px"); 
//                     widgetElements[type][num]["widget"].style.setProperty("height", parseFloat(widgetElements[type][num]["widget"].style.minHeight)+1+"px");
//                     widgetElements[type][num]["textarea"].style.setProperty("width", parseFloat(widgetElements[type][num]["textarea"].style.minWidth)+1+"px");
//                     widgetElements[type][num]["textarea"].style.setProperty("height", parseFloat(widgetElements[type][num]["textarea"].style.minHeight)+1+"px");
//                 } else if(type == "graphWidgets") {
//                     widgetElements[type][num]["widget"].style.setProperty("width", parseFloat(widgetElements[type][num]["widget"].style.minWidth)+1+"px"); 
//                     widgetElements[type][num]["widget"].style.setProperty("height", parseFloat(widgetElements[type][num]["widget"].style.minHeight)+1+"px");


//                 }
//                 makeWidgetResizable(type, num, "both");
//             }
//             $(widgetElements[type][num]["widget"]).draggable("enable");
//             widgetElements[type][num]["widget"].style.setProperty("position", "relative");
//             widgetElements[type][num]["widget"].style.setProperty("left", ("0px"));
//             widgetElements[type][num]["widget"].style.setProperty("top", ("0px"));
//         } else if(stage==1) {
//             storage[type]["x"][num] = widgetElements[type][num]["widget"].offsetLeft+"px";
//             storage[type]["y"][num] = widgetElements[type][num]["widget"].offsetTop+"px";
//         } else if(stage==2) {
//             widgetElements[type][num]["widget"].style.setProperty("position", "absolute");
//             widgetElements[type][num]["widget"].style.setProperty("left", storage[type]["x"][num]);
//             widgetElements[type][num]["widget"].style.setProperty("top", storage[type]["y"][num]);
//         }
//         return storage;
//     }

//     if(previousConfigurationExists == "found") {
//         for(let type in widgetElements) {
//             if(type != "countList") {
//                 for(let num in widgetElements[type]) {
//                     setupWidgetsFromSave(type, num);
//                 }
//             }
//         }
//     } else if(previousConfigurationExists == "none") {
//         for(let i=0; i<3; i++) {
//             for(let type in widgetElements) {
//                 if(type != "countList") {
//                     for(let num in widgetElements[type]) {
//                         position = setupWidgetsAsNew(type, num, i, position);
//                     }      
//                 }
//             }
//         }
//     } else if(previousConfigurationExists == "modified") {
//         for(let type in previousConfigurationSave) {
//             for(let num in previousConfigurationSave[type]) {
//                 setupWidgetsFromSave(type, num);
//             }
//         }
//         for(let i=0; i<3; i++) {
//             for(let type in widgetElements) {
//                 if(type != "countList") {
//                     for(let num in widgetElements[type]) {
//                         if(!(num in previousConfigurationSave[type])) {
//                             position = setupWidgetsAsNew(type, num, i, position);
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

// function makeWidgetResizable(widgetType, widgetNum, axis) {
//     let element = widgetElements[widgetType][widgetNum]["widget"];
//     element.classList.add("resizable");
//     let resizers = element.querySelectorAll(" .resizer");
//     let minimum_width = parseFloat(element.style.minWidth);
//     let minimum_height = parseFloat(element.style.minHeight);
//     let original_width = 0;
//     let original_height = 0;
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

// function stopResizing(widgetType, widgetNum) {
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

//  The function that checks and updates the values from virtual inputs
function handleVirtualInputs() {
    for(let widgetNum in widgetElements["inputWidgets"]) {
        if(dashboardData["inputs"][widgetNum]["value"] != widgetElements["inputWidgets"][widgetNum]["input"].value) {
            dashboardData["inputs"][widgetNum]["value"] = widgetElements["inputWidgets"][widgetNum]["input"].value;
            pywebview.api.update_input_widget((dashboardData["inputs"][widgetNum]["title"]), dashboardData["inputs"][widgetNum]["value"]);
        }
    }
}

//  The function that updates the virtual displays on the dashboard
function handleVirtualDisplays() {
    for(let widgetNum in widgetElements["displayWidgets"]) {
        widgetElements["displayWidgets"][widgetNum]["content"].innerText = dashboardData["displays"][widgetNum]["value"];
    }
}

//  The function that updates the virtual consoles on the dashboard
function handleVirtualConsoles() {
    for(let widgetNum in widgetElements["consoleWidgets"]) {
        if(dashboardData["consoles"][widgetNum]["valueChanged"]) {
            widgetElements["consoleWidgets"][widgetNum]["textarea"].value = String((dashboardData["consoles"][widgetNum]["value"]));
            widgetElements["consoleWidgets"][widgetNum]["textarea"].scrollTop = widgetElements["consoleWidgets"][widgetNum]["textarea"].scrollHeight;
            dashboardData["consoles"][widgetNum]["valueChanged"] = false;
        }
    }
}

// The fucntion that updates the virtual graphs on the dashboard
function handleVirtualGraphs() {
    for(let widgetNum in widgetElements["graphWidgets"]) {
        if(dashboardData["graphs"][widgetNum][""]) {
            // TODO: implement update
        }
    }
}

// The function that updates the virtual lights on the dashboard
function handleVirtualLights() {

}

//  The function that updates the widgets with incoming messages
function updateDashboard() {
    pywebview.api.is_serial_available().then(function(response) { 
        if(response) {
            pywebview.api.read_serial_message().then(function(response) {
                if(!((response == '{ready}\\r\\n') || (response == '{disabled}\\r\\n'))) {
                    if((response.length > 0) && (response.indexOf('{') == 0)) {
                        response = response.toString();
                        let updates = response.split("\\r");
                        for(let i=0; i<((updates.length)-1); i++) {
                            let update = JSON.parse(updates[i]);
                            let key = Object.keys(update)[0];
                            if(key == 'D') {
                                let widgetIndex = getWidgetIndex('display', update['D'][0]);
                                dashboardData["displays"][widgetIndex]["value"] = update['D'][1];
                            } else if(key == 'C') {
                                let widgetIndex = getWidgetIndex('console', update['C'][0]);
                                updateMessage = update['C'][1].replace('\\n', '\n');
                                dashboardData["consoles"][widgetIndex]["value"] += updateMessage;
                                dashboardData["consoles"][widgetIndex]["valueChanged"] = true;
                            }
                        }
                    }
                }
            });
        }
    }); 
}


//  Function to enable the controller 
function enable() {
    // if(serialConnection) {
    //     $("#connectButton").text("Enabled").removeClass("btn-outline-success").addClass("btn-success").prop('disabled', true);
    //     $("#disconnectButton").text("Disable").removeClass("btn-danger").addClass("btn-outline-danger").prop('disabled', false);
    //     let localSettingConfig;
    //     if(localStorage.settingsConfig) {
    //         localSettingConfig = JSON.parse(localStorage.getItem("settingsConfig"));
    //         if (localSettingConfig["widgetJson"] != "") {
    //             try {
    //                 widgetJsonProfile = JSON.parse(localSettingConfig["widgetJson"]);
    //             } catch(error) {
    //                 swal({
    //                     title: 'Oops...',
    //                     text: 'The widget configuration is not valid'
    //                 })
    //             }
    //         } else {
    //             swal({
    //                 title: 'Oops...',
    //                 text: 'The widget configuration is empty'
    //             })
    //         }
    //     } else {
    //         let defaultJson = '{\n\t"buttons": [\n\n\t],\n\t"inputs": [\n\n\t],\n\t"displays": [\n\n\t],\n\t"consoles": [\n\n\t]\n\t"graphs": [\n\n\t]\n}';
    //         localSettingConfig = {"widgetGrid": false, "gridSize": 1, "widgetSnap": true, "widgetJson": defaultJson};
    //         localStorage.setItem("settingsConfig", JSON.stringify(localSettingConfig));
    //     }
    //     pywebview.api.enable_radio().then(function() {
    //         initializeDashboard(JSON.stringify(widgetJsonProfile));
    //         repUpdateDashboard = window.setInterval(updateDashboard, 1);
    //     });
    // }
    // let localSettingConfig = JSON.parse(localStorage.getItem("settingsConfig"));
    // widgetJsonProfile = JSON.parse(localSettingConfig["widgetJson"]);
    // initializeDashboard(JSON.stringify(widgetJsonProfile));
    initializeDashboard();

}

//  Function to disable the controller
function disable() {
    // $("#connectButton").text("Enable").removeClass("btn-success").addClass("btn-outline-success").prop('disabled', false);
    // $("#disconnectButton").text("Disabled").removeClass("btn-outline-danger").addClass("btn-danger").prop('disabled', true);
    // dashboardData = {};
    // window.clearInterval(repUpdateDashboard); //Stop updating the widgets
    // window.clearInterval(repVirtualInputs); //Stop updating virtual inputs
    // window.clearInterval(repVirtualDisplays); //Stop updating virtual displays
    // window.clearInterval(repVirtualConsoles); //Stop updating virtual consoles
    // window.clearInterval(repVirtualGraphs); //Stop updating virtual graphs 
    // pywebview.api.disable_radio().then(function() {
    //     location.reload();
    // });
    location.reload();

    
}

//  Listen for and update COM ports 
// setInterval(function() { 
//     pywebview.api.get_available_ports().then(function(response) {
//         comPorts = response;
//         let selectedPort = localStorage.getItem("comPort");
//         if(comPorts.length > 0) {
//             if(selectedPort == '') {
//                 localStorage.setItem("comPort", comPorts[0]);
//                 pywebview.api.set_selected_port(comPorts[0]);
//                 pywebview.api.establish_connection(comPorts[0]);
//                 $("#connectButton").text("Enable").removeClass("btn-success").addClass("btn-outline-success").prop('disabled', false);
//                 serialConnection = true;
//             } else if(!serialConnection) {
//                 if(comPorts.includes(selectedPort)) {
//                     pywebview.api.set_selected_port(selectedPort);
//                     pywebview.api.establish_connection(selectedPort);
//                 } else {
//                     pywebview.api.set_selected_port(comPorts[0]);
//                     pywebview.api.establish_connection(comPorts[0]);
//                 }
//                 $("#connectButton").text("Enable").removeClass("btn-success").addClass("btn-outline-success").prop('disabled', false);
//                 serialConnection = true;
//             }
//             if(!comPorts.includes(selectedPort)) {
//                 localStorage.setItem("comPort", comPorts[0]);
//                 pywebview.api.set_selected_port(comPorts[0]);
//                 pywebview.api.establish_connection(comPorts[0]);
//                 $("#connectButton").text("Enable").removeClass("btn-success").addClass("btn-outline-success").prop('disabled', false);
//                 serialConnection = true;
//             }
//         } else {
//             if(selectedPort != '') {
//                 pywebview.api.set_selected_port('');
//                 pywebview.api.close_connection();
//                 localStorage.setItem("comPort", '');
//                 $("#connectButton").text("Enable").removeClass("btn-success").addClass("btn-outline-success").prop('disabled', true);
//                 serialConnection = false;
//             }
//         }
//     });
// }, 500);


// Function to parse widgets by name to get index
function getWidgetIndex(type, name) {
    switch(type) {
        case 'display':
            for(let i=0; i<widgetElements["countList"]["displayWidgets"]; i++) {
                if(dashboardData["displays"][i]["title"] == name) {
                    return i;
                }
            }
            break;
        case 'console':
            for(let i=0; i<widgetElements["countList"]["consoleWidgets"]; i++) {
                if(dashboardData["consoles"][i]["title"] == name) {
                    return i;
                }
            }
            break;
    }
    return -1;
}


//  Function to go to the settings page
function goToSettings() {
    pywebview.api.is_enabled().then(function(response) {
        let radio_is_enabled = response;
        if(radio_is_enabled == true) {
            pywebview.api.disable_radio().then(function() {
                location.replace("./SettingsPage/settings.html");
                
            });
        } else {
            location.replace("./SettingsPage/settings.html");
        }
    });
}



storage = new Storage();
const Dashboard = new WidgetDashboard();

// window.addEventListener('pywebviewready', function() {
function initializeDashboard() {
    // console.log("READY");



    Dashboard.addWidget(new LightWidget("ClassLight", true));
    Dashboard.addWidget(new ButtonWidget("ClassButton", "ON", "OFF", false, false));
    Dashboard.addWidget(new InputWidget("Class Input", "3.14"));
    Dashboard.addWidget(new DisplayWidget("Class Display", "loremipsum"));
    Dashboard.addWidget(new ConsoleWidget("Class Console"));
    // Dashboard.addWidget(new GraphWidget("Class Graph"));
}


$(".lock").click(function() {
    if(storage.storage) {
        $(this).toggleClass("unlocked");
        if (document.getElementById("posLock").className == "lock unlocked") {
            Dashboard.makeWidgetsResizable();
            Dashboard.makeWidgetsDraggable();
        } else {
            Dashboard.makeWidgetsNotResizable();
            Dashboard.makeWidgetsNotDraggable();
            // for(let widgetType in widgetElements) {
            //     if(widgetType != "countList") {
            //         for(let widgetNum in widgetElements[widgetType]) {
            //             let positionBox = widgetElements[widgetType][widgetNum]["widget"].getBoundingClientRect();
            //             $(widgetElements[widgetType][widgetNum]["widget"]).draggable("disable");
            //             let absolutePosX = $(widgetElements[widgetType][widgetNum]["widget"]).offset().left+"px";
            //             let absolutePosY = $(widgetElements[widgetType][widgetNum]["widget"]).offset().top+"px";
            //             widgetElements[widgetType][widgetNum]["widget"].style.setProperty("left", absolutePosX);
            //             widgetElements[widgetType][widgetNum]["widget"].style.setProperty("top", absolutePosY);
            //             widgetElements[widgetType][widgetNum]["widget"].style.setProperty("position", "absolute");
            //             stopResizing(widgetType, widgetNum);
            //             saveConfig[widgetType][widgetNum]["position"] = {"x": absolutePosX, "y": absolutePosY};
            //             switch(widgetType) {
            //                 case("displayWidgets"):
            //                     saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width}; 
            //                     break;

            //                 case("buttonWidgets"):
            //                     saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
            //                     break;

            //                 case("inputWidgets"):
            //                     saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
            //                     break;

            //                 case("consoleWidgets"):
            //                     saveConfig[widgetType][widgetNum]["size"] = {
            //                         "height": positionBox.height,
            //                         "width": positionBox.width
            //                     }
            //                     break;
            //                 case("graphWidgets"):
            //                     saveConfig[widgetType][widgetNum]["size"] = {
            //                         "height": positionBox.height,
            //                         "width": positionBox.width
            //                     }
            //                     break;
            //                 case("buttonWidgets"):
            //                     saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
            //                     break;
            //                 case("lightWidgets"):
            //                     saveConfig[widgetType][widgetNum]["size"] = {"width": positionBox.width};
            //                     break;
            //             }
            //         }
            //     }
            // }
            // localStorage.setItem("saveConfig", JSON.stringify(saveConfig));
        }
    } else {
        swal({
            title: 'Uh oh...',
            text: 'There was a problem while attempting to utilize local storage'
        })
    }
});
// })


// window.onload = init;
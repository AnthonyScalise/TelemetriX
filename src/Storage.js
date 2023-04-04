

class Storage {

    constructor() {
        this.widgetData = {
            'buttons': [],
            'inputs': [],
            'displays': [],
            'consoles': [],
            'graphs': [],
            'lights': [],
        }

        this.storage = window.localStorage;
        this.settings;
        this.widgetConfig;
        if(!this.doesExist("settings")) {
            this.widgetConfig = JSON.parse(JSON.stringify(Storage.defaultWidgetConfig));
            this.settings = JSON.parse(JSON.stringify(Storage.defaultSettings));
            this.saveSettings();
        } else {
            this.settings = JSON.parse(this.storage.getItem("settings"));
            this.widgetConfig = this.settings.widgetConfig;
        }
    }

    doesExist(itemName) {
        return((JSON.parse(this.storage.getItem(itemName)))? true : false);
    }

    saveSettings() {
        this.settings.widgetConfig = this.widgetConfig;
        this.storage.setItem("settings", JSON.stringify(this.settings));
    }

    resetSettings() {
        this.settings = JSON.parse(JSON.stringify(Storage.defaultSettings));
        this.saveSettings();
    }

    resetWidgetConfig() {
        this.widgetConfig = JSON.parse(JSON.stringify(Storage.defaultWidgetConfig));
        this.saveSettings();
    }

    resetWidgetData() {

    }
    // TODO: Implement stuff for widget data that includes names, sizes, and positions
}

Storage.defaultSettings = {
    'comPort': '',
    'dragging': {
        'grid': false,
        'gridSize': 1,
        'edgeSnap': true,
    },
    'appTheme': {
        'primaryColor': '#00f652',
        'secondaryColor': '#000000',
    },
    'widgetConfig': {},
}

Storage.defaultWidgetConfig = {
    'buttons': [ButtonWidget.defaultJson],
    'inputs': [InputWidget.defaultJson],
    'displays': [DisplayWidget.defaultJson],
    'consoles': [ConsoleWidget.defaultJson],
    'graphs': [GraphWidget.defaultJson],
    'lights': [LightWidget.defaultJson],
}
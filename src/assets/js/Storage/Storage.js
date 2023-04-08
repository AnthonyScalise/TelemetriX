
class Storage {

    static defaultSettings = {
        'comPort': '',
        'dragging': {
            'grid': false,
            'gridSize': 1,
            'edgeSnap': true,
        },
        'appTheme': {
            'primaryColor': '#757575',
            'secondaryColor': '#000000',
        },
        'widgetConfig': {},
    }

    static defaultWidgetConfig = {};
    static widgetNames = [];

    static createDefaultWidgetConfig() {
        const widgetTypes = Array.from(Widget.getChildren());
        widgetTypes.forEach(widgetClass => {
            let widgetName = widgetClass.name.replace('Widget', '').toLowerCase() + 's';
            this.widgetNames.push(widgetName);
            this.defaultWidgetConfig[widgetName] = widgetClass.defaultJson;
        });
    }

    constructor() {
        Storage.createDefaultWidgetConfig();
        this.widgetData = {}
        Storage.widgetNames.forEach(widgetName => { this.widgetData[widgetName] = []; });
        this.storageLocal = window.localStorage;
        this.settings;
        this.widgetConfig;
        if (!this.doesExist("settings")) {
            this.widgetConfig = JSON.parse(JSON.stringify(Storage.defaultWidgetConfig));
            this.settings = JSON.parse(JSON.stringify(Storage.defaultSettings));

            this.saveSettings();
        } else {
            this.settings = JSON.parse(this.storageLocal.getItem("settings"));
            this.widgetConfig = this.settings.widgetConfig;
        }
    }

    doesExist(itemName) {
        return ((JSON.parse(this.storageLocal.getItem(itemName))) ? true : false);
    }

    saveSettings() {
        this.settings.widgetConfig = this.widgetConfig;
        this.storageLocal.setItem("settings", JSON.stringify(this.settings));
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

window.storage = new Storage();

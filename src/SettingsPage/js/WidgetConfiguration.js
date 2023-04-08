
var storage = window.storage;
var widgetNames = Storage.widgetNames;
var widgetConfig = storage.widgetConfig;

document.getElementById("widgetJson").value = JSON.stringify(storage.widgetConfig);
document.getElementById("widgetJson").addEventListener("input", (event) => { saveWidgetConfiguration(); });
formatWidgetConfigurationTextareaJSON();

function updateWidgetConfigContainerSize() {
    const widgetContainer = document.getElementById('widgetConfigContainer');
    const maxWidgetWidth = window.innerWidth * (80 / 100);
    const maxWidgetHeight = window.innerHeight * (80 / 100);
    widgetContainer.style.maxWidth = `${maxWidgetWidth}px`;
    widgetContainer.style.maxHeight = `${maxWidgetHeight}px`;
}
updateWidgetConfigContainerSize();
window.addEventListener('resize', updateWidgetConfigContainerSize);


function customJSONFormat(json, indent = 8) {
    const firstLevelIndent = (' '.repeat(indent));
    const secondLevelIndent = (' '.repeat(indent * 2));
    let formatted = [];
    for (const key in json) {
        let keyValue = json[key];
        let keyValueString = Array.isArray(keyValue) ? '[\n' +
            secondLevelIndent + keyValue.map(item => JSON.stringify(item)).join(',\n' + secondLevelIndent)
            + '\n' + firstLevelIndent + ']' : JSON.stringify(keyValue);
        formatted.push(`${firstLevelIndent}"${key}": ${keyValueString}`);
    }
    return `{\n${formatted.join(',\n')}\n}`;
}

function applyCustomJSONFormat(json, indent = 8) {
    try {
        json = customJSONFormat(JSON.parse(json), indent);
        return json;
    } catch (error) {
        console.error('Invalid JSON:', error);
        swal({ title: 'Oops...', text: 'The Widget Configuration JSON is not valid' });
        return false;
    }
}

function formatWidgetConfigurationTextareaJSON() {
    const textarea = document.getElementById("widgetJson");
    let json = applyCustomJSONFormat(textarea.value);
    if (json == false) {
        return false;
    } else {
        textarea.value = json;
        return true;
    }
}

function formatWidgetConfigurationJson() {
    let smallSpacing = (('<br>') + ('&nbsp'.repeat(6)));
    let largeSpacing = (('<br>') + ('&nbsp'.repeat(12)));
    let formattedConfig = ('{' + smallSpacing);
    for (let widgetName in widgetConfig) {
        formattedConfig += ('\"' + widgetName + '\": [' + largeSpacing);
        for (let widget in widgetConfig[widgetName]) {
            formattedConfig += JSON.stringify(widgetConfig[widgetName][widget]) + ',<br>';
        }
        formattedConfig += (smallSpacing + '],<br>' + smallSpacing);
    }
    formattedConfig += '}';
    console.log(formattedConfig);
    return formattedConfig;
}

function saveWidgetConfiguration() {
    storage.widgetConfig = JSON.parse(String(document.getElementById("widgetJson").value));
    storage.saveSettings();
}

document.getElementById('widgetJson').addEventListener('keydown', function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
});

document.getElementById('questionButton').addEventListener('click', (event) => {
    let htmlText = applyCustomJSONFormat(JSON.stringify(Storage.defaultWidgetConfig), 3);
    let htmlTextObject = document.createElement('div');
    let preElement = document.createElement('pre');
    preElement.textContent = htmlText;
    preElement.className = 'selectable';
    htmlTextObject.appendChild(preElement);
    htmlTextObject.style.textAlign = 'left';
    htmlTextObject.style.backgroundColor = '#202020';
    htmlTextObject.style.padding = '5px';
    htmlTextObject.style.border = '3px solid #121212';
    swal({ className: 'sweetalert-lg', title: 'Widget Configuration Notation With JSON', content: htmlTextObject, button: 'Close', customClass: 'swal-json-content' });
});

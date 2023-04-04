const SerialPort = require('serialport');


class ArduinoApi {
    constructor() {
      this.arduino = null;
      this.activePort = '';
      this.portList = [];
      this.baudRate = 115200;
      this.enabled = false;
    }
  }
  
// const api = new ArduinoApi();
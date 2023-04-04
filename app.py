from serial.tools import list_ports
import webview
import serial 
import json


class Arduino_Api:
    def __init__(self):
        self.arduino = None
        self.active_port = ''
        self.port_list = []
        self.baud_rate = 115200
        self.enabled = False


    def refresh_ports(self):
        self.port_list = []
        if list_ports.comports():
            for port in list_ports.comports():
                self.port_list.append(str(port).split()[0])
            if self.active_port not in self.port_list:
                self.active_port = ''
        else:
            self.port_list = []
            self.active_port = ''


    def get_available_ports(self):
        self.refresh_ports()
        response = self.port_list
        return response


    def set_selected_port(self, port):
        self.active_port = port


    def enable_radio(self):
        self.send_serial_message('enable')
        self.enabled = True


    def disable_radio(self):
        self.send_serial_message('disable')
        self.arduino.reset_input_buffer()
        self.arduino.reset_output_buffer()
        self.enabled = False


    def close_connection(self):
        self.arduino.close()
        self.arduino = None


    def establish_connection(self, port=None):
        already_connected = False
        port_select = self.active_port
        if port:
            if isinstance(port, int):
                port_select = self.port_list[port]
            elif isinstance(port, str):
                port_select = port
        if(self.arduino != None):
            if self.arduino.port == port_select:
                already_connected = True
            else:                
                self.arduino.close()
                self.arduino = None
        if not already_connected:
            self.arduino = serial.Serial(port=port_select, baudrate=self.baud_rate)
            self.arduino.flushInput()


    def is_enabled(self):
        return self.enabled


    def update_input_widget(self, name, value):
        packet = {"I":[name, value]}
        packet = json.dumps(packet, separators=(',', ':'))+'\n'
        self.send_serial_message(packet)


    def update_button_widget(self, name, value):
        print(name, "was pressed")
        packet = {"B":[name, value]}
        packet = json.dumps(packet, separators=(',', ':'))+'\n'
        self.send_serial_message(packet)


    def read_serial_message(self):
        packet = ((str(self.arduino.read_all())[2:][:-1]).rstrip()).replace("\\x01", "")
        return (packet)
        

    def is_serial_available(self):
        if(self.arduino.in_waiting > 0):
            return True
        else:
            return False
        
        
    def send_serial_message(self, message):    
        self.arduino.write(bytes(message, 'utf-8')) 
        

    def download_dialog(self, filename, content):
        result = window.create_file_dialog(webview.SAVE_DIALOG, save_filename=filename)
        if result:
            with open(result, 'w') as file:
                file.write(content)




api = Arduino_Api()

window = webview.create_window('TelemetriX', url='./src/index.html', width=1440, height=900, js_api=api)
# window = webview.create_window('TelemetriX', url='./Test/index.html', width=1440, height=900)


webview.start(debug=True)
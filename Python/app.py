# --------------------
# Imports
# --------------------
import json
import random

import paho.mqtt.client as mqtt
from evdev import ecodes
from helpers.LCD_4_20_SPI import LCD_4_20_SPI

from bluepy.btle import AssignedNumbers, Scanner, DefaultDelegate, Peripheral, ADDR_TYPE_PUBLIC

# --------------------
# Globale variabelen
# --------------------
# Pi ID
PI_ID = None
ID_OK = False

# MQTT
JS_SEND_TOPIC = None
JS_RECEIVE_TOPIC= None
client = None

# Bluetooth
BT_DEVICES = []


# --------------------
# Klasses
# --------------------
# Klasse voor connecteren Hartslag sensor
class HRM(Peripheral):
    def __init__(self, addr):
        Peripheral.__init__(self, addr, addrType=ADDR_TYPE_PUBLIC)


# --------------------
# Methodes
# --------------------
def ontvangen_hartslag(cHandle, data):
    print("Hartslag: " + str(data[1]))


def uitlezen_bt_device(device_id, aantal_lees_acties):
    # uuid's opvragen
    cccid = AssignedNumbers.client_characteristic_configuration
    hrmid = AssignedNumbers.heart_rate
    hrmmid = AssignedNumbers.heart_rate_measurement
    # Start connecteren en uitlezen
    hrm = None
    try:
        # Connecteren met device id
        hrm = HRM(device_id)
        print("Connected")
        # uuid's uitlezen
        service, = [s for s in hrm.getServices() if s.uuid == hrmid]
        ccc, = service.getCharacteristics(forUUID=str(hrmmid))
        # Descriptors ophalen
        desc = hrm.getDescriptors(service.hndStart, service.hndEnd)
        d, = [d for d in desc if d.uuid == cccid]
        # Karakteristieken schrijven
        hrm.writeCharacteristic(d.handle, b'\1\0')
        # Callback zetten op print_hr functie bij het ontvangen van notificatie
        hrm.delegate.handleNotification = ontvangen_hartslag
        # 200 keer de data uitlezen
        for x in range(aantal_lees_acties):
            hrm.waitForNotifications(3.)
    # Deconnecteren wanneer hartslag sensor is geconnecteerd
    finally:
        if hrm:
            hrm.disconnect()


def start_bluetooth_scan():
    bt_device = {}
    print("---- Start Bluetooth Scan ----")
    scanner = Scanner()
    devices = scanner.scan(10.0)
    # Tonen van devices
    for dev in devices:
        if str(dev.getValueText(0x09)).find("Polar OH1") is not -1:
            bt_device['name'] = dev.getValueText(0x09)
            bt_device['mac'] = dev.addr
            BT_DEVICES.append(bt_device)
            bt_device = {}


def save_js_mqtt_topic():
    global JS_SEND_TOPIC, JS_RECEIVE_TOPIC
    JS_SEND_TOPIC = "/luemniro/PiToJs/{0}".format(PI_ID)
    JS_RECEIVE_TOPIC = "/luemniro/JsToPi/{0}".format(PI_ID)
    client.subscribe(JS_RECEIVE_TOPIC)


def send_id_request():
    global PI_ID
    random_number = random.randint(0, 999999)
    PI_ID = str(random_number).zfill(6)
    print('---- ID request send ----')
    client.publish('/luemniro/id/request', "{'id': '" + str(random_number) + "'}")


def mqtt_test():
    client.subscribe("/python/response")
    client.publish("/python/test", "{'test': 'test'}")


def read_keyboard():
    for event in dev.read_loop():
        if event.type == ecodes.EV_KEY:
            if event.code == ecodes.KEY_UP:
                print("UP")
            elif event.code == ecodes.KEY_DOWN:
                print("DOWN")
            elif event.code == ecodes.KEY_W:
                print("W")
            elif event.code == ecodes.KEY_A:
                print("A")
            elif event.code == ecodes.KEY_S:
                print("S")
            elif event.code == ecodes.KEY_D:
                print("D")
            elif event.code == ecodes.KEY_F:
                print("F")
            elif event.code == ecodes.KEY_G:
                print("G")
            break


# --------------------
# Callback
# --------------------
def mqtt_on_message(client, userdata, msg):
    global PI_ID, ID_OK
    # Test topic
    if msg.topic == "/python/response":
        print("Test MQTT")
    # Aanvragen ID topic
    elif msg.topic == "/luemniro/id/response":
        # Kijken of ID voor deze pi is
        string = msg.payload.decode()
        obj = json.loads(string)  # Omzetten json
        if obj["id"] == int(PI_ID):
            if obj["status"] == "OK":
                print("---- ID is toegestaan ----")
                save_js_mqtt_topic() # Topic opslaan
                ID_OK = True
                # Display aansturen
                lcd.clear_display()
                lcd.write_string("Game ID: " + str(PI_ID))
            else:
                send_id_request() # Nieuwe ID request sturen
    # Ontvangen JavaScript topic
    elif msg.topic == JS_RECEIVE_TOPIC:
        print(msg.payload)


def mqtt_on_connect(client, userdata, flags, rc):
    print("---- Connected with result code " + str(rc) + " ----")


# --------------------
# Init
# --------------------
try:
    # Init LCD
    lcd = LCD_4_20_SPI()
    lcd.write_string("Aanvragen van ID ...")
    # Inlezen Makey Makey
    dev = None
    # dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
    # Init MQTT Client
    client = mqtt.Client()
    client.on_connect = mqtt_on_connect
    client.on_message = mqtt_on_message
    client.connect("mct-mqtt.westeurope.cloudapp.azure.com", 1883, 5)
    client.subscribe("/luemniro/id/response")
    client.loop_start()
    # Genereren + controle van ID
    send_id_request()
    # Bluetooth
    start_bluetooth_scan()
except Exception as ex:
    print(ex)


# --------------------
# Main
# --------------------
# read_keyboard()
while ID_OK is False:
    pass
client.publish(JS_SEND_TOPIC, "{ 'test': 'test' }")
input()
print("End")
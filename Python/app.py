# ---------------------------------------------------------------
# - Aanvragen ID => OK                                                           -
# - Testen van communicatie => OK                                          -
# -                                                             -
# -                                                             -
# ---------------------------------------------------------------

# --------------------
# Imports
# --------------------
import json
import random
import time
import threading

import paho.mqtt.client as mqtt
from evdev import ecodes, InputDevice
from helpers.LCD_4_20_SPI import LCD_4_20_SPI
from multiprocessing import Pool
import asyncio

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
TYPE_COM_TEST = "test_com"
TYPE_COM_AVATAR = "avatar"
TYPE_COM_AVATAR_STATUS_START = "start"
TYPE_COM_AVATAR_STATUS_STOP = "stop"
TYPE_COM_AVATAR_STATUS_END = "end"
client = None

# Bluetooth
BT_DEVICES = []

# Players
PLAYER1_INPUTS = [ecodes.KEY_W, ecodes.KEY_A, ecodes.KEY_S, ecodes.KEY_D]
PLAYER2_INPUTS = [ecodes.KEY_F, ecodes.KEY_G, ecodes.KEY_UP, ecodes.KEY_DOWN]
player1_send = True
player2_send = True

# Knoppen
dev = None
KNOPPEN_INLEZEN = False
KNOP_PRESS = 1
KNOPPEN = {
    ecodes.KEY_W: 1,
    ecodes.KEY_A: 2,
    ecodes.KEY_S: 3,
    ecodes.KEY_D: 4,
    ecodes.KEY_F: 1,
    ecodes.KEY_G: 2,
    ecodes.KEY_UP: 3,
    ecodes.KEY_DOWN: 4
}
knoppen_pressed = []
knop_pressed = None
knoppen_stoppen = False

# LCD
lcd = None

# Async
threat_knoppen_versturen = None


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
def mqtt_doorsturen_knop():
    global knoppen_pressed, KNOPPEN_INLEZEN, threat_knoppen_versturen
    knop = knop_pressed
    ok = False
    # Controlleren of speler nog mag sturen
    if knop in PLAYER1_INPUTS:
        if player1_send:
            ok = True
    elif knop in PLAYER2_INPUTS:
        if player2_send:
            ok = True
    # Controlleren of knop al werd ingedrukt
    if ok:
        JSON_SEND = {}
        JSON_SEND["type"] = TYPE_COM_AVATAR
        JSON_SEND["button"] = KNOPPEN[knop]
        # Speler controlleren
        if knop in PLAYER1_INPUTS:
            JSON_SEND["player"] = 1
        elif knop in PLAYER2_INPUTS:
            JSON_SEND["player"] = 2
        client.publish(JS_SEND_TOPIC, str(JSON_SEND).replace("'", '"'))
        print("---- Avatar send ----")


def mqtt_init_communicatie():
    # Terugsturen naar JavaScript dat communicatie goed is
    JSON_SEND = {}
    JSON_SEND["type"] = TYPE_COM_TEST
    print("---- Test com send ----")
    client.publish(JS_SEND_TOPIC, str(JSON_SEND).replace("'", '"'))


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


def read_keyboard():
    global knoppen_pressed, knop_pressed, threat_knoppen_versturen
    for event in dev.read_loop():
        if event.type == ecodes.EV_KEY and event.value == KNOP_PRESS:
            threat_knoppen_versturen = threading.Thread(target=mqtt_doorsturen_knop)
            if event.code == ecodes.KEY_UP:
                knop_pressed = ecodes.KEY_UP
            elif event.code == ecodes.KEY_DOWN:
                knop_pressed = ecodes.KEY_DOWN
            elif event.code == ecodes.KEY_W:
                knop_pressed = ecodes.KEY_W
            elif event.code == ecodes.KEY_A:
                knop_pressed = ecodes.KEY_A
            elif event.code == ecodes.KEY_S:
                knop_pressed = ecodes.KEY_S
            elif event.code == ecodes.KEY_D:
                knop_pressed = ecodes.KEY_D
            elif event.code == ecodes.KEY_F:
                knop_pressed = ecodes.KEY_F
            elif event.code == ecodes.KEY_G:
                knop_pressed = ecodes.KEY_G
            threat_knoppen_versturen.start()
            threat_knoppen_versturen.join()



# --------------------
# Callback
# --------------------
def mqtt_on_message(client, userdata, msg):
    global PI_ID, ID_OK, KNOPPEN_INLEZEN, player1_send, player2_send, knoppen_stoppen
    # Aanvragen ID topic
    if msg.topic == "/luemniro/id/response":
        # Kijken of ID voor deze pi is
        string = msg.payload.decode()
        obj = json.loads(string)  # Omzetten json
        if obj["id"] == int(PI_ID):
            if obj["status"] == "OK":
                print("---- ID is accepted ----")
                save_js_mqtt_topic() # Topic opslaan
                ID_OK = True
                # Display aansturen
                lcd.clear_display()
                lcd.write_string("Game ID: " + str(PI_ID))
            else:
                send_id_request() # Nieuwe ID request sturen
    # Ontvangen JavaScript topic
    elif msg.topic == JS_RECEIVE_TOPIC:
        string = msg.payload.decode()
        obj = json.loads(string)  # Omzetten json
        # Test COM
        if obj["type"] == TYPE_COM_TEST:
            mqtt_init_communicatie()
        # Avatar selectie
        elif obj["type"] == TYPE_COM_AVATAR:
            # Start van uitlezen
            if obj["status"] == TYPE_COM_AVATAR_STATUS_START:
                print("---- Reading buttons ----")
                threat = threading.Thread(target=read_keyboard)
                threat.start()
            # Speler laten stoppen
            if obj["status"] == TYPE_COM_AVATAR_STATUS_STOP:
                print("---- Player {0} received avatar ----".format(obj["player"]))
                if obj["player"] == 1:
                    player1_send = False
                if obj["player"] == 2:
                    player2_send = False
            # Speler laten stoppen
            if obj["status"] == TYPE_COM_AVATAR_STATUS_END:
                print("---- Stop reading buttons ----")
                knoppen_stoppen = True


def mqtt_on_connect(client, userdata, flags, rc):
    print("---- Connected with result code " + str(rc) + " ----")


def mqtt_on_disconnect(client, userdata, flags, rc):
    print("---- Disconnected with result code " + str(rc) + " ----")


# --------------------
# Init
# --------------------
async def init():
    global work_queue, client, lcd, dev, pool
    try:
        # Init LCD
        lcd = LCD_4_20_SPI()
        lcd.write_string("Aanvragen van ID ...")
        # Inlezen Makey Makey
        # dev = None
        dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
        # Init MQTT Client
        client = mqtt.Client()
        client.on_connect = mqtt_on_connect
        client.on_message = mqtt_on_message
        client.on_disconnect = mqtt_on_disconnect
        client.connect("mct-mqtt.westeurope.cloudapp.azure.com", 1883, 5)
        client.subscribe("/luemniro/id/response")
        # Genereren + controle van ID
        send_id_request()
        # Bluetooth
        # start_bluetooth_scan()
        client.loop_forever()
    except Exception as ex:
        print(ex)


# --------------------
# Main
# --------------------
if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(init())
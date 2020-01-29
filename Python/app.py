# ---------------------------------------------------------------
# - Aanvragen ID => OK                                          -
# - Testen van communicatie => OK                               -
# - Kiezen avatar voor 2 spelers => OK                          -
# -                                                             -
# ---------------------------------------------------------------

# --------------------
# Imports
# --------------------
import json
import random
import time
import threading
import datetime

import paho.mqtt.client as mqtt
from evdev import ecodes, InputDevice
from helpers.LCD_4_20_SPI import LCD_4_20_SPI
from multiprocessing import Pool
import asyncio

from bluepy.btle import AssignedNumbers, Scanner, DefaultDelegate, Peripheral, ADDR_TYPE_PUBLIC
from applicationinsights import TelemetryClient

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
TYPE_COM_SCAN = "scan"
TYPE_COM_BPM = "bpm"
TYPE_COM_QUESTION = "questions"
TYPE_COM_AVATAR_STATUS_START = "start"
TYPE_COM_AVATAR_STATUS_STOP = "stop"
TYPE_COM_AVATAR_STATUS_END = "end"
TYPE_COM_SCAN_STATUS_START= "start"
TYPE_COM_SCAN_STATUS_DEVICES= "devices"
client = None

# Bluetooth
BT_DEVICES = []
PLAYERS_BT_DEVICES = []
aantal_lees_acties = 0

# Players
PLAYER1_INPUTS = [ecodes.KEY_W, ecodes.KEY_A, ecodes.KEY_S, ecodes.KEY_D]
PLAYER2_INPUTS = [ecodes.KEY_UP, ecodes.KEY_DOWN, ecodes.KEY_LEFT, ecodes.KEY_RIGHT]
PLAYER3_INPUTS = [ecodes.KEY_F, ecodes.KEY_G, 272, ecodes.KEY_SPACE] # 272 is de click event
PLAYER4_INPUTS = [10000, 10001, 10002, 10003]
player1_send = True
player2_send = True
player3_send = True
player4_send = True
ontvangen_hartslag_1 = 0
ontvangen_hartslag_2 = 0
ontvangen_hartslag_3 = 0
ontvangen_hartslag_4 = 0
threat_send_forcefully_1 = None
threat_send_forcefully_2 = None
threat_send_forcefully_3 = None
threat_send_forcefully_4 = None
stop_forcefully_1 = False
stop_forcefully_2 = False
stop_forcefully_3 = False
stop_forcefully_4 = False

# Knoppen
dev = None
KNOPPEN_INLEZEN = False
KNOP_PRESS = 1
KNOP_RELEASE = 0
KNOPPEN = {
    ecodes.KEY_W: 1,
    ecodes.KEY_A: 2,
    ecodes.KEY_S: 3,
    ecodes.KEY_D: 4,
    ecodes.KEY_F: 1,
    ecodes.KEY_G: 2,
    272: 3,
    ecodes.KEY_SPACE: 4,
    ecodes.KEY_LEFT: 3,
    ecodes.KEY_UP: 2,
    ecodes.KEY_RIGHT: 1,
    ecodes.KEY_DOWN: 4,
    10000: 1,
    10001: 2,
    10002: 3,
    10003: 4
}
knoppen_pressed = []
knop_pressed = None
knoppen_stoppen = False

# LCD
lcd = None

# Async
threat_knoppen_versturen = None

# Logger
INSTRUMENTATION_KEY = "ca700d89-5fed-471f-8887-e4658b179b73"
azure_logger = TelemetryClient(INSTRUMENTATION_KEY)


# --------------------
# Klasses
# --------------------
# Klasse voor connecteren Hartslag sensor
class HRM(Peripheral):
    def __init__(self, addr):
        try:
            Peripheral.__init__(self, addr, addrType=ADDR_TYPE_PUBLIC)
        except Exception:
            raise ConnectionError


# --------------------
# Methodes
# --------------------
def mqtt_doorsturen_hartslag_forcefully(player_id, hrm):    
    start_tijd = time.time()
    while (time.time() - start_tijd) * 1000.0 < 8000:
        pass
    if (player_id is 1 and stop_forcefully_1 is False) or (player_id is 2 and stop_forcefully_2 is False) or\
            (player_id is 3 and stop_forcefully_3 is False) or (player_id is 4 and stop_forcefully_4 is False):
        mqtt_doorsturen_hartslag(player_id, 0)
        if hrm:
            hrm.disconnect()
        print("---- Forcefully deconnected with bluetooth device of player {0} ----".format(player_id))


def lcd_reset():
    start_tijd = time.time()
    while (time.time() - start_tijd) * 1000.0 < 5000:
        pass
    lcd.set_rgb_backlight(0, 80, 0)
    lcd.clear_display()
    lcd.write_string("Game ID: " + str(PI_ID))


def lcd_toon_info(string):
    lcd.set_rgb_backlight(0, 0, 80)
    lcd.clear_display()
    lcd.write_string("Game ID: " + str(PI_ID))
    lcd.change_cursor_position(1, 0)
    lcd.write_string("Info:")
    lcd.change_cursor_position(2, 0)
    lcd.write_string(string)
    threat_lcd_reset = threading.Thread(target=lcd_reset)
    threat_lcd_reset.start()


def lcd_toon_error(string):
    lcd.set_rgb_backlight(80, 0, 0)
    lcd.clear_display()
    lcd.write_string("Game ID: " + str(PI_ID))
    lcd.change_cursor_position(1, 0)
    lcd.write_string("Error:")
    lcd.change_cursor_position(2, 0)
    lcd.write_string(string)


def azure_log(event, data):
    azure_logger.track_event(event, data)
    azure_logger.flush()


def mqtt_doorsturen_hartslag(player_id, bpm):
    JSON_SEND = {}
    JSON_SEND["type"] = TYPE_COM_BPM
    JSON_SEND["player"] = int(player_id)
    JSON_SEND["heartbeat"] = int(bpm)
    client.publish(JS_SEND_TOPIC, str(JSON_SEND).replace("'", '"'))
    azure_log("RPI heartbeat read player {0}".format(player_id), str(bpm))
    print("---- Heartbeat player {0} send ----".format(player_id))


def mqtt_doorsturen_bt_scan():
    JSON_SEND = {}
    JSON_SEND["type"] = TYPE_COM_SCAN
    JSON_SEND["devices"] = BT_DEVICES
    client.publish(JS_SEND_TOPIC, str(JSON_SEND).replace("'", '"'))
    print("---- Bluetooth scan send ----")


def mqtt_doorsturen_knop_question(player_id, needed_time, knop):
    tijd = 0
    JSON_SEND = {}
    JSON_SEND["button"] = 0
    if needed_time is not None:
        tijd = needed_time
    if knop is not None:
        JSON_SEND["button"] = KNOPPEN[knop]
    JSON_SEND["type"] = TYPE_COM_QUESTION
    JSON_SEND["player"] = player_id
    JSON_SEND["time_needed"] = tijd
    client.publish(JS_SEND_TOPIC, str(JSON_SEND).replace("'", '"'))
    print("---- Question answer from player {0} send ----".format(player_id))


def mqtt_doorsturen_knop_avatar():
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
    elif knop in PLAYER3_INPUTS:
        if player3_send:
            ok = True
    elif knop in PLAYER4_INPUTS:
        if player4_send:
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
        elif knop in PLAYER3_INPUTS:
            JSON_SEND["player"] = 3
        elif knop in PLAYER4_INPUTS:
            JSON_SEND["player"] = 4
        client.publish(JS_SEND_TOPIC, str(JSON_SEND).replace("'", '"'))
        print("---- Avatar send ----")


def mqtt_init_communicatie():
    # Terugsturen naar JavaScript dat communicatie goed is
    JSON_SEND = {}
    JSON_SEND["type"] = TYPE_COM_TEST
    print("---- Test com send ----")
    client.publish(JS_SEND_TOPIC, str(JSON_SEND).replace("'", '"'))


def show_hartslag_1(cHandle, data):
    global ontvangen_hartslag_1, stop_forcefully_1
    stop_forcefully_1 = True
    print("Hartslag speler 1: " + str(data[1]))
    ontvangen_hartslag_1 += 1
    if ontvangen_hartslag_1 == aantal_lees_acties:
        mqtt_doorsturen_hartslag(1, data[1])


def show_hartslag_2(cHandle, data):
    global ontvangen_hartslag_2, stop_forcefully_2
    stop_forcefully_2 = True
    print("Hartslag speler 2: " + str(data[1]))
    ontvangen_hartslag_2 += 1
    if ontvangen_hartslag_2 == aantal_lees_acties:
        mqtt_doorsturen_hartslag(2, data[1])


def show_hartslag_3(cHandle, data):
    global ontvangen_hartslag_3, stop_forcefully_3
    stop_forcefully_3 = True
    print("Hartslag speler 3: " + str(data[1]))
    ontvangen_hartslag_3 += 1
    if ontvangen_hartslag_3 == aantal_lees_acties:
        mqtt_doorsturen_hartslag(3, data[1])


def show_hartslag_4(cHandle, data):
    global ontvangen_hartslag_4, stop_forcefully_4
    stop_forcefully_4 = True
    print("Hartslag speler 4: " + str(data[1]))
    ontvangen_hartslag_4 += 1
    if ontvangen_hartslag_4 == aantal_lees_acties:
        mqtt_doorsturen_hartslag(4, data[1])


def uitlezen_bt_device(device_id, aantal_lees_acties, player):
    global ontvangen_hartslag_1, ontvangen_hartslag_2, ontvangen_hartslag_3, ontvangen_hartslag_4, stop_forcefully_1,\
        stop_forcefully_2, stop_forcefully_3, stop_forcefully_4
    ontvangen_hartslag_1, ontvangen_hartslag_2, ontvangen_hartslag_3, ontvangen_hartslag_4 = 0, 0, 0, 0
    stop_forcefully_1, stop_forcefully_2, stop_forcefully_3, stop_forcefully_4 = False, False, False, False
    # uuid's opvragen
    cccid = AssignedNumbers.client_characteristic_configuration
    hrmid = AssignedNumbers.heart_rate
    hrmmid = AssignedNumbers.heart_rate_measurement
    # Start connecteren en uitlezen
    hrm = None
    try:
        failed_teller = 0
        # Connecteren met device id
        while True:
            try:
                hrm = HRM(device_id)
                if hrm is not ConnectionError:
                    break
                else:
                    azure_log("RPI can't connect to bluetooth device", device_id)
            except ConnectionError:
                failed_teller += 1
                if failed_teller is 5:
                    threat_send_forcefully = threading.Thread(target=mqtt_doorsturen_hartslag_forcefully,
                                                                args=(player, hrm))
                    threat_send_forcefully.start()
        print("---- Connected with bluetooth device {0} ----".format(device_id))
        azure_log("RPI connected to bluetooth device", device_id)
        # uuid's uitlezen
        service, = [s for s in hrm.getServices() if s.uuid == hrmid]
        ccc, = service.getCharacteristics(forUUID=str(hrmmid))
        # Descriptors ophalen
        desc = hrm.getDescriptors(service.hndStart, service.hndEnd)
        d, = [d for d in desc if d.uuid == cccid]
        # Karakteristieken schrijven
        hrm.writeCharacteristic(d.handle, b'\1\0')
        # Callback zetten op print_hr functie bij het ontvangen van notificatie
        if player == 1:
            threat_send_forcefully_1 = threading.Thread(target=mqtt_doorsturen_hartslag_forcefully, args=(player, hrm))
            threat_send_forcefully_1.start()
            hrm.delegate.handleNotification = show_hartslag_1
        elif player == 2:
            threat_send_forcefully_2 = threading.Thread(target=mqtt_doorsturen_hartslag_forcefully, args=(player, hrm))
            threat_send_forcefully_2.start()
            hrm.delegate.handleNotification = show_hartslag_2
        elif player == 3:
            threat_send_forcefully_3 = threading.Thread(target=mqtt_doorsturen_hartslag_forcefully, args=(player, hrm))
            threat_send_forcefully_3.start()
            hrm.delegate.handleNotification = show_hartslag_3
        elif player == 4:
            threat_send_forcefully_4 = threading.Thread(target=mqtt_doorsturen_hartslag_forcefully, args=(player, hrm))
            threat_send_forcefully_4.start()
            hrm.delegate.handleNotification = show_hartslag_4
        # Aantal keer de data uitlezen
        for x in range(aantal_lees_acties):
            hrm.waitForNotifications(3.)
    # Deconnecteren wanneer hartslag sensor is geconnecteerd
    finally:
        if hrm:
            hrm.disconnect()
            print("---- Stop reading and deconnected with bluetooth device {0} ----".format(device_id))


def start_bluetooth_scan():
    global BT_DEVICES
    BT_DEVICES = []
    bt_device = {}
    print("---- Start bluetooth scan ----")
    scanner = Scanner()
    devices = scanner.scan(10.0)
    # Tonen van devices
    for dev in devices:
        if str(dev.getValueText(0x09)).find("Polar OH1") is not -1:
            bt_device['name'] = dev.getValueText(0x09)
            bt_device['mac'] = dev.addr
            BT_DEVICES.append(bt_device)
            bt_device = {}
    print("---- Bluetooth scan end ----")
    mqtt_doorsturen_bt_scan()


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
    client.publish('/luemniro/id/request', "{'id': '" + str(PI_ID) + "'}")


def read_keyboard_avatar():
    global knoppen_pressed, knop_pressed, threat_knoppen_versturen
    mouse_done = []
    dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
    while knoppen_stoppen is False:
        try:
            for event in dev.read():
                if event.code == 0 and event.value == -4 and 10000 not in mouse_done: # Left
                    knop_pressed = 10000
                    mouse_done.append(10000)
                    threat_knoppen_versturen = threading.Thread(target=mqtt_doorsturen_knop_avatar)
                    threat_knoppen_versturen.start()
                    threat_knoppen_versturen.join()
                elif event.code == 1 and event.value == -4 and 10001 not in mouse_done: # Up
                    knop_pressed = 10001
                    mouse_done.append(10001)
                    threat_knoppen_versturen = threading.Thread(target=mqtt_doorsturen_knop_avatar)
                    threat_knoppen_versturen.start()
                    threat_knoppen_versturen.join()
                elif event.code == 0 and event.value == 4 and 10002 not in mouse_done: # Right
                    knop_pressed = 10002
                    mouse_done.append(10002)
                    threat_knoppen_versturen = threading.Thread(target=mqtt_doorsturen_knop_avatar)
                    threat_knoppen_versturen.start()
                    threat_knoppen_versturen.join()
                elif event.code == 1 and event.value == 4 and 10003 not in mouse_done: # Down
                    knop_pressed = 10003
                    mouse_done.append(10004)
                    threat_knoppen_versturen = threading.Thread(target=mqtt_doorsturen_knop_avatar)
                    threat_knoppen_versturen.start()
                    threat_knoppen_versturen.join()

                if event.type == ecodes.EV_KEY and event.value == KNOP_PRESS:
                    if event.code == ecodes.KEY_UP:
                        knop_pressed = ecodes.KEY_UP
                    elif event.code == ecodes.KEY_DOWN:
                        knop_pressed = ecodes.KEY_DOWN
                    elif event.code == ecodes.KEY_LEFT:
                        knop_pressed = ecodes.KEY_LEFT
                    elif event.code == ecodes.KEY_RIGHT:
                        knop_pressed = ecodes.KEY_RIGHT
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
                    elif event.code == ecodes.KEY_SPACE:
                        knop_pressed = ecodes.KEY_SPACE
                    elif event.code == 272: # left click
                        knop_pressed = 272
                    threat_knoppen_versturen = threading.Thread(target=mqtt_doorsturen_knop_avatar)
                    threat_knoppen_versturen.start()
                    threat_knoppen_versturen.join()
        except Exception as ex:
            pass


def read_keyboard_question(player_id, time_left):
    read_knoppen = True
    start_tijd = time.time()
    huidige_tijd = 0
    knop = None
    dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
    while read_knoppen is True:
        try:
            for event in dev.read():
                # Uitlezen knoppen
                if event.code == 0 and event.value == -4: # Left
                    knop = 10000
                elif event.code == 1 and event.value == -4: # Up
                    knop = 10001
                elif event.code == 0 and event.value == 4: # Right
                    knop = 10002
                elif event.code == 1 and event.value == 4: # Down
                    knop = 10003

                if event.type == ecodes.EV_KEY:
                    if event.code == ecodes.KEY_UP:
                        knop = ecodes.KEY_UP
                    elif event.code == ecodes.KEY_DOWN:
                        knop = ecodes.KEY_DOWN
                    elif event.code == ecodes.KEY_LEFT:
                        knop = ecodes.KEY_LEFT
                    elif event.code == ecodes.KEY_RIGHT:
                        knop = ecodes.KEY_RIGHT
                    elif event.code == ecodes.KEY_W:
                        knop = ecodes.KEY_W
                    elif event.code == ecodes.KEY_A:
                        knop = ecodes.KEY_A
                    elif event.code == ecodes.KEY_S:
                        knop = ecodes.KEY_S
                    elif event.code == ecodes.KEY_D:
                        knop = ecodes.KEY_D
                    elif event.code == ecodes.KEY_F:
                        knop = ecodes.KEY_F
                    elif event.code == ecodes.KEY_G:
                        knop = ecodes.KEY_G
                    elif event.code == ecodes.KEY_SPACE:
                        knop = ecodes.KEY_SPACE
                    elif event.code == 272: # left click
                        knop = 272

                # Controlle van knoppen en speler
                if (player_id == 1 and knop in PLAYER1_INPUTS) or (player_id == 2 and knop in PLAYER2_INPUTS) or \
                        (player_id == 3 and knop in PLAYER3_INPUTS) or (player_id == 4 and knop in PLAYER4_INPUTS):
                    threat = threading.Thread(target=mqtt_doorsturen_knop_question,
                                              args=(player_id, huidige_tijd, knop))
                    read_knoppen = False
                    threat.start()
                    threat.join()
                    knop = None
                    dev.close()
                    break
        except Exception as ex:
            huidige_tijd = round((time.time() - start_tijd) * 1000, 0)
            if huidige_tijd > time_left:
                read_knoppen = False
                threat = threading.Thread(target=mqtt_doorsturen_knop_question, args=(player_id, None, None))
                threat.start()
                threat.join()


# --------------------
# Callback
# --------------------
def mqtt_on_message(client, userdata, msg):
    global PI_ID, ID_OK, KNOPPEN_INLEZEN, player1_send, player2_send, player3_send, player4_send, knoppen_stoppen,\
        PLAYERS_BT_DEVICES, aantal_lees_acties
    # Aanvragen ID topic
    if msg.topic == "/luemniro/id/response":
        # Kijken of ID voor deze pi is
        string = msg.payload.decode()
        obj = json.loads(string)  # Omzetten json
        if obj["id"] == int(PI_ID):
            if obj["status"] == "OK":
                print("---- ID is accepted ----")
                azure_log("RPI ID accepted", PI_ID)
                save_js_mqtt_topic() # Topic opslaan
                ID_OK = True
                # Display aansturen
                lcd.clear_display()
                lcd.write_string("Game ID: " + str(PI_ID))
            else:
                azure_log("RPI ID rejected", PI_ID)
                send_id_request() # Nieuwe ID request sturen
    # Ontvangen JavaScript topic
    elif msg.topic == JS_RECEIVE_TOPIC:
        string = msg.payload.decode()
        obj = json.loads(string)  # Omzetten json
        # Test COM
        if obj["type"] == TYPE_COM_TEST:
            azure_log("RPI test com", None)
            mqtt_init_communicatie()
        # Avatar selectie
        elif obj["type"] == TYPE_COM_AVATAR:
            # Start van uitlezen
            if obj["status"] == TYPE_COM_AVATAR_STATUS_START:
                print("---- Reading buttons ----")
                knoppen_stoppen = False
                player1_send, player2_send, player3_send, player4_send = True, True, True, True
                threat = threading.Thread(target=read_keyboard_avatar)
                threat.start()
            # Speler laten stoppen
            if obj["status"] == TYPE_COM_AVATAR_STATUS_STOP:
                azure_log("RPI player received avatar", obj["player"])
                print("---- Player {0} received avatar ----".format(obj["player"]))
                if obj["player"] == 1:
                    player1_send = False
                if obj["player"] == 2:
                    player2_send = False
                if obj["player"] == 3:
                    player3_send = False
                if obj["player"] == 4:
                    player4_send = False
            # Speler laten stoppen
            if obj["status"] == TYPE_COM_AVATAR_STATUS_END:
                print("---- Stop reading buttons ----")
                knoppen_stoppen = True
        # Lezen van bluetooth
        elif obj["type"] == TYPE_COM_SCAN:
            # Start scan
            if obj["status"] == TYPE_COM_SCAN_STATUS_START:
                azure_log("RPI start bluetooth scan", None)
                lcd_toon_info("Start zoeken naar   sensoren...")
                threat_bt = threading.Thread(target=start_bluetooth_scan)
                threat_bt.start()
            # Ontvangen BT devices per speler
            if obj["status"] == TYPE_COM_SCAN_STATUS_DEVICES:
                PLAYERS_BT_DEVICES = obj["devices"]
                print("---- Received choosen bluetooth devices ----")
        # Lezen van hartslag
        elif obj["type"] == TYPE_COM_BPM:
            print("---- Start reading bpm ----")
            lcd_toon_info("Lezen van hartslagen...")
            azure_log("RPI start reading bpm", None)
            for device in PLAYERS_BT_DEVICES:
                aantal_lees_acties = 1
                threat_lezen_rusthartslag = threading.Thread(target=uitlezen_bt_device, args=(device["mac"], 1, device["player"]))
                threat_lezen_rusthartslag.start()
        # Antwoorden op vraag
        elif obj["type"] == TYPE_COM_QUESTION:
            print("---- Reading buttons ----")
            azure_log("RPI start answering on question", None)
            for player in obj["player"]:
                threat_lezen_knoppen = threading.Thread(target=read_keyboard_question, args=(player["player"], player["time_left"]))
                threat_lezen_knoppen.start()


def mqtt_on_connect(client, userdata, flags, rc):
    azure_log("RPI connected to MQTT broker", "Result code: {0}".format(str(rc)))
    print("---- Succesfully connected with MQTT broker (result code " + str(rc) + ") ----")


def mqtt_on_disconnect(client, userdata, flags, rc):
    print("---- Disconnected with result code " + str(rc) + " ----")


# --------------------
# Init
# --------------------
async def init():
    global client, lcd, dev, ID_OK
    try:
        # Init LCD
        lcd = LCD_4_20_SPI()
        lcd.set_rgb_backlight(0, 80, 0)
        # Loggen
        azure_log("RPI boot", None)
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
        lcd.write_string("Aanvragen van ID ...")
        # Genereren + controle van ID
        send_id_request()
        client.loop_forever()
    except FileNotFoundError:
        azure_log("RPI script opgestart zonder Makey Makey", None)
        lcd_toon_error("Geen makey makey    gevonden")
    except Exception as ex:
        print(ex)


# --------------------
# Main
# --------------------
try:
    if __name__ == "__main__":
        loop = asyncio.get_event_loop()
        loop.run_until_complete(init())
except Exception:
    lcd.clear_display()
    lcd_toon_error("Fatale error!       Hertstart de Pi")
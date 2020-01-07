# --------------------
# Imports
# --------------------
import json
import random

import paho.mqtt.client as mqtt
from evdev import ecodes

# --------------------
# Globale variabelen
# --------------------
PI_ID = None


# --------------------
# Methodes
# --------------------
def send_id_request():
    global PI_ID
    random_number = random.randint(0, 999999)
    PI_ID = random_number
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
    global PI_ID
    # Test topic
    if msg.topic == "/python/response":
        print("Test MQTT")
    # Aanvragen ID topic
    if msg.topic == "/luemniro/id/response":
        obj = json.loads(msg.payload) # Omzetten json
        # Kijken of ID voor deze pi is
        if obj['id'] == PI_ID:
            if obj['status'] == "OK":
                print("---- ID is toegestaan ----")
                pass # ID id OKE
            else:
                send_id_request() # Nieuwe ID request sturen


def mqtt_on_connect(client, userdata, flags, rc):
    print("---- Connected with result code " + str(rc) + " ----")


# --------------------
# Init
# --------------------
try:
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
except Exception as ex:
    print(ex)


# --------------------
# Main
# --------------------
# read_keyboard()
input()
print("End")
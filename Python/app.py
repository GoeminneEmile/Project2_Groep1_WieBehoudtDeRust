# --------------------
# Imports
# --------------------
from evdev import InputDevice, categorize, ecodes
import paho.mqtt.client as mqtt
import json
import random


# --------------------
# Globale variabelen
# --------------------
PI_ID = None


# --------------------
# Methodes
# --------------------
def send_id_request():
    random_number = random.randint(0, 999999)
    client.publish('luemniro/id/request', "{'id', '" + str(random_number) + "'}")


def mqtt_test():
    client.subscribe("/python/response")
    client.publish("/python/test", "{'test': 'test'}")
    client.loop_start()

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
    print(msg.topic)
    if msg.topic == "/python/response": # Test topic
        print(msg.payload)
    if msg.topic == "luemniro/id/response": # Aanvragen ID topic
        obj = json.loads(msg.payload) # Omzetten json
        print(obj)
        if obj['status'] == "OK":
            PI_ID = obj['status']
        else:
            send_id_request()


def mqtt_on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))


# --------------------
# Init
# --------------------
# Inlezen Makey Makey
dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
# Init MQTT Client
client = mqtt.Client()
client.on_connect = mqtt_on_connect
client.on_message = mqtt_on_message
client.connect("mct-mqtt.westeurope.cloudapp.azure.com", 1883, 60)
# Genereren + controle van ID
send_id_request()


# --------------------
# Main
# --------------------
mqtt_test()
read_keyboard()
print("End")
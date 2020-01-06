# --------------------
# Imports
# --------------------
from evdev import InputDevice, categorize, ecodes


# --------------------
# Methodes
# --------------------
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


# --------------------
# Listeners
# --------------------


# --------------------
# Main
# --------------------
dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
read_keyboard()
print("End")
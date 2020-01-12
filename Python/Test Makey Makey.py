# ---- Test Van de Makey Makey ----
from evdev import ecodes, InputDevice
import mouse as mouse_lib

mouse = mouse_lib
dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
read_knoppen = True
while read_knoppen is True:
    try:
        for event in dev.read():
            if event.type == ecodes.EV_KEY:
                print(event.code)
                if event.code == ecodes.KEY_UP:
                    knop = ecodes.KEY_UP
                elif event.code == ecodes.KEY_DOWN:
                    knop = ecodes.KEY_DOWN
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
    except Exception as ex:
        pass


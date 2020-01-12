# ---- Test Van de Makey Makey ----
from evdev import ecodes, InputDevice
import mouse as mouse_lib
import time
import os

# from pynput.mouse import Listener

# def on_move(x, y):
#     print('Pointer moved to {0}'.format(
#         (x, y)))
#
# def on_click(x, y, button, pressed):
#     print('{0} at {1}'.format(
#         'Pressed' if pressed else 'Released',
#         (x, y)))
#     if not pressed:
#         # Stop listener
#         return False
#
# def on_scroll(x, y, dx, dy):
#     print('Scrolled {0}'.format(
#         (x, y)))
#
# # Collect events until released
# with Listener(
#         on_move=on_move,
#         on_click=on_click,
#         on_scroll=on_scroll) as listener:
#     listener.join()


# def mouse_event(event, test):
#     print("Test")
#     if event == mouse.MoveEvent:
#         print(event)
#
#
# mouse = mouse_lib
# mouse.hook(mouse_event)
#
# while True:
#     time.sleep(2)

# dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
# read_knoppen = True
# while read_knoppen is True:
#     try:
#         for event in dev.read():
#             if event.code == 0 and event.value == -4:
#                 print("left")
#             elif event.code == 1 and event.value == -4:
#                 print("up")
#             elif event.code == 0 and event.value == 4:
#                 print("right")
#             elif event.code == 1 and event.value == 4:
#                 print("down")
#
#             read_knoppen = False
#     except Exception as ex:
#         pass


dev = InputDevice('/dev/input/by-id/usb-Unknown_USB_IO_Board-if02-event-mouse')
read_knoppen = True
while read_knoppen is True:
    try:
        for event in dev.read():
            if event.code == 0 and event.value == -4:  # Left
                print("left")
            elif event.code == 1 and event.value == -4:  # Up
                print("up")
            elif event.code == 0 and event.value == 4:  # Right
                print("right")
            elif event.code == 1 and event.value == 4:  # Down
                print("down")

            if event.type == ecodes.EV_KEY:
                print(event.code)
                if event.code == ecodes.KEY_LEFT:
                    print("left button")
                if event.code == ecodes.KEY_RIGHT:
                    print("right button")
                if event.code == ecodes.KEY_SPACE:
                    print("space")
                if event.code == 272:
                    print("click")

            read_knoppen = False
    except Exception as ex:
        pass


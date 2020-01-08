# ---- Test Van de Makey Makey ----
import keyboard

while True:
    try:
        if keyboard.is_pressed('W'):
            print('You Pressed W Key!')
            break
    except:
        break


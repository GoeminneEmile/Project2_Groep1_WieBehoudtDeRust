from spidev import SpiDev
import time

class LCD_4_20_SPI:
    def __init__(self, max_speed=100000, cs=0):
        self.max_speed = max_speed
        self.cs = cs
        self.lcd = SpiDev()
        self.__setup()

    def __setup(self):
        self.lcd.open(0, self.cs)
        self.lcd.max_speed_hz = self.max_speed
        self.lcd.writebytes([0x7C, 0x2D]) # Clear display

    def write_string(self, string):
        for i in range(0, len(string)):
            self.lcd.writebytes([ord(string[i])])
            time.sleep(0.005)

    def change_contrast(self, value):
        self.lcd.writebytes([0x7C, 0x18, value])

    def clear_display(self):
        self.lcd.writebytes([0x7C, 0x2D]) # Clear display

    def change_cursor_position(self, row, position):
        if row == 0:
            self.lcd.writebytes([254, 128 + 0 + position])
        elif row == 1:
            self.lcd.writebytes([254, 128 + 64 + position])
        elif row == 2:
            self.lcd.writebytes([254, 128 + 20 + position])
        elif row == 3:
            self.lcd.writebytes([254, 128 + 84 + position])

    def set_primary_backlight_brightness(self, procent):
        max_waarde = 157-128
        waarde = (int(procent / 100 * max_waarde)) + 128
        self.lcd.writebytes([0x7C, waarde])

    def set_green_backlight_brightness(self, procent):
        max_waarde = 187 - 158
        waarde = (int(procent / 100 * max_waarde)) + 158
        self.lcd.writebytes([0x7C, waarde])

    def set_blue_backlight_brightness(self, procent):
        max_waarde = 217 - 188
        waarde = (int(procent / 100 * max_waarde)) + 188
        self.lcd.writebytes([0x7C, waarde])

    def set_rgb_backlight(self, red_procent, green_procent, blue_procent):
        blauw_waarde = int(blue_procent / 100 * 255)
        rood_waarde = int(red_procent / 100 * 255)
        groen_waarde = int(green_procent / 100 * 255)
        self.lcd.writebytes([0x7C, 0x2B, rood_waarde, groen_waarde, blauw_waarde])
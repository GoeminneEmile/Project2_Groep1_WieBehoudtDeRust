import bluetooth
from bluepy.btle import AssignedNumbers, Scanner, DefaultDelegate, Peripheral, ADDR_TYPE_PUBLIC
import asyncio
import threading

# class ScanDelegate(DefaultDelegate):
#     def __init__(self):
#         DefaultDelegate.__init__(self)
#
#     def handleDiscovery(self, dev, isNewDev, isNewData):
#         if isNewDev:
#             print("Discovered device", dev.addr)
#         elif isNewData:
#             print("Received new data from", dev.addr)


# class MyDelegate(DefaultDelegate):
#     def __init__(self):
#         DefaultDelegate.__init__(self)
#
#     def handleNotification(self, cHandle, data):
#         print("------ Data ontvangen ------")
#         print(data)
#         pass

# Klasse voor connecteren Hartslag sensor
class HRM(Peripheral):
    def __init__(self, addr):
        Peripheral.__init__(self, addr, addrType=ADDR_TYPE_PUBLIC)


# Methode voor printen van data
def print_hr_x(cHandle, data):
    print("Robbe: " + str(data[1]))

def print_hr_y(cHandle, data):
    print("Nick: " + str(data[1]))


def main(device_id, x):
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
        service, = [s for s in hrm.getServices() if s.uuid==hrmid]
        ccc, = service.getCharacteristics(forUUID=str(hrmmid))
        # Descriptors ophalen
        desc = hrm.getDescriptors(service.hndStart, service.hndEnd)
        d, = [d for d in desc if d.uuid == cccid]
        # Karakteristieken schrijven
        hrm.writeCharacteristic(d.handle, b'\1\0')
        # Callback zetten op print_hr functie bij het ontvangen van notificatie
        if x:
            hrm.delegate.handleNotification = print_hr_x
        else:
            hrm.delegate.handleNotification = print_hr_y
        # 200 keer de data uitlezen
        for x in range(1):
            hrm.waitForNotifications(3.)
    # Deconnecteren wanneer hartslag sensor is geconnecteerd
    finally:
        if hrm:
            hrm.disconnect()


# Start de scan
print("---- Start Bluetooth Scan ----")
scanner = Scanner()
devices = scanner.scan(10.0)
# Tonen van devices
for dev in devices:
    if str(dev.getValueText(0x09)).find("Polar OH1") is not -1:
        print("Device {0}: {1}".format(dev.addr, dev.getValueText(0x09)))
# Device Mac adress vragen
device_id_x = input("Geef het device MAC ID:")
device_id_y = input("Geef het device MAC ID:")
for i in range(0, 10):
    main(device_id_x, True)
    main(device_id_y, False)

# x = threading.Thread(target=threat_start_x)
# y = threading.Thread(target=threat_start_y)
# x.start()
# y.start()




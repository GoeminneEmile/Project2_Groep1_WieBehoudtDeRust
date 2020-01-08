import bluetooth
from bluepy.btle import AssignedNumbers, Scanner, DefaultDelegate, Peripheral, ADDR_TYPE_PUBLIC

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
def print_hr(cHandle, data):
    print(data[1])


# Start de scan
print("------ Start Scan ------")
scanner = Scanner()
devices = scanner.scan(10.0)
# Tonen van devices
for dev in devices:
    print("Device {0}: {1}".format(dev.addr, dev.getValueText(0x09)))
# Device Mac adress vragen
device_id = input("Geef het device MAC ID:")
# uuid's opvragen
cccid = AssignedNumbers.client_characteristic_configuration
hrmid = AssignedNumbers.heart_rate
hrmmid = AssignedNumbers.heart_rate_measurement
# Start connecteren en uitlezen
hrm = None
try:
    # Connecteren met device id
    hrm = HRM(device_id)
    # uuid's uitlezen
    service, = [s for s in hrm.getServices() if s.uuid==hrmid]
    ccc, = service.getCharacteristics(forUUID=str(hrmmid))
    # Descriptors ophalen
    desc = hrm.getDescriptors(service.hndStart, service.hndEnd)
    d, = [d for d in desc if d.uuid == cccid]
    # Karakteristieken schrijven
    hrm.writeCharacteristic(d.handle, b'\1\0')
    # Callback zetten op print_hr functie bij het ontvangen van notificatie
    hrm.delegate.handleNotification = print_hr
    # 200 keer de data uitlezen
    for x in range(200):
        hrm.waitForNotifications(3.)
# Deconnecteren wanneer hartslag sensor is geconnecteerd
finally:
    if hrm:
        hrm.disconnect()


# connect = Peripheral(device_id) # connecteren?
# connect.pair() # Pairen
# state = connect.getState() # State opvragen
# print(state)
#
#
# while True:
#     # print(connect.getCharacteristics())
#     if connect.waitForNotifications(1.0):
#         print("Waiting done")
#         continue
#     print("Waiting...")



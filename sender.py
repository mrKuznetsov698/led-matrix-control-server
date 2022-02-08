import serial

ser = None
port = "COM4"
speed = 115200


def init():
    global ser
    ser = serial.Serial()
    ser.port = port
    ser.baudrate = speed
    try:
        ser.open()
    except serial.SerialException as e:
        print(e)


def sendPixel(x: int, y: int, color: str):
    global ser
    if ser.isOpen():
        r, g, b = hex_to_rgb(int(color))
        txt = f'0,{x},{y},{r},{g},{b};'
        ser.write(bytes(txt, 'utf-8'))


def sendFill(color: str):
    global ser
    if ser.isOpen():
        r, g, b = hex_to_rgb(int(color))
        txt = f'1,{r},{g},{b};'
        ser.write(bytes(txt, 'utf-8'))


def hex_to_rgb(colorcode):
    r = (colorcode >> 16) & 0xFF
    g = (colorcode >> 8) & 0xFF
    b = (colorcode >> 0) & 0xFF
    return r, g, b

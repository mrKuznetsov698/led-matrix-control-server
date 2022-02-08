from flask import Flask, send_file
import sender
sender.init()
app = Flask(__name__)

@app.route('/')
def home():
    return send_file('data/index.html')


@app.route('/files/<file_name>')
def file(file_name):
    return send_file('data/' + file_name)


@app.route('/method/fill/<col>')
def fill(col):
    sender.sendFill(col)
    print('fill matrix')
    return 'ok'


@app.route('/method/setPixel/<int:posX>/<int:posY>/<col>')
def send_pixel(posX, posY, col):
    sender.sendPixel(x=posX, y=posY, color=col)
    print('set pixel!')
    return 'ok'


app.run(host='0.0.0.0', port=80)
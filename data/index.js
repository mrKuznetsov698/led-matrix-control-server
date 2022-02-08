let ledW = 16;
let ledH = 16;
let ledS = 40;
let ledOffset = 8;
let canvas;
let Width = ledW * ledS + (ledW+1) * ledOffset;
let Height = ledH * ledS + (ledH+1) * ledOffset;
let colorpicker;

class Pos{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


function setup() {
    canvas = createCanvas(Width, Height, P2D);
    noStroke();
    for (let i = 0; i < ledW; i++) {
        leds[i] = [];
        pos[i] = [];
        for (let j = 0; j < ledH; j++) {
            leds[i].push(0);
            pos[i].push(new Pos(ledOffset + i*(ledS + ledOffset), ledOffset + j*(ledS + ledOffset)))
        }
    }
    canvas.canvas.onclick = mouse;
    document.addEventListener('keypress', keyHandler)
    colorpicker = document.getElementById('colorpicker')
}

let leds = [];
let pos = [];

function draw() {
    background(100);
    for (let i = 0; i < ledW; i++){
        for (let j = 0; j < ledH; j++){
            fill(leds[i][j]);
            rect(pos[i][j].x, pos[i][j].y, ledS, ledS);
        }
    }
}

function mouse(){
    if (mouseX <= ledOffset || mouseX >= Width-ledOffset)
        return
    if (mouseY <= ledOffset || mouseY >= Height-ledOffset)
        return
    let x;
    let y;
    for (let i = 0; i < ledW; i++) {
        for (let j = 0; j < ledH; j++) {
            if (mouseX >= pos[i][j].x
                && mouseX <= pos[i][j].x + ledS
                && mouseY >= pos[i][j].y
                && mouseY <= pos[i][j].y + ledS) {
                x = i;
                y = j;
            }
        }
    }
    if (x != undefined && y != undefined){
        leds[x][y] = colorpicker.value;
        y = ledH - 1 - y;
        send('method/setPixel/' + x + '/' + y + '/' + Number(colorpicker.value.replace('#', '0x')));
    }
}

function keyHandler(event){
    if (event.key != 'c' && event.key != 'f')
        return;

    let col = '#000000';
    if (event.key == 'f')
        col = colorpicker.value;
    for (let i = 0; i < ledW; i++)
        for (let j = 0; j < ledH; j++)
            leds[i][j] = col;
    send('method/fill/' + Number(col.replace('#', '0x')))
}

function send(text){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', text, false);
    xhr.send();
}
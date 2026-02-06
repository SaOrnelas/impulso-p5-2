var font;
var vehicles = [];

var WORD = "IMPULSO";
var PAD = 20;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  // Canvas com largura “tipo mobile” e altura confortável para embed
  // Se quiseres, podes trocar 360 por windowWidth e manter a altura fixa.
  createCanvas(360, 420);

  // 1) escolher um fontSize que caiba no canvas (com margem PAD) [web:139]
  var fontSizeGuess = height * 0.8;
  var b0 = font.textBounds(WORD, 0, 0, fontSizeGuess);

  var scale = Math.min((width - 2 * PAD) / b0.w, (height - 2 * PAD) / b0.h);
  var fontSize = fontSizeGuess * scale;

  // 2) calcular x,y para centrar [web:139]
  var b = font.textBounds(WORD, 0, 0, fontSize);
  var x = (width - b.w) / 2 - b.x;
  var y = (height + b.h) / 2 - b.y;

  // 3) gerar pontos [web:27]
  var points = font.textToPoints(WORD, x, y, fontSize, {
    sampleFactor: 1,
    simplifyThreshold: 0
  });

  vehicles = [];
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    vehicles.push(new Vehicle(pt.x, pt.y));
  }
}

function draw() {
  clear();

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

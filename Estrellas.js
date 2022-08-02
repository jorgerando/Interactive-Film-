class Estrella {
  constructor() {
    this.p = new p5.Vector(random(screen.width), random(screen.height + 400));
    this.r_i = 1;
    this.n = random(10);
  }

  Palpitar() {
    this.r_i = noise(this.n) * 3.5;
    this.n += 0.03;
  }

  Dibujar() {
    noStroke();
    ellipse(this.p.x, this.p.y, this.r_i, this.r_i);
  }
}
class Asteroide {
  constructor() {
    this.pi = createVector(random(screen.width), random(screen.height));
    this.v = p5.Vector.random2D().mult(random(15, 30));
    this.r_i = 5;
    this.vida = 1;
    this.tiempo = 0;
  }

  moverse() {
    this.pi.add(this.v);
  }

  Dibujar() {
    if (this.tiempo < this.vida) {
      push();
      ellipse(this.pi.x, this.pi.y, this.r_i, this.r_i);
      fill(149, 200, 243, 50);
      ellipse(this.pi.x, this.pi.y, this.r_i * 2, this.r_i * 2);
      pop();

      var v_c = this.v.copy();
      var c_n = v_c.mult(-1);
      stroke(255, 255, 255, 170);
      strokeWeight(1);
      line(this.pi.x, this.pi.y, this.pi.x + c_n.x, this.pi.y + c_n.y);
      this.time++;
    }
  }
}

var e;
var estrellas;
var a;
var canvas;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  estrellas = new Array(350);
  a = new Array();
  for (var i = 0; i < estrellas.length; i++) {
    estrellas[i] = new Estrella();
  }
}

function draw() {
  if (random(1) > 0.997) {
    a.push(new Asteroide());
  }
  if (a.lenght > 2) {
    a.remove(0);
  }

  background(0);
  for (var i = 0; i < estrellas.length; i++) {
    estrellas[i].Dibujar();
    estrellas[i].Palpitar();
  }
  for (var i = 0; i < a.length; i++) {
    a[i].Dibujar();
    a[i].moverse();
  }
}

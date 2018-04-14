let physics
let doublePendulum
let px,py;

var canvas;
let pa1,pa2,pv1,pv2;
pa1 = pa2 = 180
pv1 =pv2 =0

var r1 = 150;
var r2 = 150;
var m1 = 10;
var m2 = 10;
var a1 = 180
var a2 = 180
var v1 = 0;
var v2 = 0;
var g = .25
var damping = 1;
var gui;


function setup() {

  createCanvas(innerWidth, innerHeight);

  buffer = createGraphics(width, height);
  buffer.background(200);

  physics = new Physics()

  gui = createGui('p5.gui');
  sliderRange(50, 150, 10);
  gui.addGlobals('r1');
  gui.addGlobals('r2');
  sliderRange(10, 50, 1);
  gui.addGlobals('m1');
  gui.addGlobals('m2');
  sliderRange(-180, 180, 1);
  gui.addGlobals('a1');
  gui.addGlobals('a2');
  sliderRange(0, 100, 1);
  gui.addGlobals('v1');
  gui.addGlobals('v2');
  sliderRange(.5, 1, .01);
  gui.addGlobals('damping');
  sliderRange(-.1, .5, .01);
  gui.addGlobals('g');

   doublePendulum = new DoublePendulum(r1,r2,m1,m2)

}

function draw() {
  if(a1 !=pa1 || a2 !=pa2){
    pa1 =a1
    pa2 =a2
    doublePendulum.a1 = a1 / 180 * Math.PI
    doublePendulum.a2 = a2 / 180 * Math.PI

  }
  if(v1 != pv1 || v2 != pv2) {
    pv1 = v1
    pv2 = v2
    doublePendulum.a1_v = v1 /1000
    doublePendulum.a2_v = v2 /1000

  }



  doublePendulum.r1=r1
  doublePendulum.m1 = m1
  doublePendulum.r2 = r2
  doublePendulum.m2 = m2
  physics.dampingDoublePendulum = damping
  physics.gravity.y = g





  background(32)
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  doublePendulum.display()
  physics.updateDoublePendulum(doublePendulum)






//  buffer.stroke(237	,34	,93);
   buffer.stroke(random(255),0,0)
  buffer.strokeWeight(2);

  if (frameCount > 1) {
    x = doublePendulum.ball_2.position.x
    y = doublePendulum.ball_2.position.y
    buffer.line(px, py, x,y);
  }
  px = doublePendulum.ball_2.position.x
  py = doublePendulum.ball_2.position.y
}

function mousePressed() {





}


function mouseReleased() {
}
function keyPressed() {
  if (keyCode === ENTER) {
  buffer = createGraphics(width, height);
  buffer.background(200);
  }
}



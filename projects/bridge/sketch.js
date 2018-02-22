const engine = new Engine()
const plinko = new Plinkos()
const brideg = new Brideg()
const physics = new Physics()

let gui;
var pnum = 3

var g = 0.25
var num = 3
var damping = 1
var k = 0.8

function setup() {
  createCanvas(innerWidth, innerHeight);
   plinko.build()
   brideg.build();

   gui = createGui('p5.gui');
   sliderRange(-.5, .5, .01);
   gui.addGlobals('g');
  sliderRange(3, 20, 1);
  gui.addGlobals('num');
  sliderRange(0, 1, .01);
  gui.addGlobals('damping');
  sliderRange(0, 1, .1);
  gui.addGlobals('k');



   engine.addPlinkos(plinko)
  engine.addBrideg(brideg);

}

function reset() {
  engine.springBall = []
  engine.spring = []
  engine.myObj = []
  brideg.boll = []
  brideg.spring = []
  brideg.cols = num
  brideg.build()
  engine.addPlinkos(plinko)
  engine.addBrideg(brideg);


}
function draw() {
  if(num != pnum){

reset();
    pnum =  num

  }
  engine.physics.gravity.y = g
  engine.physics.damping = damping
  engine.physics.springK = k

  background(0)

   plinko.display()
  engine.run()

}

function mousePressed() {
  let obj = engine.isClicked(mouseX, mouseY)
  if(obj){
    obj.clicked(mouseX, mouseY)

  } else {
    var p = new Particle(mouseX, mouseY)
    p.mass =100
    engine.addMoverObject(p)
  }


}

 
function mouseReleased() {
  engine.released(mouseX, mouseY)


}



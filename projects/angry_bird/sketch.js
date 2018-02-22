let physics
let engine
let newBall = false
let v = new Vector(0, 0)
let partical

let speed = 0
const w1 = 0
const w2 = 400
let h1 = 0
let h2 = 200
let a_
let b_
let s_
let s_2

var k = .5
var P = 1

var len = 0
var g = 10
var frictionAir = 1 ;
let gui;



function setup() {
  createCanvas(innerWidth, innerHeight);
  physics = new Physics()
  engine = new Engine()
  gui = createGui('P5 GUI');

  sliderRange(-10, 10, 1);
  gui.addGlobals('g');
  sliderRange(1, 10, 1);
  gui.addGlobals('k', "P");
  sliderRange(0, 10, 1);
  gui.addGlobals('frictionAir');



  a_ = new Particle(200, innerHeight - h1 - 150, 5)
  b_ = new Particle(200, innerHeight - h1 - 150, 15)
  s_ = new Spring(a_, b_, len)

  a_.constantBody = b_.showAllwes = true
  b_.isSpringBall = a_.isSpringBall = true


  a_2 = new Particle(850, innerHeight - h1 - 150, 5)
  b_2 = new Particle(innerWidth - 100, innerHeight - h1 - 150, 5)
  s_2 = new Spring(a_2, b_2, innerWidth - 950)
  engine.addSpring(s_2)
  engine.myObj.push(a_2)
  engine.myObj.push(b_2)

  a_2.constantBody = b_2.constantBody = true
  reset();
}
function reset() {
  let bool = true
  engine.myObj = [];
  let x = 1

  x = 1
  for (let j = 0; j < 200; j += 20) {
    x += 1

    for (let i = 0 + j; i < 400 -j; i += 20) {

      let p = new Particle(870 + i, 500 - 16 * (x), 8)
      engine.addMoverObject(p)

    }

  }


}

function draw() {
  if (Math.abs(b_.position.x - a_.position.x) < 5 && Math.abs(b_.position.y - a_.position.y) < 5) {
    b_.velocity.mult(0);
    b_.acceleration.mult(0)
    if (newBall) {

      newBall = false
      partical = new Particle(b_.position.x, b_.position.y, 15)
      let p = P / 14137;
      console.log(p)
      let m = physics.getMformP(p,15)
      partical.mass = m
      console.log(m)
      partical.setColor(0)
      v.normalis()
      v.mult(speed)


      physics.applyForce(partical, v)
      engine.addMoverObject(partical)

    }

  }
  physics.springK = k / 100
  engine.physics.gravity.y = g / 100
  engine.physics.frictionAir = frictionAir / 100000

  background(255)
  engine.run()



  physics.springUpdate(s_)
  physics.update(b_)
  s_.display()
  a_.display()
  b_.display()
  b_.drag(mouseX, mouseY)


}


function mousePressed() {
  let x = b_.position.x
  let y = b_.position.y
  let r = b_.radius


  if (collidePointCircle(mouseX, mouseY, x, y, r)) {
    b_.clicked(mouseX, mouseY)
  }




}


function mouseReleased() {



  b_.stopDragging()
  if (collidePointCircle(mouseX, mouseY, b_.position.x, b_.position.y, b_.radius + 20)) {
    newBall = true
    v = a_.position.get()
    v.sub(b_.position)
    let len = v.getLength()
    speed = physics.getVmaxforSpring(b_.mass, len)
  }


}

function keyPressed() {
  if (keyCode === ENTER) {
    engine.myObj =[];
    reset()
    console.log(7)
  }
}


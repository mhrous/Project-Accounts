let physics
let len = 260;
let a_;
let b_;
let s_ ;
let vMax = 0;
let aMax = 0;
let xMax = 0;

let pm = 0
let pk = 1

var k =1;
var damping =1;
var f = 0.0;


let gui;

let velocity = []
let position = []
let acceleration=[]

function setup() {
 
  createCanvas(innerWidth, innerHeight);
  gui = createGui('p5.gui');

  sliderRange(.5, 1, .01);
  gui.addGlobals('damping');
  sliderRange(1,50,1);
  gui.addGlobals('k');
  sliderRange(.01, .5, 0.01);
  gui.addGlobals('f');


  physics = new Physics()
  a_ = new Particle(900, 100, 5)
  b_ = new Particle(900, 100 + len, 25)
  s_ = new Spring(a_, b_, len)
  a_.constantBody = b_.showAllwes= true
  b_.isSpringBall = a_.isSpringBall = true

}

function draw() {
  if(pm  != f || pk!=k ){
    if (f!=0){
    pm = f 
    pk = k
      physics.springK = k / 1000
      xMax = physics.getXmaxforSpring(f *0.25);
      vMax = physics.getVmaxforSpring(f,xMax);
      aMax = physics.getAmaxforSpring(f,xMax) 
    b_.position.y = xMax + 100 + len;
    b_.mass=f;

    }


  }

 

  physics.damping = damping
  
  background(0)
  stroke(255, 255, 255);
  line(800,100+len,1000,100+len)
  line (200,100,200,100 +2*len)
  line(200,100+len,600,100+len)
  physics.springUpdate(s_)
  physics.update(b_)
  s_.display()

  a_.display()
  b_.display()
  v = b_.velocity.y
  y = b_.position.y
  a = physics.getAccelerationforSpring(b_,y-360)
 
  velocity.push(v)
  position.push(y)
  acceleration.push(a)
  if (position.length > 200){
    position.shift()
  }
  if (acceleration.length > 200) {
    acceleration.shift()
  }
  if (velocity.length > 200) {
    velocity.shift()
  }
  fill(255,0,0)
  rect(200,25,30,20,5)
  stroke(255,0,0)
  strokeWeight(2.5);
  for (let i = 0; i < 200 -1&& i < velocity.length  -1;i++){
    line(200 + 2 * i, 100 + len + velocity[i] * (xMax / vMax), 200 + 2 * (i + 1), 100 + len + velocity[i + 1] * (xMax / vMax))

  }
  noStroke()

  text('velocity : ' + velocity[velocity.length -1], 250, 30, 400, 20);
  text('vMax : ' +vMax , 750, 30, 400, 20);


  fill(0, 255, 0)
  rect(200, 65, 30, 20,5)
  stroke(0, 255, 0)

  for (let i = 0; i < 200 -1 && i < acceleration.length -1; i++) {
    line(200 + 2 * i, 100 + len + acceleration[i] * (xMax / aMax), 200 + 2 * (i + 1), 100 + len + acceleration[i + 1] * (xMax / aMax))

  }
  noStroke()

  text('acceleration : ' + acceleration[acceleration.length -1], 250, 70, 400, 20);
  text('aMax : ' + aMax, 750, 70, 400, 20);

  fill(0, 0, 255)
  rect(200, 105, 30, 20,5)
  stroke(0, 0, 255)

  for (let i = 0; i < 200 -1&& i < position.length-1; i++) {
    line(200 + 2 * i,  position[i], 200 + 2 * (i + 1),  position[i + 1] )

  }
  noStroke()
  text('position : ' + (position[position.length - 1]-360), 250, 110, 400, 20);
  text('xMax : ' + xMax, 750, 110, 400, 20);



}




 




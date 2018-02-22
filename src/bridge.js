/**
 * جسم مطاطي 
 * حيث تم تمثيل المطاطة بمجموعة من الكتل تربط بينها نوابض مرنة
 * 
 * @class Brideg
 */
class Brideg {
  /**
   * Creates an instance of Brideg.
   * @memberof Brideg
   */
  constructor() {
    
    /** @type {number} */
    this.width = Math.floor(innerWidth / 2.5)
    
    /** @type {number} */
    this.translateX = Math.floor((innerWidth - this.width) / 2)
    
    /** @type {number} */
    this.translateY = 450
   
    /** @type {number} */
    this.cols = 3
    
    /** @type {Array} */
    this.spring = [];
    
    /** @type {Array} */
    this.boll = [];
   
    /** @type {number} */
    this.len = 0.5;
  }

  /**
   * لبناء الجسم المطاطي بالموقع المناسب والمواصفات المناسبة
   * 
   * @memberof Brideg
   */
  build() {
    const spacing = this.width / (this.cols - 1)

    for (let i = 0; i < this.cols; i++) {
      let x = i * spacing + this.translateX;
      const particle = new Particle(x, this.translateY)
      particle.setColor(220)
      particle.radius = 5
      particle.mass =5
      particle.isSpringBall = true
      this.boll.push(particle)
    }
    this.boll[0].constantBody = this.boll[this.cols - 1].constantBody = true
    this.boll[0].radius = this.boll[this.cols - 1].radius = 8
    this.boll[0].setColor(0, 255, 0)
    this.boll[this.cols - 1].setColor(0, 255, 0)


    for (let i = 1; i < this.cols; i += 1) {
      this.spring.push(new Spring(this.boll[i - 1], this.boll[i], this.len))
    }
  }
}

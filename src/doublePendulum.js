
/**
 * نواسين بسيطن مرتبطين مع بعض 
 * حيث نهاية النواس الاول هي بداية النواس الثاني
 * 
 * @class DoublePendulum
 */
class DoublePendulum {
  /**
   * Creates an instance of DoublePendulum.
   * @param {number} r1 طول النواس الاول
   * @param {number} r2 طول النواس الثاني
   * @param {number} m1 كتلة النواس الاول
   * @param {numbe} m2 كتلة النواس الثاني
   * @memberof DoublePendulum
   */
  constructor(r1, r2, m1, m2) {
   
    /** @type {number} */
    this.r1 = r1;
   
    /** @type {number} */
    this.r2 = r2;
    
    /** @type {number} */
    this.m1 = m1;
    
    /** @type {number} */
    this.m2 = m2;
  
    /** @type {number} */
    this.translateX = innerWidth / 2;
   
    /** @type {number} */
    this.translateY = 320;
    
    /** @type {number} */
    this.a1 = Math.PI;
  
    /** @type {number} */
    this.a2 = Math.PI;
    
    /** @type {number} */
    this.a1_v = 0;
    
    /** @type {number} */
    this.a2_v = 0;
    
    /** @type {number} */
    this.a1_a = 0;
    
    /** @type {number} */
    this.a2_a = 0;
    
    /** @type {Object} */
    this.heade = new Particle(this.translateX, this.translateY, 3)
    
    /** @type {Object} */
    this.ball_1 = new Particle(0, 0, 15)
    
    /** @type {Object} */
    this.ball_2 = new Particle(0, 0, 15)
    
    this.heade.setColor(0)
    this.ball_1.setColor(160)
    this.ball_2.setColor(160)
  }


  /**
   * لرسم الشكل
   * 
   * @memberof DoublePendulum
   */
  display() {

    strokeWeight(2);
    line(this.translateX, this.translateY, this.ball_1.position.x, this.ball_1.position.y)
    line(this.ball_1.position.x, this.ball_1.position.y, this.ball_2.position.x, this.ball_2.position.y)
    this.heade.display()
    this.ball_1.display()
    this.ball_2.display()

  }
}
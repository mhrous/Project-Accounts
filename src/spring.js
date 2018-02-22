/**
 * النواس البسيط 
 * </br> 
 * حيث تم تمثيل النواس البسيط على شكل جسمين يربط يبنهما نابض
 * 
 * @class Spring
 */
class Spring {

  /**
   * @param {Object} a_ الجسم الاول 
   * @param {Object} b_ الجسم الثاني
   * @param {number} l طول النواس
   * @memberof Spring
   */
  constructor(a_, b_, l) {

    a_.isSpringBall = b_.isSpringBall = true
    /** @type {number} */

    this.len = l;
    /** @type {Object} */

    this.a = a_;
    /** @type {Object} */

    this.b = b_;

  }




  /**
   * لرسم النواس
   * 
   * @memberof Spring
   */
  display() {
    strokeWeight(10);
    stroke(75);
    line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
    noStroke()
  }

}
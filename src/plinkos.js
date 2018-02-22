/**
 * جدار من الكرات لتغير اتجاه الكرات الساقطة.
 * </br>
 * 
 * ملاحظة 
 * لو كان سقوط الكرات في مركز الجدار لذهبت نصف الكرات الى اليمين والنصف الاخر الى اليسار
 * 
 * @class Plinkos
 */
class Plinkos {
  /**
   * لبناء الجدار بحجم معين وموقع معين
   * @memberof Plinkos
   */
  constructor() {
    /** @type {number} */

    this.cols = 7
    /** @type {number} */

    this.rows = 3
    /** @type {number} */
    this.radius = 15
    /** @type {number} */
    this.width = Math.floor(innerWidth / 2.5)
    /** @type {number} */
    this.height = Math.floor((this.rows / this.cols) * this.width)
    /** @type {ِAraay} */

    this.myPlinko = []
    /** @type {number} */

    this.translateX = Math.floor((innerWidth - this.width) / 2)
    /** @type {number} */

    this.translateY = 150


  }
  /**
   * لبناء الجدار .
   * يحدد مواقع الكرات بشكل يحقق التناظر
   * 
   * @memberof Plinkos
   */
  build() {
    const spacing = this.width / this.cols
    for (let j = 0; j < this.rows; j += 1) {
      for (let i = 0; i < this.cols + Math.floor(j % 2); i += 1) {
        let x = i * spacing
        if (j % 2 === 0) {
          x += spacing / 2
        }
        let y = j * (spacing / 1.2)
        x += this.translateX
        y += this.translateY
        const particle = new Particle(x, y)
        particle.radius = this.radius
        particle.setColor(random(80, 175))
        particle.constantBody = true

        this.myPlinko.push(particle)
      }
    }
  }


  /**
   * لرسم الجدار
   * 
   * @memberof Plinkos
   */
  display() {
    for (let i = this.myPlinko.length - 1; i >= 0; i -= 1) {
      this.myPlinko[i].display()
    }
  }
}

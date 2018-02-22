/**
 * الاجسام في المشروع .
 
 * حيث تم تمثيل اغلب الاجسام على شكل كرات
 * 
 * @class Particle
 */
class Particle {
  /**
   * Creates an instance of Particle.
   * @param {number} x x موقع مركز الدائرة على المحور
   * @param {number} y y موقع مركز الدائرة على المحور
   * @param {number} [radius=10]  نصف قطر الدائرة
   * @memberof Particle
   */
  constructor(x, y, radius = 10) {
  
    /** @type {Object} */
    this.velocity = new Vector(0, 0)
    
    /** @type {Object} */
    this.position = new Vector(x, y)
    
    /** @type {Object} */
    this.dragOffset = new Vector(0, 0);
    
    /** @type {boolean} */
    this.dragging = false;
    
    /** @type {Object} */
    this.acceleration = new Vector(0, 0)
    
    /** @type {number} */
    this.angle = 0;
    
    /** @type {number} */
    this.mass = 1
    
    /** @type {number} */
    this.radius = radius
    
    /** @type {number} */
    this.P = 1
    
    /** @type {number} */
    this.retention = .9
    
    /** @type {Object} */
    this.color = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    }
    
    /** @type {boolean} */
    this.showAllwes = false
  
    /** @type {boolean} */
    this.constantBody = false;
   
    /** @type {boolean} */
    this.withLine = false
    
    /** @type {boolean} */
    this.isSpringBall = false
   
    /** @type {boolean} */
    this.show = true;   
  }

  /**
   * لتغير لون الجسم.
   
   * RGB حيث تم الاعتماد على اللوان بالشكل 
   * 
   * @param {number} red مستوى لون الاحمر بالاجسم
   * @param {number} [green=-1]  مستوى لون الاخصر في الجسم
   * @param {number} [blue=-1] مستوى لون الازرق للجسم
   * @memberof Particle
   */
  setColor(red, green = -1, blue = -1) {
    if (green === -1 || blue === -1) {
      this.color = {
        r: red,
        g: red,
        b: red
      }
    }
    else {
      this.color = {
        r: red,
        g: green,
        b: blue
      }
    }
  }





  /**
   * لرسم الجسم
   * 
   * @memberof Particle
   */
  display() {
    this.angle += 2 * (this.velocity.x / (2 * this.radius * Math.PI)) * Math.PI;
    if (this.show) {
      push()
      translate(this.position.x, this.position.y)
      rotate(this.angle);
      fill(this.color.r, this.color.g, this.color.b)
      if (this.isSpringBall && !this.constantBody) {
        fill(175);
      }
      if (this.isSpringBall && this.dragging && !this.constantBody) {
        fill(50);
      }

      ellipse(0, 0, 2 * this.radius)
      if (this.withLine) {
        stroke(80, 255, 80)
        strokeWeight(5)
        line(0, -1 * this.radius + 3, 0, this.radius - 3)
        strokeWeight(1)
      }
      pop()
    }
  }
  /**
   * للتاكد من حال الضغط على الجسم.
   * 
   * 
   * @param {number} mx x موقع موشر القارة على المحور 
   * @param {number} my y موقع موشر القارة على المحور
   * @returns {Object} الجسم الحالي في حال الضغط عليه او كائن فارغ
   * @memberof Particle
   */
  isClicked(mx, my) {
    const d = dist(mx, my, this.position.x, this.position.y);
    if (d <= this.radius) {
      return this
    } else {
      return undefined
    }
  }
  /**
   * لحساب المساحة بين موقع الفارة وموقع الجسم .
   
   * قمنا بتخزين المساحة ضمن متغير للاستعمال هذا المتغير للتحديد الموقع الجديد للجسم
   * 
   * @param {number} mx x موقع موشر القارة على المحور
   * @param {number} my y موقع موشر القارة على المحور
   * @memberof Particle
   */
  clicked(mx, my) {
    if (this.isSpringBall && !this.showAllwes) {
      this.show = false
    }
    const d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.radius) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  /**
   * لايقاف عملية تحريك الجسم
   * 
   * @memberof Particle
   */
  stopDragging() {
    this.dragging = false;
    this.show = true

  }

  /**
   * لتحريك الجسم لمكان وجود الفارة
   * 
   * @param {any} mx 
   * @param {any} my 
   * @memberof Particle
   */
  drag(mx, my) {
    if (this.dragging && !this.constantBody) {
      this.position.x = mx + 2 * this.dragOffset.x;
      this.position.y = my + 2 * this.dragOffset.y;
      this.velocity.x = 0
      this.velocity.y = 0
     

    }
  }


}

/**
 * في حال وجود عدد كبير من الاجسام كنا بحاجة الى من يقوم بتنظيم عملية تنفيذ القوانين الفيزيائية بين الاجسام 
 */
class Engine {
  /**
   * Creates an instance of Engine.
   * @memberof Engine
   */
  constructor() {

    /** @type {Array} */
    this.myObj = []

    /** @type {Array} */
    this.spring = [];

    /** @type {Object} */
    this.physics = new Physics;

    /** @type {Array} */
    this.springBall = []

    /** @type {Array} */
    this.react = []

  }
  /**
   * لاضافة مطاطة الى المحرك.
   * حسث نقوم باضافة كامل الجسام التي تتالف منها (نوابض وكرات
   * 
   * @param {Object} bridge جسم مطاطي مولف من كراب يربط بينها نوابض مرنة
   * @memberof Engine
   */
  addBrideg(bridge) {
    this.spring = [...this.spring, ...bridge.spring];
    this.myObj = [...this.myObj, ...bridge.boll];
    this.springBall = [...this.springBall, ...bridge.boll]
  }

  /**
   * 
   * لاضافة جدار من الكرات الى المحرك
   * @param {Object} p جدار من الكرات
   * @memberof Engine
   */
  addPlinkos(p) {
    this.myObj = [...this.myObj, ...p.myPlinko]
  }

  /**
   * 
   * لاضافة نابض مرن الى المحرك
   * @param {Object} obj نابض مرن يربط بين جسمين
   * @memberof Engine
   */
  addSpring(obj) {
    this.spring.push(obj)
  }

  /**
   * لاضافة جدار على شكل مستطيل الى المحرك.
   * 
   * @param {Object} obj مستطيل
   * @memberof Engine
   */
  addReact(obj) {
    this.react.push(obj)
  }



  /**
   * لقيام بعملية التصادم بين جميع الاجسام
   * 
   * @memberof Engine
   */
  applyCollisionWithObj() {
    for (let i = this.myObj.length - 1; i >= 0; i -= 1) {
      for (let j = this.myObj.length - 1; j >= 0; j -= 1) {
        if (i === j) {
          continue
        }
        let x1 = this.myObj[i].position.x
        let y1 = this.myObj[i].position.y
        let r1 = this.myObj[i].radius
        let x2 = this.myObj[j].position.x
        let y2 = this.myObj[j].position.y
        let r2 = this.myObj[j].radius
        if (collideCircleCircle(x1, y1, r1, x2, y2, r2)) {
          if (!this.myObj[i].constantBody) {
            this.physics.applyCollision(this.myObj[i], this.myObj[j])
          }
        }
      }
    }
  }

  applyCollisionBridge() {
    for (let i = this.spring.length - 1; i >= 0; i -= 1) {
      for (let j = this.myObj.length - 1; j >= 0; j -= 1) {
        this.physics.applyCollisionBridge(this.spring[i],this.myObj[j])
      }
    }

  }


  /**
   * 
   * 
   * @param {any} force 
   * @param {boolean} [withMass=true] 
   * @memberof Engine
   */
  /**
   * لتطبيق قوة معينة على جميع الاجسام
   * 
   * @param {Object} force متجه يعبر عن القوة
   * @param {boolean} [withMass=true] متغير بولياني للدالة على تعلق القوة بالكتلة
   * @memberof Engine
   */
  applyForce(force, withMass = true) {
    for (let i = this.myObj.length - 1; i >= 0; i -= 1) {
      if (!this.myObj[i].constantBody && !this.myObj[i].isSpringBall) {
        if (withMass) {
          this.physics.applyForce(this.myObj[i], force)
        }
        else {
          this.physics.applyForce(this.myObj[i], force, false)
        }
      }
    }
  }

  /**
   * لتطبيق مقاومة الهواء على جميع الاجسام
   * 
   * @memberof Engine
   */
  applyFrictionAir() {
    for (let i = this.myObj.length - 1; i >= 0; i -= 1) {
      if (!this.myObj[i].constantBody) {
        this.physics.applyFrictionAir(this.myObj[i])
      }
    }
  }

  /**
   * لتطبيق الجاذبية الارضية ومقاومة الهواء والتصادمات على جميع الاجسام
   * 
   * @memberof Engine
   */
  update() {
    this.applyForce(this.physics.gravity, false)
    this.applyFrictionAir()
    this.applyCollisionWithObj()
    this.applyCollisionBridge()
  }

  /**
   * لتطبيق كافة القوى الفيزيائية على جميع الاجسام مع رسم الاجسام\
   * 
   * @memberof Engine
   */
  run() {
    for (let i = this.spring.length - 1; i >= 0; i -= 1) {
      this.physics.springUpdate(this.spring[i])
      this.spring[i].display()
    }
    for (let i = this.myObj.length - 1; i >= 0; i -= 1) {
      this.physics.EffectOnWall(this.myObj[i])
      this.physics.update(this.myObj[i])
      this.myObj[i].drag(mouseX, mouseY);
      this.myObj[i].display()

    }


    this.update()

  }

  /**
   * لاضافة جسم متحرك الى المحرك
   * 
   * @param {any} obj 
   * @memberof Engine
   */
  addMoverObject(obj) {
    obj.withLine = true;
    this.myObj.push(obj)
  }

  /**
   * 
   * للتاكد من الضغط على جسم معين داخل المحرك
   * @param {number} mx x موقع موشر الفارة على المحور 
   * @param {number} my y موقع موشر الفارة على المحور
   * @returns {Object} في حال الضغط على جسم يرد الجسم المضغوط عليه او يرد كائن فارغ
   * @memberof Engine
   */
  isClicked(mx, my) {
    for (let i = this.myObj.length - 1; i >= 0; i -= 1) {
      let obj = this.myObj[i].isClicked(mx, my)
      if (obj) {
        return obj
      }
    }
    return undefined
  }

  /**
   * للقيام بعملية معينة على الاجشام عند رفع اليد عن زر الفارة
   * 
   * @memberof Engine
   */
  released() {

    for (let i = this.myObj.length - 1; i >= 0; i -= 1) {
      this.myObj[i].stopDragging()
    }
  }
}



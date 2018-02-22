/**
 * يحتوي على جميع العلاقات القوانين الفيزيائية التي تم بناء المشروع على اساسها
 */
class Physics {
  /** 
   * لاعطاء قيم لجميع الثوابت الفيزيائية 
  */
  constructor() {
   
    /** @type {Object} */
    this.gravity = new Vector(0, 0.25)
   
    /** @type {number} */
    this.retention = 0.8
   
    /** @type {number} */
    this.damping = .95

    /** @type {number} */
    this.dampingDoublePendulum = 1
   
    /** @type {number} */
    this.springK = 0.8
   
    /** @type {number} */
    this.frictionAir = 0.00001
  }

  /** 
   * لتطبيق قوة على جسم معين .
   * </br>
   * نعلم ان القوة توثر على حركة الاجسام 
   *ولحساب تاثير قوة على جسم ما لجئنا الى استخدم قوانين تيوتن للحركة 
   * </br>
   * حيث ينص قانون نيوتن الثاني 
   * </br>
   * إذا أثرت قوة على جسم ما فإنها تكسبه تسارعاً ، يتناسب طردياً مع قوته وعكسياً مع كتلته
   * </br>
   * </br>
   * العلاقة الرياضية لقانون نيوتن الثاني
   * </br>
   * F = m * a
   * <ul>
   * <li>
   * F : محصلة القوى
   * </li>
   * <li>
   * m : كتلة الجسم
   * </li>
   * <li>
   * a : تسارع الجسم 
   * </li>
   * </ul>
   * </br>
   * </br>
   * ومن هذه العلاقة نجد ان 
   * </br>
   * a = F / m
   * </br>
   *  حيث من تسارع الجسم نستطيع حساب سرعة الجسم الجديدة 
   *  ومن السرعة نستطيع معرفة موقع الجسم الجديد
   * @param {Object} body الجسم المراد تطبيق القوة عليه
   * @param {Object} force  متجه يعبر عن القوة المراد تطبيقها
   * @param {Boolean} withMass  بعض القوى لا تتعلق بالكتلة متل الجاذبية الارضية لذا احتجنا متغبر بولياني لتميز هذه القوة عند تطبيق العلاقة الفيزيائية
  */
  applyForce(body, force, withMass = true) {
    let f = force.get()
    if (withMass) {
      f.div(body.mass)
    }
    body.acceleration.add(f)
  }

  /**
   * تطبيق قوانين الحركة على جسم ما. 
   * </br>
   * لدينا قانونين رئيسيين للحركة 
   * </br>
   * <ul>
   * <li>
   * سرعة الجديدة للجسم تساوي السرعة السابقة زائد التسارع
   * </br>
   * V = v + a
   * </li>
   * <li>
   * موقع الجسم الجديد تساوي الموقع السابق زائد السرعة 
   * </br>
   * X = x + v
   * </li>
   * </ul>
   * لم نقوم باستخدام الزمن لاننا استخدمنا السرعة السابقة عوضا عن الابدائية والموقع السابق عوضا عن الابتدائي
   * 
   * @param {Object} body 
   * @memberof Physics
   */
  update(body) {
    body.acceleration.x = constrain(body.acceleration.x, -300, 300);
    body.acceleration.y = constrain(body.acceleration.y, -300, 300);
    body.velocity.add(body.acceleration)
    if (body.isSpringBall) {
      body.velocity.mult(this.damping)
    }
    body.position.add(body.velocity)
    body.acceleration.mult(0)
  }

  /**
   * لحساب سرعة الجسم بعد تصادمه مع جسم اخر.
   * </br>
   * اعتمادنا في حساب السرعة بعد التصادم على قانونين رئيسيين 
   * </br>
   * </br>
   * مصونية كمية الحركة 
   *الذي ينص على ان كمية الحركة قبل التصادم تساوي كمية الحركة بعد التصادم
   * </br>
   * m1 * v1  + m2 * v2 = m1 * v1' + m2 * v2'
   *</br>
   * </br>
   * مصونية الطاقة الحركية
   *الذي ينص على ان الطاقة الحركية قبل التصادم تساوي الطاقة الحركية بعد التصادم 
   * </br>
   * (m1 * v1^2)/2  + (m2 * v2^2)/2 = (m1 * v1'^2)/2 + (m2 * v2'^2)/2
   * </br>
   * </br>
   *  
   * بعد حل المعادلتين نجد ان السرع بعد التصادم تعطى بلعلاقات
   *<ul>
   * <li>
   * v1' =(v1(m1 - m2) + 2*m2v2)/(m1 + m2)
   * </li>
   * <li>
   * v2' =(v2(m2 - m1) + 2*m1v2)/(m1 + m2)
   * </li>
   * </ul>
   * </br>
   * <ul>
   * <li>
   * m1 : كتلة الجسم الاول
   * </li>
   * <li>
   * m2 : كتلة الجسم الثاني
   * </li>
   * <li>
   * v1 : سرعة الجسم الاول قبل التصادم
   * </li>
   * <li>
   * v2 : سرعة الجسم الثاني قبل التصادم
   * </li>
   * <li>
   * v1' : سرعة الجسم الاول بعد التصادم
   * </li>
   * <li>
   * v2' : سرعة الجسم الثاني بعد التصادم
   * </li>
   * </ul>

   * @param {Object} bodyA الحسم المراد حساب سرعته بعد التصادم
   * @param {Object} bodyB الجسم المتصادم معه
   * @return {number} سرعة الجسم بعد التصادم
   */
  SpeedAfterCollision(bodyA, bodyB) {
    let speedA = bodyA.velocity.getLength()
    let speedB = bodyB.velocity.getLength()
    let massA = bodyA.mass
    let massB = bodyB.mass
    let speed = ((speedA * (massA - massB)) + (2 * speedB * massB)) / (massB + massA)
    return speed
  }

  /**
   * لتطبيق تصادم الجسمين معا.
   * </br>
   * عند تصادم جسمين تتغير سرعة كل من الجسمين واتجاه حركتها
   * </br>
   * اتجاه الحركة لجسم ما بعد التصادم تكون من مركز الجسم المتصادم معه الى مركز الجسم 
   * </br> 
   *  شدة الحركة يتم حسابها عن طريق علاقتي 
   * <ul>
   * <li>
   * مصونية الطاقة الحركية 
   * </li>
   * <li>
   * مصونية كمية الحركة
   * </li>
   * </ul>
   * @param {any} bodyA 
   * @param {any} bodyB 
   * @memberof Physics
   */
  applyCollision(bodyA, bodyB) {
    var l = 1
    if(bodyA.isSpringBall && bodyB.isSpringBall){
      return ;
    }

    const g = this.gravity.getLength()
    const v = bodyA.position.get()
    let speed = this.SpeedAfterCollision(bodyA,bodyB)
    if (bodyB.velocity.getLength()<1){
      speed = bodyA.velocity.getLength();
    }
    v.sub(bodyB.position)
    v.normalis();
    const x = v.get();
    const angle = x.getAngle()
    x.mult(g)

    this.applyForce(bodyA,x,false)
    v.mult(speed * this.retention *l)
    bodyA.velocity = v
  }

  applyCollisionBridge(bridge,body){
    let g = this.gravity.getLength()
    let mover;
    if (bridge.a.constantBody){
      mover = bridge.b
    } else {
      mover = bridge.a
    }
    let x1 = bridge.a.position.x
    let y1 = bridge.a.position.y
    let x2 = bridge.b.position.x
    let y2 = bridge.b.position.y
    let cx = body.position.x
    let cy = body.position.y
    let r = body.radius
    var bool = false 
    for(let i = 0;i<5;i++){
      bool = bool || collideLineCircle(x1, y1 -i, x2, y2 -i, cx, cy, r)
    }
    if (bool) {
      if (!body.isSpringBall&&!body.constantBody) {
        const v = body.position.get()
        v.sub(getClosestPointFromCircleToLine(x1, y1, x2, y2, cx, cy, r))
        v.normalis();
        let speed = this.SpeedAfterCollision(body, mover)
        if (mover.velocity.getLength() < 0.1) {
          speed = body.velocity.getLength();
        }
        if (mover.velocity.getLength()>1){
          console.log(1)
        }
        const x = v.get();
        x.mult(g)
        this.applyForce(body, x, false)
        v.mult(speed * this.retention)
        if(v.y>0){v.y *= -1}
        body.velocity = v


      }
    }
  }

  /**
   * تطبيق التصادم مع الجدران للجسم معين .
   * </br>
   * حيث الهدف من الدالة تغير اتجاه حركة جسم مع تطبيق تخامد معين
   * @param {Object} obj 
   * @memberof Physics
  */
  EffectOnWall(obj) {
    if (obj.position.y > (innerHeight - obj.radius) && obj.velocity.y > 0) {
      obj.position.y = innerHeight - obj.radius
      obj.velocity.y *= (-1 * this.retention)
    } else if ( obj.position.y < 0 && obj.velocity.y <0){
      obj.position.y =  obj.radius
      obj.velocity.y *= (-1 * this.retention)
    }

    if (obj.position.x > (innerWidth - obj.radius) && obj.velocity.x > 0) {
      obj.velocity.x *= (-1 * this.retention)
      obj.position.x = innerWidth - obj.radius
    }
    else if (obj.position.x < obj.radius && obj.velocity.x < 0) {
      obj.velocity.x *= (-1 * this.retention)
      obj.position.x = obj.radius
    }
  }

  /**
   * تطبيق مقاومة الهواء على جسم معين .
   * </br>
   * حيث ينص قانون مقاومة الهواء 
   * </br>
   * Fr = Const \* S \* Speed^2
   * </br>
   *  حيث اعتبرنا ان الثابت متعلق بالكتلة الحجمية للهواء و شكل الجسم والكثافة الحجمية للجسم
   * <ul>
   * <li>
   * Fr : مقاومة الهواء
   * </li>
   * <li>
   * S : مساحة سطح الجسم 
   * </li>
   * <li>
   * Speed : سرعة الجسم
   * </li>
   * </ul>
   * ملاحظة اتجاه قوة مقاومة الهواء معاكس لاتجاه الحركة
   * @param {Object} body الجسم المراد تطبيق مقاومة الهواء عليه
   */
  applyFrictionAir(body) {
    let f = body.velocity.get()
    f.normalis()
    const speed = body.velocity.getLength()
    const k = this.frictionAir * body.P
    f.mult(-1 * k * Math.pow(body.radius, 2) * speed * speed)
    this.applyForce(body, f)
  }

  /**
   * قوة شد النابض .
   * </br>
   * F = kx
   * <ul>
   * <li>
   * F : قوة شد النابض
   * </li>
   * <li>
   * k : ثابت صلابة النابض
   * </li>
   * <li>
   * x : مقدار الازاحة
   * </li>
   * </ul>
   * ملاحظة جهة الحركة 
   * من مركز الجسم الى مركز النابض
   * @param {Object} spring عبارة عن جسمين يربط بينهما نواس مرن ويوثر عليهما بقوى متعاكسة بالجهة
   */
  springUpdate(spring) {
    let force = spring.a.position.get();
    force.sub(spring.b.position.get());
    const d = force.getLength();
    const stretch = d - spring.len;
    force.normalis()
    force.mult(-1 * this.springK * stretch);
    if (!spring.a.constantBody) {
      this.applyForce(spring.a, force);
    }
    force.mult(-1)
    if (!spring.b.constantBody) {
      this.applyForce(spring.b, force);
    }
  }

  /**
   * لحساب تسارع جسم متعلق بنابض مرن .
   * </br>
   * حيث طبقنا القانون 
   * </br>
   * a = (-kx)/m
   * <ul>
   * <li>
   * a : تسارع الجسم
   * </li>
   * <li>
   * k : ثابت صلابة النابض
   * </li>
   * <li>
   * x : مقدار الازاحة
   * </li>
   * <li>
   * m : كتلة الجسم
   * </li>
   * </ul>
   * @param {Object} obj 
   * @param {number} pos
   * @returns تسارع الحسم
   */
  getAccelerationforSpring(obj, pos) {
    return (-this.springK * pos) / obj.mass

  }

  /**
   * حساب الاستطالة العظمى لنابض مرن.
   *</br>
   * العلاقة الرياضية 
   * </br>
   * x = mg/k
   * </br>
   * <ul>
   * <li>
   * x : مقدار استطالة العظمى للنابض النابض
   * </li>
   * <li>
   * m :  كتلة النابض
   * </li>
   * <li>
   * g : الجاذبية الارضية
   * </li>
   * <li>
   * k : ثابت صلابة النابض
   * </li>

   * @param {number} f الكتلة المعلقة بالنابض
   * @returns  {number} الاستطالة العظمى للنابض
   * @memberof Physics
   */

   getXmaxforSpring(f) {
    let g = this.gravity.getLength()
    return f / this.springK
  }

  /**
   * حساب السرعة العظمى لنابض مرن.
   *</br>
   * العلاقة الرياضية 
   * </br>
   * <ul>
   * <li>
   * Wo = sqrt(k / m)
   * </li>
   * <li>
   * vMax = xMax \* Wo
   * </li>
   * </br>
   * <li>
   * vMax :  السرعة العظمى للنابض
   * </li>
   * <li>
   * xMax :  الاستطالة العظمى للنابض
   * </li>
   * <li>
   * Wo :تواتر النابض   
   * </li>
   * <li>
   * k : ثابت صلابة النابض
   * </li>

   * @param {number} m الكتلة المعلقة بالنابض
   * @param {number} Xmax الكتلة المعلقة بالنابض

   * @returns  {number} السرعة العظمى للنابض
   * @memberof Physics
   */

  getVmaxforSpring(m,Xmax) {
    if (m == 0) return 0
    let w0 = Math.sqrt((this.springK / m))

    return Xmax * w0
  }

  /**
   * حساب التسارع الاعظمي لنابض مرن.
   *</br>
   * العلاقات الرياضية 
   * </br>
   * <ul>
   * <li>
   * Wo = sqrt(k / m)
   * </li>
   * <li>
   * aMax = xMax \* Wo^2
   * </li>
   * </ul>
   * </br>
   * <ul>
   * <li>
   * aMax :  التسارع العظمى للنابض
   * </li>
   * <li>
   * xMax :  الاستطالة العظمى للنابض
   * </li> 
   * <li>
   * Wo :تواتر النابض   
   * </li>
   * <li>
   * k : ثابت صلابة النابض
   * </li>
   * </ul>

   * @param {number} m الكتلة المعلقة بالنابض
   * @param {number} xMax الكتلة المعلقة بالنابض

   * @returns  {number} التسارع الاعظمي للنابض العظمى للنابض
   * @memberof Physics
  */

  getAmaxforSpring(m,xMax) {
    if (m == 0) return 0
    let w0 = Math.sqrt((this.springK / m))
    return xMax * w0 * w0
  }

  /**
   * الهدف من الدالة تحديد الموقع الجديد لكرات النابض اعتماد على طول النابض ومقدار زاوية الانحراف .
   * </br>
   * العلاقات الرياضية 
   * <ul>
   * <li>
   * x1 = r1 \* sin(a1)
   * </li>
   * <li>
   * y1 = r1 \* cos(a1)
   * </li>
   * <li>
   * x2 = r2 \* sin(a2)

   * </li>
   * <li>
   * y2 = r2 \* sin(a2)
   * </li>
   * </ul>

   * <ul>
   * <li>
   * x1 : موقع كرة النابض الاول على محاور x
   * </li>
   * <li>
   * y1 :  موقع كرة النابض الاول على المحور y
   * </li>
   * <li>
   * a1 : مقدار انحراف النابض الاول عن المحور الشاقولي
   * </li>
   * <li>
   * r1 : طول النابض الاول
   * </li>
   * <li>
   * x2 : موقع كرة النابض الثاني على محاور x
   * </li>
   * <li>
   * y2 :  موقع كرة النابض الثاني على المحور y
   * </li>
   * <li>
   * a2 : مقدار انحراف النابض الثاني عن المحور الشاقولي
   * </li>
   * <li>
   * r2 : طول النابض الثاني
   * </li>

   * </ul>
   * @param {Object} obj نواسين بسيطين مرتبطين ببعض حيث نهاية النواس الاول هي بداية النواس الثاني 
   * @memberof Physics
   */
  updateDoublePendulumPosition(obj) {
    let x1 = obj.r1 * sin(obj.a1) + obj.translateX
    let y1 = obj.r1 * cos(obj.a1) + obj.translateY
    let x2 = obj.r2 * sin(obj.a2) + x1
    let y2 = obj.r2 * cos(obj.a2) + y1
    obj.ball_1.position = new Vector(x1, y1)
    obj.ball_2.position = new Vector(x2, y2)
  }
  /**
    *  الهدف من الدالة تحديد التسارع الجديد لكرات النابض اعتماد على طول النابض ومقدار زاوية الانحراف وشدة الجاذبية .
    * @param {Object} obj نواسين بسيطين مرتبطين ببعض حيث نهاية النواس الاول هي بداية النواس الثاني 
    * @memberof Physics
    */
  updateDoublePendulumAcceleration(obj) {
    let g = this.gravity.getLength()
    let num1 = -g * (2 * obj.m1 + obj.m2) * sin(obj.a1);
    let num2 = -obj.m2 * g * sin(obj.a1 - 2 * obj.a2);
    let num3 = -2 * sin(obj.a1 - obj.a2) * obj.m2;
    let num4 = obj.a2_v * obj.a2_v * obj.r2 + obj.a1_v * obj.a1_v * obj.r1 * cos(obj.a1 - obj.a2);
    let den = obj.r1 * (2 * obj.m1 + obj.m2 - obj.m2 * cos(2 * obj.a1 - 2 * obj.a2));
    obj.a1_a = (num1 + num2 + num3 * num4) / den;
    num1 = 2 * sin(obj.a1 - obj.a2);
    num2 = (obj.a1_v * obj.a1_v * obj.r1 * (obj.m1 + obj.m2));
    num3 = g * (obj.m1 + obj.m2) * cos(obj.a1);
    num4 = obj.a2_v * obj.a2_v * obj.r2 * obj.m2 * cos(obj.a1 - obj.a2);
    den = obj.r2 * (2 * obj.m1 + obj.m2 - obj.m2 * cos(2 * obj.a1 - 2 * obj.a2));
    obj.a2_a = (num1 * (num2 + num3 + num4)) / den;


  }
  /**
   * الهدف من الدالة تغير السرعة والتسارع والموقع  لكرات النابض اعتماد على طول النابض ومقدار زاوية الانحراف .

   * 
   * @param {Object} obj نواسين بسيطين مرتبطين ببعض حيث نهاية النواس الاول هي بداية النواس الثاني
   * @memberof Physics
   */
  updateDoublePendulum(obj) {
    this.updateDoublePendulumAcceleration(obj)
    this.updateDoublePendulumPosition(obj)
    obj.a1_v += obj.a1_a;
    obj.a2_v += obj.a2_a;
    obj.a2_v *=  this.dampingDoublePendulum;
    obj.a1_v *= this.dampingDoublePendulum;

    obj.a1 += obj.a1_v;
    obj.a2 += obj.a2_v;
  }

  getMformP(p,r){
    return p * ((4/3)*Math.PI *r*r*r )
  }
  

 

}
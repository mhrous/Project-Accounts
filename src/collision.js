/**
 * لمعرفة تصادم كرة بشكل رباعي.
 * </br>
 * يجب ان نختبر وجود الكرة على الجوانب الاربعة للمستطيل
 * </br>
 * ملاحظة في الحاسب بشكل العام عند رسم مستطيل يكون يكون موضع المستطيل الزاوية العليا في جهة اليسار
 * 
 * @param {number} rx x موقع المستطيل على محور
 * @param {number} ry y موقع المستطيل على محور 
 * @param {number} rw عرض المستطيل
 * @param {number} rh طول المستطيل
 * @param {number} cx x موقع مركز الدائرة على المحور
 * @param {number} cy y موقع مركز الدائرة على المحور
 * @param {number} r نصف قطر الدائرة
 * @returns {boolean} متغير بولياني يدل على وجود تصادم او عدم وجود تصادم
 * @memberof Collision
 */
function collideRectCircle(rx, ry, rw, rh, cx, cy, r) {
  var testX = cx;
  var testY = cy;

  if (cx < rx) {
    testX = rx
  } else if (cx > rx + rw) { testX = rx + rw }

  if (cy < ry) {
    testY = ry
  } else if (cy > ry + rh) { testY = ry + rh }

  var distance = dist(cx, cy, testX, testY)

  if (distance <= r) {
    return true;
  }
  return false;
};
/**
 * لمعرفة تصادم بين كرتين.
 * </br>
 * لتاكد من وجود تصادم بين كرتين يكفي التاكد من  ان البعد بين مركزهما اقل من مجموع انصاف اقطارهم
 * 
 * @param {number} x x موقع مركز الدائرة الاولى على المحور
 * @param {number} y y موقع مركز الدائرة الاولى على المحور
 * @param {number} r نصف قطر الدائرة الاولى 
 * @param {number} x2 x موقع مركز الدائرة الثانية على المحور
 * @param {number} y2 y موقع مركز الدائرة الثانية على المحور
 * @param {number} r2 نصف قطر الدائرة الثانية
 * @returns {boolean} متغير بولياني يدل على وجود تصادم او عدم وجود تصادم
 * @memberof Collision
 */
function collideCircleCircle(x, y, r, x2, y2, r2) {

  if (dist(x, y, x2, y2) <= r + r2) {
    return true;
  }
  return false;
}
/**
 * للتاكد من وفوع نقطة داخل الدائرة.
 * </br>
 * لمعرفة وجود نقطة داخل الدائرة يجب عليا قياس المسافة بين النقطة ومركز الدائرة 
 * في حال كانت المسافة اقل اوتساوي نصف قطر الدائرة كانت النقطة تنتمي الى الدائرة
 * 
 * @param {number} x x موقع النقطة على المحور 
 * @param {number} y  y موقع النقطة على المحور 
 * @param {number} cx x موقع مركز الدائرة  على المحور
 * @param {number} cy x موقع مركز الدائرة  على المحور
 * @param {number} r نصف قطر الدائرة
 * @returns {boolean} متغير بولياني يدل على وجود تصادم او عدم وجود تصادم
 * @memberof Collision
 */
function collidePointCircle(x, y, cx, cy, r) {
  if (this.dist(x, y, cx, cy) <= r) {
    return true;
  }
  return false;
};

/**
 * لمعرفة انتماء نقطة الى مستقيم .
 * </br>
 * لتكون النقطة من ضمن مستقيم يجب ان يكون مجموع البعد بين بداية مستقيم والنقطة والبعد بين النقطة وتهاية مستقيم مساويا لطول المستقيم
 * 
 * 
 * @param {number} px x موقع النقطة على المحور
 * @param {number} py y موقع النقطة على المحور
 * @param {number} x1 x موقع نقطة البدابة مستقيم على المحور
 * @param {number} y1 y موقع نقطة البدابة مستقيم على المحور
 * @param {number} x2 x موقع نقطة النهاية مستقيم على المحور
 * @param {number} y2 y موقع نقطة النهاية مستقيم على المحور
 * @param {number} buffer رقم صغير جدا للمساعدة عند مقارنة الارقام العشرية

 * @returns {boolean} متغير بولياني يدل على وجود تصادم او عدم وجود تصادم
 * @memberof Collision
 */
function collidePointLine(px, py, x1, y1, x2, y2, buffer) {
  var d1 = this.dist(px, py, x1, y1);
  var d2 = this.dist(px, py, x2, y2);

  var lineLen = this.dist(x1, y1, x2, y2);

  if (buffer === undefined) { buffer = 0.1; }

  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}
/**
 * لمعرفة تصادم مستقيم مع دائرة .
 * @param {number} x1 x موقع نقطة البدابة مستقيم على المحور
 * @param {number} y1 y موقع نقطة البدابة مستقيم على المحور
 * @param {number} x2 x موقع نقطة النهاية مستقيم على المحور
 * @param {number} y2 y موقع نقطة النهاية مستقيم على المحور
 * @param {number} cx x موقع مركز الدائرة  على المحور
 * @param {number} cy x موقع مركز الدائرة  على المحور
 * @param {number} r نصف قطر الدائرة
 * @returns {boolean} متغير بولياني يدل على وجود تصادم او عدم وجود تصادم
 * @memberof Collision
 */
function collideLineCircle(x1, y1, x2, y2, cx, cy, r) {
  var inside1 = this.collidePointCircle(x1, y1, cx, cy, r);
  var inside2 = this.collidePointCircle(x2, y2, cx, cy, r);
  if (inside1 || inside2) return true;

  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = sqrt((distX * distX) + (distY * distY));

  var dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / this.pow(len, 2);

  var closestX = x1 + (dot * (x2 - x1));
  var closestY = y1 + (dot * (y2 - y1));

  var onSegment = this.collidePointLine(closestX, closestY, x1, y1, x2, y2);
  if (!onSegment) return false;

  distX = closestX - cx;
  distY = closestY - cy;
  var distance = this.sqrt((distX * distX) + (distY * distY));

  if (distance <= r) {
    return true;
  }
  return false;
}
/**
 *  للحصول على اقرب نقطة بين الدائرة ومستقيم.
 * </br>
 * نحنا بحاجة هذا النقطة لتحديد جهة الحركة بعد تصادم كرة مع مستقيم
 * @param {number} x1 x موقع نقطة البدابة مستقيم على المحور
 * @param {number} y1 y موقع نقطة البدابة مستقيم على المحور
 * @param {number} x2 x موقع نقطة النهاية مستقيم على المحور
 * @param {number} y2 y موقع نقطة النهاية مستقيم على المحور
 * @param {number} cx x موقع مركز الدائرة  على المحور
 * @param {number} cy x موقع مركز الدائرة  على المحور
 * @param {number} r نصف قطر الدائرة
 * @returns {Object} متجهة يعبر عن اقرب نقطة بين المستقيم والدائرة
 * @memberof Collision
 */
function getClosestPointFromCircleToLine(x1, y1, x2, y2, cx, cy, r) {
  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = sqrt((distX * distX) + (distY * distY));

  var dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / this.pow(len, 2);

  var closestX = x1 + (dot * (x2 - x1));
  var closestY = y1 + (dot * (y2 - y1));
  return new Vector(closestX, closestY)
}






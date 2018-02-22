/**
 * للمتجهات اهمية كبيرة عند محاكاة ايا قانون فيزيائي
 * </br>
 * حيث تم تمثيل ايا قوة على شكل متجه 
 * </br>
 * <ul>
 * <li>
 * شدة القوة : طويلة المتجه
 * </li>
 * <li>
 * اتجاه القوة : جهة المتجه
 * </li>
 * </ul>
*/

class Vector {
  /**
   * الباني الافتراضي 
   * </br>
   * 
   * يقوم ببناء متجه حسب البارميترات المدخلة  
   * </br>
   * في حال عدم ادخال برميترات يقوم ببناء متجه صفري
   * @param {number} x  الموقع على محور الاول
   * @param {number} y الموقع علة المحور الثاني
   */
  constructor(x = 0, y = 0) {
    /** @type {number} */
    this.x = x
    /** @type {number} */
    this.y = y


  }
  /**
   * تابع للحصول على نسخة من المتجه 
   * </br>
   * @return {Vector}  نسخة عن المتجه الاصلي
   */

  get() {
    return new Vector(this.x, this.y)
  }
  /**
   * لتغير قيمة المتجه
   * @param {number} x  الموقع الجديد على محور الاول
   * @param {number} y الموقع  الجديد على المحور الثاني
   */
  set(x, y) {
    this.x = x
    this.y = y
  }
  /**
   *  تعتبر هذه الدالة من اهم الدوال حيث تم استخدامها بشكل كبير عند الرغبة 
   * في الحصول على شدة قوة معينة لتطبيق علاقة فيزيايئة معينة
   * 
   * @return {number} طويلة متجه
   */
  getLength() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  /**
   * الهدف من هذه الدالة تغير شدة فوة معينة دون التائثير على الاتجاه
   * @param {number} length شدة القوة الجديدة
   */
  setLength(length) {
    this.normalis()
    this.mult(length)
  }
  /**
   * لحساب البعد بين متجهين
   * @param {Object} vector المتجه الجديد
   * @return {number} المسافة بين المتجه الاصلي والمتجه المدخل
   */
  distance(vector) {
    return Math.sqrt(Math.pow((this.x - vector.x), 2) + Math.pow((this.y - vector.y), 2))
  }
  /**
   * للحصول على جهة قوة معينة 
   * @return {number} جهة متجه بالرديان
   */
  getAngle() {
    return Math.atan2(this.y, this.x)
  }
  /**
   * لتغير جهة قوة معينة دون التاثير على شدتها
   * @param {number} angle الجهة الجديدة للمتجه بالرديان
   */
  setAngle(angle) {
    const length = this.getLength()
    this.x = Math.cos(angle)
    this.y = Math.sin(angle)
    this.mult(length)
  }
  /**
   * عند تطبيق ايا قونون فيزيائي لحساب قوة معينة نحتاج الى عنصرين رئيسين
   * </br>
   * <ul>
   * <li>جهة القوة الناتجة </li>
   * <li>شدة القوة الناتجة</li>
   * </ul>
   * </br>
   * حيث عند تطبيق ايا قانون فيزيائي قمنا بتحديد العتاصر التي توثر بالجهة 
   * واستحدمنا هذه الدالة للحصول علة متجهات واحدية (توثر بالجهة ولا تاثر بالشدة ) لجميع
   * القوة داخلة العلاقة الفيزيائية التي تحدد جهة المحصلة
   */
  normalis() {
    const length = this.getLength()
    if (length === 0) {
      return new Vector()
    }
    this.div(length)
  }
  /**
   * لاضافة قوة الى قوة معينة 
   * </br>
   * تم استخدامها عند جساب محصلة قوى
   * @param {Object} vector المتجه المراد جمعه
   */
  add(vector) {
    this.x += vector.x
    this.y += vector.y
  }
  /**
   *لطرح متجهين 
   * @param {Object} vector المتجه المراد طرحه
   */
  sub(vector) {
    this.x -= vector.x
    this.y -= vector.y
  }

  /**
   * لمضاعفة شدة قوة 
   * @param {number} scalar مقدار المضاعفة
   */
  mult(scalar) {
    this.x *= scalar
    this.y *= scalar
  }
  /**
   * لتقليص شدة قوة 
   * @param {number} scalar مقدار لتقليص
   */
  div(scalar) {

    this.x /= scalar
    this.y /= scalar
  }
}

const version = __VERSION__

/**
 * 枚举类型
 * 
 * @class Enum
 */
class Enum {
  /**
   * Creates an instance of Enum.
   * @param {any} obj 构造源，可以为数组和对象
   * @param {number} [startNum=0] 
   * @memberof Enum
   */
  constructor(obj, startNum = 0) {
    // 处理数组
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        this[item] = index + startNum
        this[index + startNum] = item
      })
      return this
    }

    // 取对象的 key 列表
    const keys = Object.keys(obj)

    // 以对象 key 列表的第一想是否能转换成数字
    // 判定对象是 num -> str 还是 str -> num
    const keyIsNum = !isNaN(Number(keys[0]))
    
    // num -> key
    if (keyIsNum) {
      Object.keys(obj).forEach((key) => {
        this[key] = obj[key]
        this[obj[key]] = Number(key)
      })
      return this
    }

    // key -> num
    Object.keys(obj).forEach((key) => {
      this[key] = Number(obj[key])
      this[obj[key]] = key
    })
    return this
  }
  /**
   * 将普通对象转换为 Enum 枚举类型，
   * 传入的对象应该是 {[string]: number} 格式
   * 此方法用于使编辑器代码提示正常工作（maybe）
   * 
   * @static
   * @param {number} object 
   * @returns Enum
   * @memberof Enum
   */
  static transToEnum(object) {
    Object.keys(object).forEach((key) => {
      object[key] = Number(object[key])
      object[object[key]] = key
    })

    object.__proto__ = Enum.prototype
    return object
  }
  /**
   * 获得枚举类的数字值列表（从小到大排序）
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns number[] 数字列表
   * @memberof Enum
   */
  static listIndex(_enum) {
    return Object.keys(_enum).map(Number).filter(i => !isNaN(i)).sort()
  }
  /**
   * 获得枚举类的枚举名列表（按对于数字从小到大排序）
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns string[] 字符串列表
   * @memberof Enum
   */
  static listValue(_enum) {
    return Enum.listIndex(_enum).map(i => _enum[i])
  }
  /**
   * 抽取枚举类的 num -> str 部分
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns {[number]: string}
   * @memberof Enum
   */
  static pickIndexValue(_enum) {
    const result = {}
    Enum.listIndex(_enum).forEach((index) => {
      result[index] = _enum[index]
    })
    return result
  }
  /**
   * 抽取枚举类的 str -> num 部分
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns {[string]: number}
   * @memberof Enum
   */
  static pickValueIndex(_enum) {
    const result = {}
    Enum.listValue(_enum).forEach((index) => {
      result[index] = _enum[index]
    })
    return result
  }
  /**
   * 判断值是否是几个枚举名对于的枚举值之一
   * 
   * @static
   * @param {number} value 值
   * @param {array|string} list 列表或逗号分隔的字符串
   * @param {Enum} _enum 枚举
   * @returns 
   * @memberof Enum
   */
  static isIn(value, list, _enum) {
    if (typeof list === 'string' || list instanceof String ) {
      list = list.replace(/[,| |\n|\/]+/g, ',').split(',')
    }
    return list.map(key => _enum[key]).indexOf(value) >= 0
  }
  /**
   * 生成一个检测 isIn 的函数
   * 
   * @static
   * @param {Enum} _enum 
   * @param {array|string} list 
   * @returns 
   * @memberof Enum
   */
  static isInFactory(_enum, list) {
    return list
      ? (value) => {
        return Enum.isIn(value, list, _enum)
      }
      : (value, list) => {
        return Enum.isIn(value, list, _enum)
      }
  }
}

Enum.version = version

export { Enum, version }
export default Enum
const version = __VERSION__

/**
 * 枚举类型
 * 
 * @class Enum
 */
class Enum {
  /**
   * Creates an instance of Enum.
   * @param {any} obj 构造源，可以为数组和对象
   * @param {number} [startNum=0] 
   * @memberof Enum
   */
  constructor(obj, startNum = 0) {
    // 处理数组
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        this[item] = index + startNum
        this[index + startNum] = item
      })
      return this
    }

    // 取对象的 key 列表
    const keys = Object.keys(obj)

    // 以对象 key 列表的第一想是否能转换成数字
    // 判定对象是 num -> str 还是 str -> num
    const keyIsNum = !isNaN(Number(keys[0]))
    
    // num -> key
    if (keyIsNum) {
      Object.keys(obj).forEach((key) => {
        this[key] = obj[key]
        this[obj[key]] = Number(key)
      })
      return this
    }

    // key -> num
    Object.keys(obj).forEach((key) => {
      this[key] = Number(obj[key])
      this[obj[key]] = key
    })
    return this
  }
  /**
   * 将普通对象转换为 Enum 枚举类型，
   * 传入的对象应该是 {[string]: number} 格式
   * 此方法用于使编辑器代码提示正常工作（maybe）
   * 
   * @static
   * @param {number} object 
   * @returns Enum
   * @memberof Enum
   */
  static transToEnum(object) {
    Object.keys(object).forEach((key) => {
      object[key] = Number(object[key])
      object[object[key]] = key
    })

    object.__proto__ = Enum.prototype
    return object
  }
  /**
   * 获得枚举类的数字值列表（从小到大排序）
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns number[] 数字列表
   * @memberof Enum
   */
  static listIndex(_enum) {
    return Object.keys(_enum).map(Number).filter(i => !isNaN(i)).sort()
  }
  /**
   * 获得枚举类的枚举名列表（按对于数字从小到大排序）
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns string[] 字符串列表
   * @memberof Enum
   */
  static listValue(_enum) {
    return Enum.listIndex(_enum).map(i => _enum[i])
  }
  /**
   * 抽取枚举类的 num -> str 部分
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns {[number]: string}
   * @memberof Enum
   */
  static pickIndexValue(_enum) {
    const result = {}
    Enum.listIndex(_enum).forEach((index) => {
      result[index] = _enum[index]
    })
    return result
  }
  /**
   * 抽取枚举类的 str -> num 部分
   * 
   * @static
   * @param {Enum} _enum 枚举类型
   * @returns {[string]: number}
   * @memberof Enum
   */
  static pickValueIndex(_enum) {
    const result = {}
    Enum.listValue(_enum).forEach((index) => {
      result[index] = _enum[index]
    })
    return result
  }
  /**
   * 判断值是否是几个枚举名对于的枚举值之一
   * 
   * @static
   * @param {number} value 值
   * @param {array|string} list 列表或逗号分隔的字符串
   * @param {Enum} _enum 枚举
   * @returns 
   * @memberof Enum
   */
  static isIn(value, list, _enum) {
    if (typeof list === 'string' || list instanceof String ) {
      list = list.replace(/[,| |\n|\/]+/g, ',').split(',')
    }
    return list.map(key => _enum[key]).indexOf(value) >= 0
  }
  /**
   * 生成一个检测 isIn 的函数
   * 
   * @static
   * @param {Enum} _enum 
   * @param {array|string} list 
   * @returns 
   * @memberof Enum
   */
  static isInFactory(_enum, list) {
    return list
      ? (value) => {
        return Enum.isIn(value, list, _enum)
      }
      : (value, list) => {
        return Enum.isIn(value, list, _enum)
      }
  }
}

Enum.version = version

export { Enum, version }
export default Enum

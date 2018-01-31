'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var version = __VERSION__;

/**
 * 枚举类型
 * 
 * @class Enum
 */

var Enum = function () {
  /**
   * Creates an instance of Enum.
   * @param {any} obj 构造源，可以为数组和对象
   * @param {number} [startNum=0] 
   * @memberof Enum
   */
  function Enum(obj) {
    var _this = this;

    var startNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Enum);

    // 处理数组
    if (Array.isArray(obj)) {
      obj.forEach(function (item, index) {
        _this[item] = index + startNum;
        _this[index + startNum] = item;
      });
      return this;
    }

    // 取对象的 key 列表
    var keys = Object.keys(obj);

    // 以对象 key 列表的第一想是否能转换成数字
    // 判定对象是 num -> str 还是 str -> num
    var keyIsNum = !isNaN(Number(keys[0]));

    // num -> key
    if (keyIsNum) {
      Object.keys(obj).forEach(function (key) {
        _this[key] = obj[key];
        _this[obj[key]] = Number(key);
      });
      return this;
    }

    // key -> num
    Object.keys(obj).forEach(function (key) {
      _this[key] = Number(obj[key]);
      _this[obj[key]] = key;
    });
    return this;
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


  _createClass(Enum, null, [{
    key: 'transToEnum',
    value: function transToEnum(object) {
      Object.keys(object).forEach(function (key) {
        object[key] = Number(object[key]);
        object[object[key]] = key;
      });

      object.__proto__ = Enum.prototype;
      return object;
    }
    /**
     * 获得枚举类的数字值列表（从小到大排序）
     * 
     * @static
     * @param {Enum} _enum 枚举类型
     * @returns number[] 数字列表
     * @memberof Enum
     */

  }, {
    key: 'listIndex',
    value: function listIndex(_enum) {
      return Object.keys(_enum).map(Number).filter(function (i) {
        return !isNaN(i);
      }).sort();
    }
    /**
     * 获得枚举类的枚举名列表（按对于数字从小到大排序）
     * 
     * @static
     * @param {Enum} _enum 枚举类型
     * @returns string[] 字符串列表
     * @memberof Enum
     */

  }, {
    key: 'listValue',
    value: function listValue(_enum) {
      return Enum.listIndex(_enum).map(function (i) {
        return _enum[i];
      });
    }
    /**
     * 抽取枚举类的 num -> str 部分
     * 
     * @static
     * @param {Enum} _enum 枚举类型
     * @returns {[number]: string}
     * @memberof Enum
     */

  }, {
    key: 'pickIndexValue',
    value: function pickIndexValue(_enum) {
      var result = {};
      Enum.listIndex(_enum).forEach(function (index) {
        result[index] = _enum[index];
      });
      return result;
    }
    /**
     * 抽取枚举类的 str -> num 部分
     * 
     * @static
     * @param {Enum} _enum 枚举类型
     * @returns {[string]: number}
     * @memberof Enum
     */

  }, {
    key: 'pickValueIndex',
    value: function pickValueIndex(_enum) {
      var result = {};
      Enum.listValue(_enum).forEach(function (index) {
        result[index] = _enum[index];
      });
      return result;
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

  }, {
    key: 'isIn',
    value: function isIn(value, list, _enum) {
      if (typeof list === 'string' || list instanceof String) {
        list = list.replace(/[,| |\n|\/]+/g, ',').split(',');
      }
      return list.map(function (key) {
        return _enum[key];
      }).indexOf(value) >= 0;
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

  }, {
    key: 'isInFactory',
    value: function isInFactory(_enum, list) {
      return list ? function (value) {
        return Enum.isIn(value, list, _enum);
      } : function (value, list) {
        return Enum.isIn(value, list, _enum);
      };
    }
  }]);

  return Enum;
}();

Enum.version = version;

exports.Enum = Enum;
exports.version = version;
exports.default = Enum;
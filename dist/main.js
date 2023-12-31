"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/gl-matrix/cjs/common.js
var require_common = __commonJS({
  "node_modules/gl-matrix/cjs/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setMatrixArrayType = setMatrixArrayType;
    exports.toRadian = toRadian;
    exports.equals = equals;
    exports.RANDOM = exports.ARRAY_TYPE = exports.EPSILON = void 0;
    var EPSILON = 1e-6;
    exports.EPSILON = EPSILON;
    var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
    exports.ARRAY_TYPE = ARRAY_TYPE;
    var RANDOM = Math.random;
    exports.RANDOM = RANDOM;
    function setMatrixArrayType(type) {
      exports.ARRAY_TYPE = ARRAY_TYPE = type;
    }
    var degree = Math.PI / 180;
    function toRadian(a) {
      return a * degree;
    }
    function equals(a, b) {
      return Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
    }
    if (!Math.hypot)
      Math.hypot = function() {
        var y = 0, i = arguments.length;
        while (i--) {
          y += arguments[i] * arguments[i];
        }
        return Math.sqrt(y);
      };
  }
});

// node_modules/gl-matrix/cjs/mat2.js
var require_mat2 = __commonJS({
  "node_modules/gl-matrix/cjs/mat2.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.copy = copy;
    exports.identity = identity;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.transpose = transpose;
    exports.invert = invert;
    exports.adjoint = adjoint;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.str = str;
    exports.frob = frob;
    exports.LDU = LDU;
    exports.add = add;
    exports.subtract = subtract;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.sub = exports.mul = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
      }
      out[0] = 1;
      out[3] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    }
    function fromValues(m00, m01, m10, m11) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = m00;
      out[1] = m01;
      out[2] = m10;
      out[3] = m11;
      return out;
    }
    function set(out, m00, m01, m10, m11) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m10;
      out[3] = m11;
      return out;
    }
    function transpose(out, a) {
      if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
      } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
      }
      return out;
    }
    function invert(out, a) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var det = a0 * a3 - a2 * a1;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = a3 * det;
      out[1] = -a1 * det;
      out[2] = -a2 * det;
      out[3] = a0 * det;
      return out;
    }
    function adjoint(out, a) {
      var a0 = a[0];
      out[0] = a[3];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a0;
      return out;
    }
    function determinant(a) {
      return a[0] * a[3] - a[2] * a[1];
    }
    function multiply(out, a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = a0 * b0 + a2 * b1;
      out[1] = a1 * b0 + a3 * b1;
      out[2] = a0 * b2 + a2 * b3;
      out[3] = a1 * b2 + a3 * b3;
      return out;
    }
    function rotate(out, a, rad) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = a0 * c + a2 * s;
      out[1] = a1 * c + a3 * s;
      out[2] = a0 * -s + a2 * c;
      out[3] = a1 * -s + a3 * c;
      return out;
    }
    function scale(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var v0 = v[0], v1 = v[1];
      out[0] = a0 * v0;
      out[1] = a1 * v0;
      out[2] = a2 * v1;
      out[3] = a3 * v1;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = -s;
      out[3] = c;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = v[1];
      return out;
    }
    function str(a) {
      return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3]);
    }
    function LDU(L, D, U, a) {
      L[2] = a[2] / a[0];
      U[0] = a[0];
      U[1] = a[1];
      U[3] = a[3] - L[2] * U[1];
      return [L, D, U];
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      return out;
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/mat2d.js
var require_mat2d = __commonJS({
  "node_modules/gl-matrix/cjs/mat2d.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.copy = copy;
    exports.identity = identity;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.invert = invert;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.translate = translate;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.fromTranslation = fromTranslation;
    exports.str = str;
    exports.frob = frob;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sub = exports.mul = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(6);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[4] = 0;
        out[5] = 0;
      }
      out[0] = 1;
      out[3] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(6);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromValues(a, b, c, d, tx, ty) {
      var out = new glMatrix.ARRAY_TYPE(6);
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      out[4] = tx;
      out[5] = ty;
      return out;
    }
    function set(out, a, b, c, d, tx, ty) {
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      out[4] = tx;
      out[5] = ty;
      return out;
    }
    function invert(out, a) {
      var aa = a[0], ab = a[1], ac = a[2], ad = a[3];
      var atx = a[4], aty = a[5];
      var det = aa * ad - ab * ac;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = ad * det;
      out[1] = -ab * det;
      out[2] = -ac * det;
      out[3] = aa * det;
      out[4] = (ac * aty - ad * atx) * det;
      out[5] = (ab * atx - aa * aty) * det;
      return out;
    }
    function determinant(a) {
      return a[0] * a[3] - a[1] * a[2];
    }
    function multiply(out, a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
      out[0] = a0 * b0 + a2 * b1;
      out[1] = a1 * b0 + a3 * b1;
      out[2] = a0 * b2 + a2 * b3;
      out[3] = a1 * b2 + a3 * b3;
      out[4] = a0 * b4 + a2 * b5 + a4;
      out[5] = a1 * b4 + a3 * b5 + a5;
      return out;
    }
    function rotate(out, a, rad) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = a0 * c + a2 * s;
      out[1] = a1 * c + a3 * s;
      out[2] = a0 * -s + a2 * c;
      out[3] = a1 * -s + a3 * c;
      out[4] = a4;
      out[5] = a5;
      return out;
    }
    function scale(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var v0 = v[0], v1 = v[1];
      out[0] = a0 * v0;
      out[1] = a1 * v0;
      out[2] = a2 * v1;
      out[3] = a3 * v1;
      out[4] = a4;
      out[5] = a5;
      return out;
    }
    function translate(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var v0 = v[0], v1 = v[1];
      out[0] = a0;
      out[1] = a1;
      out[2] = a2;
      out[3] = a3;
      out[4] = a0 * v0 + a2 * v1 + a4;
      out[5] = a1 * v0 + a3 * v1 + a5;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = -s;
      out[3] = c;
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = v[1];
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = v[0];
      out[5] = v[1];
      return out;
    }
    function str(a) {
      return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5));
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/mat3.js
var require_mat3 = __commonJS({
  "node_modules/gl-matrix/cjs/mat3.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.fromMat4 = fromMat4;
    exports.clone = clone;
    exports.copy = copy;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.identity = identity;
    exports.transpose = transpose;
    exports.invert = invert;
    exports.adjoint = adjoint;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.translate = translate;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.fromTranslation = fromTranslation;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.fromMat2d = fromMat2d;
    exports.fromQuat = fromQuat;
    exports.normalFromMat4 = normalFromMat4;
    exports.projection = projection;
    exports.str = str;
    exports.frob = frob;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sub = exports.mul = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(9);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
      }
      out[0] = 1;
      out[4] = 1;
      out[8] = 1;
      return out;
    }
    function fromMat4(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[4];
      out[4] = a[5];
      out[5] = a[6];
      out[6] = a[8];
      out[7] = a[9];
      out[8] = a[10];
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(9);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      var out = new glMatrix.ARRAY_TYPE(9);
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m10;
      out[4] = m11;
      out[5] = m12;
      out[6] = m20;
      out[7] = m21;
      out[8] = m22;
      return out;
    }
    function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m10;
      out[4] = m11;
      out[5] = m12;
      out[6] = m20;
      out[7] = m21;
      out[8] = m22;
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 1;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function transpose(out, a) {
      if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
      } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
      }
      return out;
    }
    function invert(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20;
      var det = a00 * b01 + a01 * b11 + a02 * b21;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = b01 * det;
      out[1] = (-a22 * a01 + a02 * a21) * det;
      out[2] = (a12 * a01 - a02 * a11) * det;
      out[3] = b11 * det;
      out[4] = (a22 * a00 - a02 * a20) * det;
      out[5] = (-a12 * a00 + a02 * a10) * det;
      out[6] = b21 * det;
      out[7] = (-a21 * a00 + a01 * a20) * det;
      out[8] = (a11 * a00 - a01 * a10) * det;
      return out;
    }
    function adjoint(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      out[0] = a11 * a22 - a12 * a21;
      out[1] = a02 * a21 - a01 * a22;
      out[2] = a01 * a12 - a02 * a11;
      out[3] = a12 * a20 - a10 * a22;
      out[4] = a00 * a22 - a02 * a20;
      out[5] = a02 * a10 - a00 * a12;
      out[6] = a10 * a21 - a11 * a20;
      out[7] = a01 * a20 - a00 * a21;
      out[8] = a00 * a11 - a01 * a10;
      return out;
    }
    function determinant(a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    function multiply(out, a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b00 = b[0], b01 = b[1], b02 = b[2];
      var b10 = b[3], b11 = b[4], b12 = b[5];
      var b20 = b[6], b21 = b[7], b22 = b[8];
      out[0] = b00 * a00 + b01 * a10 + b02 * a20;
      out[1] = b00 * a01 + b01 * a11 + b02 * a21;
      out[2] = b00 * a02 + b01 * a12 + b02 * a22;
      out[3] = b10 * a00 + b11 * a10 + b12 * a20;
      out[4] = b10 * a01 + b11 * a11 + b12 * a21;
      out[5] = b10 * a02 + b11 * a12 + b12 * a22;
      out[6] = b20 * a00 + b21 * a10 + b22 * a20;
      out[7] = b20 * a01 + b21 * a11 + b22 * a21;
      out[8] = b20 * a02 + b21 * a12 + b22 * a22;
      return out;
    }
    function translate(out, a, v) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a10;
      out[4] = a11;
      out[5] = a12;
      out[6] = x * a00 + y * a10 + a20;
      out[7] = x * a01 + y * a11 + a21;
      out[8] = x * a02 + y * a12 + a22;
      return out;
    }
    function rotate(out, a, rad) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c * a00 + s * a10;
      out[1] = c * a01 + s * a11;
      out[2] = c * a02 + s * a12;
      out[3] = c * a10 - s * a00;
      out[4] = c * a11 - s * a01;
      out[5] = c * a12 - s * a02;
      out[6] = a20;
      out[7] = a21;
      out[8] = a22;
      return out;
    }
    function scale(out, a, v) {
      var x = v[0], y = v[1];
      out[0] = x * a[0];
      out[1] = x * a[1];
      out[2] = x * a[2];
      out[3] = y * a[3];
      out[4] = y * a[4];
      out[5] = y * a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 1;
      out[5] = 0;
      out[6] = v[0];
      out[7] = v[1];
      out[8] = 1;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = -s;
      out[4] = c;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = v[1];
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function fromMat2d(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = 0;
      out[3] = a[2];
      out[4] = a[3];
      out[5] = 0;
      out[6] = a[4];
      out[7] = a[5];
      out[8] = 1;
      return out;
    }
    function fromQuat(out, q) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - yy - zz;
      out[3] = yx - wz;
      out[6] = zx + wy;
      out[1] = yx + wz;
      out[4] = 1 - xx - zz;
      out[7] = zy - wx;
      out[2] = zx - wy;
      out[5] = zy + wx;
      out[8] = 1 - xx - yy;
      return out;
    }
    function normalFromMat4(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      return out;
    }
    function projection(out, width, height) {
      out[0] = 2 / width;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = -2 / height;
      out[5] = 0;
      out[6] = -1;
      out[7] = 1;
      out[8] = 1;
      return out;
    }
    function str(a) {
      return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      out[6] = a[6] + b[6] * scale2;
      out[7] = a[7] + b[7] * scale2;
      out[8] = a[8] + b[8] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/mat4.js
var require_mat4 = __commonJS({
  "node_modules/gl-matrix/cjs/mat4.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.copy = copy;
    exports.fromValues = fromValues;
    exports.set = set;
    exports.identity = identity;
    exports.transpose = transpose;
    exports.invert = invert;
    exports.adjoint = adjoint;
    exports.determinant = determinant;
    exports.multiply = multiply;
    exports.translate = translate;
    exports.scale = scale;
    exports.rotate = rotate;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.fromTranslation = fromTranslation;
    exports.fromScaling = fromScaling;
    exports.fromRotation = fromRotation;
    exports.fromXRotation = fromXRotation;
    exports.fromYRotation = fromYRotation;
    exports.fromZRotation = fromZRotation;
    exports.fromRotationTranslation = fromRotationTranslation;
    exports.fromQuat2 = fromQuat2;
    exports.getTranslation = getTranslation;
    exports.getScaling = getScaling;
    exports.getRotation = getRotation;
    exports.fromRotationTranslationScale = fromRotationTranslationScale;
    exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
    exports.fromQuat = fromQuat;
    exports.frustum = frustum;
    exports.perspectiveNO = perspectiveNO;
    exports.perspectiveZO = perspectiveZO;
    exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
    exports.orthoNO = orthoNO;
    exports.orthoZO = orthoZO;
    exports.lookAt = lookAt;
    exports.targetTo = targetTo;
    exports.str = str;
    exports.frob = frob;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sub = exports.mul = exports.ortho = exports.perspective = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(16);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
      }
      out[0] = 1;
      out[5] = 1;
      out[10] = 1;
      out[15] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(16);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      var out = new glMatrix.ARRAY_TYPE(16);
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function transpose(out, a) {
      if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3];
        var a12 = a[6], a13 = a[7];
        var a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
      } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
      }
      return out;
    }
    function invert(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      return out;
    }
    function adjoint(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
      out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
      out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
      out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
      out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
      out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
      out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
      out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
      out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
      out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
      out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
      out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
      out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
      out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
      out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
      out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
      return out;
    }
    function determinant(a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    function multiply(out, a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[4];
      b1 = b[5];
      b2 = b[6];
      b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[8];
      b1 = b[9];
      b2 = b[10];
      b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[12];
      b1 = b[13];
      b2 = b[14];
      b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
    }
    function translate(out, a, v) {
      var x = v[0], y = v[1], z = v[2];
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }
      return out;
    }
    function scale(out, a, v) {
      var x = v[0], y = v[1], z = v[2];
      out[0] = a[0] * x;
      out[1] = a[1] * x;
      out[2] = a[2] * x;
      out[3] = a[3] * x;
      out[4] = a[4] * y;
      out[5] = a[5] * y;
      out[6] = a[6] * y;
      out[7] = a[7] * y;
      out[8] = a[8] * z;
      out[9] = a[9] * z;
      out[10] = a[10] * z;
      out[11] = a[11] * z;
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function rotate(out, a, rad, axis) {
      var x = axis[0], y = axis[1], z = axis[2];
      var len = Math.hypot(x, y, z);
      var s, c, t;
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      var b00, b01, b02;
      var b10, b11, b12;
      var b20, b21, b22;
      if (len < glMatrix.EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      b00 = x * x * t + c;
      b01 = y * x * t + z * s;
      b02 = z * x * t - y * s;
      b10 = x * y * t - z * s;
      b11 = y * y * t + c;
      b12 = z * y * t + x * s;
      b20 = x * z * t + y * s;
      b21 = y * z * t - x * s;
      b22 = z * z * t + c;
      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;
      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;
      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;
      if (a !== out) {
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      return out;
    }
    function rotateX(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];
      if (a !== out) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[4] = a10 * c + a20 * s;
      out[5] = a11 * c + a21 * s;
      out[6] = a12 * c + a22 * s;
      out[7] = a13 * c + a23 * s;
      out[8] = a20 * c - a10 * s;
      out[9] = a21 * c - a11 * s;
      out[10] = a22 * c - a12 * s;
      out[11] = a23 * c - a13 * s;
      return out;
    }
    function rotateY(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];
      if (a !== out) {
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c - a20 * s;
      out[1] = a01 * c - a21 * s;
      out[2] = a02 * c - a22 * s;
      out[3] = a03 * c - a23 * s;
      out[8] = a00 * s + a20 * c;
      out[9] = a01 * s + a21 * c;
      out[10] = a02 * s + a22 * c;
      out[11] = a03 * s + a23 * c;
      return out;
    }
    function rotateZ(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      if (a !== out) {
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c + a10 * s;
      out[1] = a01 * c + a11 * s;
      out[2] = a02 * c + a12 * s;
      out[3] = a03 * c + a13 * s;
      out[4] = a10 * c - a00 * s;
      out[5] = a11 * c - a01 * s;
      out[6] = a12 * c - a02 * s;
      out[7] = a13 * c - a03 * s;
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = v[1];
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = v[2];
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromRotation(out, rad, axis) {
      var x = axis[0], y = axis[1], z = axis[2];
      var len = Math.hypot(x, y, z);
      var s, c, t;
      if (len < glMatrix.EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      out[0] = x * x * t + c;
      out[1] = y * x * t + z * s;
      out[2] = z * x * t - y * s;
      out[3] = 0;
      out[4] = x * y * t - z * s;
      out[5] = y * y * t + c;
      out[6] = z * y * t + x * s;
      out[7] = 0;
      out[8] = x * z * t + y * s;
      out[9] = y * z * t - x * s;
      out[10] = z * z * t + c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromXRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = c;
      out[6] = s;
      out[7] = 0;
      out[8] = 0;
      out[9] = -s;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromYRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = 0;
      out[2] = -s;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = s;
      out[9] = 0;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromZRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = 0;
      out[4] = -s;
      out[5] = c;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromRotationTranslation(out, q, v) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - (yy + zz);
      out[1] = xy + wz;
      out[2] = xz - wy;
      out[3] = 0;
      out[4] = xy - wz;
      out[5] = 1 - (xx + zz);
      out[6] = yz + wx;
      out[7] = 0;
      out[8] = xz + wy;
      out[9] = yz - wx;
      out[10] = 1 - (xx + yy);
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromQuat2(out, a) {
      var translation = new glMatrix.ARRAY_TYPE(3);
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
      var magnitude = bx * bx + by * by + bz * bz + bw * bw;
      if (magnitude > 0) {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
      } else {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      }
      fromRotationTranslation(out, a, translation);
      return out;
    }
    function getTranslation(out, mat) {
      out[0] = mat[12];
      out[1] = mat[13];
      out[2] = mat[14];
      return out;
    }
    function getScaling(out, mat) {
      var m11 = mat[0];
      var m12 = mat[1];
      var m13 = mat[2];
      var m21 = mat[4];
      var m22 = mat[5];
      var m23 = mat[6];
      var m31 = mat[8];
      var m32 = mat[9];
      var m33 = mat[10];
      out[0] = Math.hypot(m11, m12, m13);
      out[1] = Math.hypot(m21, m22, m23);
      out[2] = Math.hypot(m31, m32, m33);
      return out;
    }
    function getRotation(out, mat) {
      var scaling = new glMatrix.ARRAY_TYPE(3);
      getScaling(scaling, mat);
      var is1 = 1 / scaling[0];
      var is2 = 1 / scaling[1];
      var is3 = 1 / scaling[2];
      var sm11 = mat[0] * is1;
      var sm12 = mat[1] * is2;
      var sm13 = mat[2] * is3;
      var sm21 = mat[4] * is1;
      var sm22 = mat[5] * is2;
      var sm23 = mat[6] * is3;
      var sm31 = mat[8] * is1;
      var sm32 = mat[9] * is2;
      var sm33 = mat[10] * is3;
      var trace = sm11 + sm22 + sm33;
      var S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
      }
      return out;
    }
    function fromRotationTranslationScale(out, q, v, s) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      out[0] = (1 - (yy + zz)) * sx;
      out[1] = (xy + wz) * sx;
      out[2] = (xz - wy) * sx;
      out[3] = 0;
      out[4] = (xy - wz) * sy;
      out[5] = (1 - (xx + zz)) * sy;
      out[6] = (yz + wx) * sy;
      out[7] = 0;
      out[8] = (xz + wy) * sz;
      out[9] = (yz - wx) * sz;
      out[10] = (1 - (xx + yy)) * sz;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      var ox = o[0];
      var oy = o[1];
      var oz = o[2];
      var out0 = (1 - (yy + zz)) * sx;
      var out1 = (xy + wz) * sx;
      var out2 = (xz - wy) * sx;
      var out4 = (xy - wz) * sy;
      var out5 = (1 - (xx + zz)) * sy;
      var out6 = (yz + wx) * sy;
      var out8 = (xz + wy) * sz;
      var out9 = (yz - wx) * sz;
      var out10 = (1 - (xx + yy)) * sz;
      out[0] = out0;
      out[1] = out1;
      out[2] = out2;
      out[3] = 0;
      out[4] = out4;
      out[5] = out5;
      out[6] = out6;
      out[7] = 0;
      out[8] = out8;
      out[9] = out9;
      out[10] = out10;
      out[11] = 0;
      out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
      out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
      out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
      out[15] = 1;
      return out;
    }
    function fromQuat(out, q) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - yy - zz;
      out[1] = yx + wz;
      out[2] = zx - wy;
      out[3] = 0;
      out[4] = yx - wz;
      out[5] = 1 - xx - zz;
      out[6] = zy + wx;
      out[7] = 0;
      out[8] = zx + wy;
      out[9] = zy - wx;
      out[10] = 1 - xx - yy;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function frustum(out, left, right, bottom, top, near, far) {
      var rl = 1 / (right - left);
      var tb = 1 / (top - bottom);
      var nf = 1 / (near - far);
      out[0] = near * 2 * rl;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = near * 2 * tb;
      out[6] = 0;
      out[7] = 0;
      out[8] = (right + left) * rl;
      out[9] = (top + bottom) * tb;
      out[10] = (far + near) * nf;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near * 2 * nf;
      out[15] = 0;
      return out;
    }
    function perspectiveNO(out, fovy, aspect, near, far) {
      var f = 1 / Math.tan(fovy / 2), nf;
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }
      return out;
    }
    var perspective = perspectiveNO;
    exports.perspective = perspective;
    function perspectiveZO(out, fovy, aspect, near, far) {
      var f = 1 / Math.tan(fovy / 2), nf;
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = far * nf;
        out[14] = far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -near;
      }
      return out;
    }
    function perspectiveFromFieldOfView(out, fov, near, far) {
      var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
      var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
      var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
      var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
      var xScale = 2 / (leftTan + rightTan);
      var yScale = 2 / (upTan + downTan);
      out[0] = xScale;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = yScale;
      out[6] = 0;
      out[7] = 0;
      out[8] = -((leftTan - rightTan) * xScale * 0.5);
      out[9] = (upTan - downTan) * yScale * 0.5;
      out[10] = far / (near - far);
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near / (near - far);
      out[15] = 0;
      return out;
    }
    function orthoNO(out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 2 * nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = (far + near) * nf;
      out[15] = 1;
      return out;
    }
    var ortho = orthoNO;
    exports.ortho = ortho;
    function orthoZO(out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = near * nf;
      out[15] = 1;
      return out;
    }
    function lookAt(out, eye, center, up) {
      var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
      var eyex = eye[0];
      var eyey = eye[1];
      var eyez = eye[2];
      var upx = up[0];
      var upy = up[1];
      var upz = up[2];
      var centerx = center[0];
      var centery = center[1];
      var centerz = center[2];
      if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return identity(out);
      }
      z0 = eyex - centerx;
      z1 = eyey - centery;
      z2 = eyez - centerz;
      len = 1 / Math.hypot(z0, z1, z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
      x0 = upy * z2 - upz * z1;
      x1 = upz * z0 - upx * z2;
      x2 = upx * z1 - upy * z0;
      len = Math.hypot(x0, x1, x2);
      if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
      } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
      len = Math.hypot(y0, y1, y2);
      if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
      } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
      }
      out[0] = x0;
      out[1] = y0;
      out[2] = z0;
      out[3] = 0;
      out[4] = x1;
      out[5] = y1;
      out[6] = z1;
      out[7] = 0;
      out[8] = x2;
      out[9] = y2;
      out[10] = z2;
      out[11] = 0;
      out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      out[15] = 1;
      return out;
    }
    function targetTo(out, eye, target, up) {
      var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
      var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
      var len = z0 * z0 + z1 * z1 + z2 * z2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
      }
      var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      out[0] = x0;
      out[1] = x1;
      out[2] = x2;
      out[3] = 0;
      out[4] = z1 * x2 - z2 * x1;
      out[5] = z2 * x0 - z0 * x2;
      out[6] = z0 * x1 - z1 * x0;
      out[7] = 0;
      out[8] = z0;
      out[9] = z1;
      out[10] = z2;
      out[11] = 0;
      out[12] = eyex;
      out[13] = eyey;
      out[14] = eyez;
      out[15] = 1;
      return out;
    }
    function str(a) {
      return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
    }
    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      out[9] = a[9] + b[9];
      out[10] = a[10] + b[10];
      out[11] = a[11] + b[11];
      out[12] = a[12] + b[12];
      out[13] = a[13] + b[13];
      out[14] = a[14] + b[14];
      out[15] = a[15] + b[15];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      out[9] = a[9] - b[9];
      out[10] = a[10] - b[10];
      out[11] = a[11] - b[11];
      out[12] = a[12] - b[12];
      out[13] = a[13] - b[13];
      out[14] = a[14] - b[14];
      out[15] = a[15] - b[15];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      out[9] = a[9] * b;
      out[10] = a[10] * b;
      out[11] = a[11] * b;
      out[12] = a[12] * b;
      out[13] = a[13] * b;
      out[14] = a[14] * b;
      out[15] = a[15] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      out[6] = a[6] + b[6] * scale2;
      out[7] = a[7] + b[7] * scale2;
      out[8] = a[8] + b[8] * scale2;
      out[9] = a[9] + b[9] * scale2;
      out[10] = a[10] + b[10] * scale2;
      out[11] = a[11] + b[11] * scale2;
      out[12] = a[12] + b[12] * scale2;
      out[13] = a[13] + b[13] * scale2;
      out[14] = a[14] + b[14] * scale2;
      out[15] = a[15] + b[15] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
      var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
      var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
      var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
      var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
    }
    var mul = multiply;
    exports.mul = mul;
    var sub = subtract;
    exports.sub = sub;
  }
});

// node_modules/gl-matrix/cjs/vec3.js
var require_vec3 = __commonJS({
  "node_modules/gl-matrix/cjs/vec3.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.length = length;
    exports.fromValues = fromValues;
    exports.copy = copy;
    exports.set = set;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiply = multiply;
    exports.divide = divide;
    exports.ceil = ceil;
    exports.floor = floor;
    exports.min = min;
    exports.max = max;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.distance = distance;
    exports.squaredDistance = squaredDistance;
    exports.squaredLength = squaredLength;
    exports.negate = negate;
    exports.inverse = inverse;
    exports.normalize = normalize;
    exports.dot = dot;
    exports.cross = cross;
    exports.lerp = lerp;
    exports.hermite = hermite;
    exports.bezier = bezier;
    exports.random = random;
    exports.transformMat4 = transformMat4;
    exports.transformMat3 = transformMat3;
    exports.transformQuat = transformQuat;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.angle = angle;
    exports.zero = zero;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(3);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(3);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    function length(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      return Math.hypot(x, y, z);
    }
    function fromValues(x, y, z) {
      var out = new glMatrix.ARRAY_TYPE(3);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    function set(out, x, y, z) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      return out;
    }
    function round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      out[2] = Math.round(a[2]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      return Math.hypot(x, y, z);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      return x * x + y * y + z * z;
    }
    function squaredLength(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      return x * x + y * y + z * z;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      return out;
    }
    function normalize(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var len2 = x * x + y * y + z * z;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = a[0] * len2;
      out[1] = a[1] * len2;
      out[2] = a[2] * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    function cross(out, a, b) {
      var ax = a[0], ay = a[1], az = a[2];
      var bx = b[0], by = b[1], bz = b[2];
      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0];
      var ay = a[1];
      var az = a[2];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      return out;
    }
    function hermite(out, a, b, c, d, t) {
      var factorTimes2 = t * t;
      var factor1 = factorTimes2 * (2 * t - 3) + 1;
      var factor2 = factorTimes2 * (t - 2) + t;
      var factor3 = factorTimes2 * (t - 1);
      var factor4 = factorTimes2 * (3 - 2 * t);
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    function bezier(out, a, b, c, d, t) {
      var inverseFactor = 1 - t;
      var inverseFactorTimesTwo = inverseFactor * inverseFactor;
      var factorTimes2 = t * t;
      var factor1 = inverseFactorTimesTwo * inverseFactor;
      var factor2 = 3 * t * inverseFactorTimesTwo;
      var factor3 = 3 * factorTimes2 * inverseFactor;
      var factor4 = factorTimes2 * t;
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 || 1;
      var r = glMatrix.RANDOM() * 2 * Math.PI;
      var z = glMatrix.RANDOM() * 2 - 1;
      var zScale = Math.sqrt(1 - z * z) * scale2;
      out[0] = Math.cos(r) * zScale;
      out[1] = Math.sin(r) * zScale;
      out[2] = z * scale2;
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0], y = a[1], z = a[2];
      var w = m[3] * x + m[7] * y + m[11] * z + m[15];
      w = w || 1;
      out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
      out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
      out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
      return out;
    }
    function transformMat3(out, a, m) {
      var x = a[0], y = a[1], z = a[2];
      out[0] = x * m[0] + y * m[3] + z * m[6];
      out[1] = x * m[1] + y * m[4] + z * m[7];
      out[2] = x * m[2] + y * m[5] + z * m[8];
      return out;
    }
    function transformQuat(out, a, q) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
      var x = a[0], y = a[1], z = a[2];
      var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
      var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
      var w2 = qw * 2;
      uvx *= w2;
      uvy *= w2;
      uvz *= w2;
      uuvx *= 2;
      uuvy *= 2;
      uuvz *= 2;
      out[0] = x + uvx + uuvx;
      out[1] = y + uvy + uuvy;
      out[2] = z + uvz + uuvz;
      return out;
    }
    function rotateX(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[0];
      r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
      r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function rotateY(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
      r[1] = p[1];
      r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function rotateZ(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
      r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
      r[2] = p[2];
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function angle(a, b) {
      var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      return out;
    }
    function str(a) {
      return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2];
      var b0 = b[0], b1 = b[1], b2 = b[2];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
    }
    var sub = subtract;
    exports.sub = sub;
    var mul = multiply;
    exports.mul = mul;
    var div = divide;
    exports.div = div;
    var dist = distance;
    exports.dist = dist;
    var sqrDist = squaredDistance;
    exports.sqrDist = sqrDist;
    var len = length;
    exports.len = len;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var forEach = function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 3;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
        }
        return a;
      };
    }();
    exports.forEach = forEach;
  }
});

// node_modules/gl-matrix/cjs/vec4.js
var require_vec4 = __commonJS({
  "node_modules/gl-matrix/cjs/vec4.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.fromValues = fromValues;
    exports.copy = copy;
    exports.set = set;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiply = multiply;
    exports.divide = divide;
    exports.ceil = ceil;
    exports.floor = floor;
    exports.min = min;
    exports.max = max;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.distance = distance;
    exports.squaredDistance = squaredDistance;
    exports.length = length;
    exports.squaredLength = squaredLength;
    exports.negate = negate;
    exports.inverse = inverse;
    exports.normalize = normalize;
    exports.dot = dot;
    exports.cross = cross;
    exports.lerp = lerp;
    exports.random = random;
    exports.transformMat4 = transformMat4;
    exports.transformQuat = transformQuat;
    exports.zero = zero;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function fromValues(x, y, z, w) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function set(out, x, y, z, w) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      out[3] = a[3] * b[3];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      out[3] = a[3] / b[3];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      out[3] = Math.ceil(a[3]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      out[3] = Math.floor(a[3]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      out[3] = Math.min(a[3], b[3]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      out[3] = Math.max(a[3], b[3]);
      return out;
    }
    function round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      out[2] = Math.round(a[2]);
      out[3] = Math.round(a[3]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      var w = b[3] - a[3];
      return Math.hypot(x, y, z, w);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      var w = b[3] - a[3];
      return x * x + y * y + z * z + w * w;
    }
    function length(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      return Math.hypot(x, y, z, w);
    }
    function squaredLength(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      return x * x + y * y + z * z + w * w;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = -a[3];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      out[3] = 1 / a[3];
      return out;
    }
    function normalize(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      var len2 = x * x + y * y + z * z + w * w;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = x * len2;
      out[1] = y * len2;
      out[2] = z * len2;
      out[3] = w * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    function cross(out, u, v, w) {
      var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
      var G = u[0];
      var H = u[1];
      var I = u[2];
      var J = u[3];
      out[0] = H * F - I * E + J * D;
      out[1] = -(G * F) + I * C - J * B;
      out[2] = G * E - H * C + J * A;
      out[3] = -(G * D) + H * B - I * A;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0];
      var ay = a[1];
      var az = a[2];
      var aw = a[3];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      out[3] = aw + t * (b[3] - aw);
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 || 1;
      var v1, v2, v3, v4;
      var s1, s2;
      do {
        v1 = glMatrix.RANDOM() * 2 - 1;
        v2 = glMatrix.RANDOM() * 2 - 1;
        s1 = v1 * v1 + v2 * v2;
      } while (s1 >= 1);
      do {
        v3 = glMatrix.RANDOM() * 2 - 1;
        v4 = glMatrix.RANDOM() * 2 - 1;
        s2 = v3 * v3 + v4 * v4;
      } while (s2 >= 1);
      var d = Math.sqrt((1 - s1) / s2);
      out[0] = scale2 * v1;
      out[1] = scale2 * v2;
      out[2] = scale2 * v3 * d;
      out[3] = scale2 * v4 * d;
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
      out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
      out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
      out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
      return out;
    }
    function transformQuat(out, a, q) {
      var x = a[0], y = a[1], z = a[2];
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z;
      out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      out[3] = a[3];
      return out;
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      return out;
    }
    function str(a) {
      return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
    }
    var sub = subtract;
    exports.sub = sub;
    var mul = multiply;
    exports.mul = mul;
    var div = divide;
    exports.div = div;
    var dist = distance;
    exports.dist = dist;
    var sqrDist = squaredDistance;
    exports.sqrDist = sqrDist;
    var len = length;
    exports.len = len;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var forEach = function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 4;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          vec[3] = a[i + 3];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
          a[i + 3] = vec[3];
        }
        return a;
      };
    }();
    exports.forEach = forEach;
  }
});

// node_modules/gl-matrix/cjs/quat.js
var require_quat = __commonJS({
  "node_modules/gl-matrix/cjs/quat.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.identity = identity;
    exports.setAxisAngle = setAxisAngle;
    exports.getAxisAngle = getAxisAngle;
    exports.getAngle = getAngle;
    exports.multiply = multiply;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.calculateW = calculateW;
    exports.exp = exp;
    exports.ln = ln;
    exports.pow = pow;
    exports.slerp = slerp;
    exports.random = random;
    exports.invert = invert;
    exports.conjugate = conjugate;
    exports.fromMat3 = fromMat3;
    exports.fromEuler = fromEuler;
    exports.str = str;
    exports.setAxes = exports.sqlerp = exports.rotationTo = exports.equals = exports.exactEquals = exports.normalize = exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.lerp = exports.dot = exports.scale = exports.mul = exports.add = exports.set = exports.copy = exports.fromValues = exports.clone = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    var mat3 = _interopRequireWildcard(require_mat3());
    var vec318 = _interopRequireWildcard(require_vec3());
    var vec4 = _interopRequireWildcard(require_vec4());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }
      out[3] = 1;
      return out;
    }
    function identity(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    }
    function setAxisAngle(out, axis, rad) {
      rad = rad * 0.5;
      var s = Math.sin(rad);
      out[0] = s * axis[0];
      out[1] = s * axis[1];
      out[2] = s * axis[2];
      out[3] = Math.cos(rad);
      return out;
    }
    function getAxisAngle(out_axis, q) {
      var rad = Math.acos(q[3]) * 2;
      var s = Math.sin(rad / 2);
      if (s > glMatrix.EPSILON) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
      } else {
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
      }
      return rad;
    }
    function getAngle(a, b) {
      var dotproduct = dot(a, b);
      return Math.acos(2 * dotproduct * dotproduct - 1);
    }
    function multiply(out, a, b) {
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = b[0], by = b[1], bz = b[2], bw = b[3];
      out[0] = ax * bw + aw * bx + ay * bz - az * by;
      out[1] = ay * bw + aw * by + az * bx - ax * bz;
      out[2] = az * bw + aw * bz + ax * by - ay * bx;
      out[3] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
    }
    function rotateX(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw + aw * bx;
      out[1] = ay * bw + az * bx;
      out[2] = az * bw - ay * bx;
      out[3] = aw * bw - ax * bx;
      return out;
    }
    function rotateY(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var by = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw - az * by;
      out[1] = ay * bw + aw * by;
      out[2] = az * bw + ax * by;
      out[3] = aw * bw - ay * by;
      return out;
    }
    function rotateZ(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bz = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw + ay * bz;
      out[1] = ay * bw - ax * bz;
      out[2] = az * bw + aw * bz;
      out[3] = aw * bw - az * bz;
      return out;
    }
    function calculateW(out, a) {
      var x = a[0], y = a[1], z = a[2];
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
      return out;
    }
    function exp(out, a) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      var r = Math.sqrt(x * x + y * y + z * z);
      var et = Math.exp(w);
      var s = r > 0 ? et * Math.sin(r) / r : 0;
      out[0] = x * s;
      out[1] = y * s;
      out[2] = z * s;
      out[3] = et * Math.cos(r);
      return out;
    }
    function ln(out, a) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      var r = Math.sqrt(x * x + y * y + z * z);
      var t = r > 0 ? Math.atan2(r, w) / r : 0;
      out[0] = x * t;
      out[1] = y * t;
      out[2] = z * t;
      out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
      return out;
    }
    function pow(out, a, b) {
      ln(out, a);
      scale(out, out, b);
      exp(out, out);
      return out;
    }
    function slerp(out, a, b, t) {
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = b[0], by = b[1], bz = b[2], bw = b[3];
      var omega, cosom, sinom, scale0, scale1;
      cosom = ax * bx + ay * by + az * bz + aw * bw;
      if (cosom < 0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
      }
      if (1 - cosom > glMatrix.EPSILON) {
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
      } else {
        scale0 = 1 - t;
        scale1 = t;
      }
      out[0] = scale0 * ax + scale1 * bx;
      out[1] = scale0 * ay + scale1 * by;
      out[2] = scale0 * az + scale1 * bz;
      out[3] = scale0 * aw + scale1 * bw;
      return out;
    }
    function random(out) {
      var u1 = glMatrix.RANDOM();
      var u2 = glMatrix.RANDOM();
      var u3 = glMatrix.RANDOM();
      var sqrt1MinusU1 = Math.sqrt(1 - u1);
      var sqrtU1 = Math.sqrt(u1);
      out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
      out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
      out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
      out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
      return out;
    }
    function invert(out, a) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var dot2 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
      var invDot = dot2 ? 1 / dot2 : 0;
      out[0] = -a0 * invDot;
      out[1] = -a1 * invDot;
      out[2] = -a2 * invDot;
      out[3] = a3 * invDot;
      return out;
    }
    function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      return out;
    }
    function fromMat3(out, m) {
      var fTrace = m[0] + m[4] + m[8];
      var fRoot;
      if (fTrace > 0) {
        fRoot = Math.sqrt(fTrace + 1);
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
      } else {
        var i = 0;
        if (m[4] > m[0])
          i = 1;
        if (m[8] > m[i * 3 + i])
          i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;
        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
      }
      return out;
    }
    function fromEuler(out, x, y, z) {
      var halfToRad = 0.5 * Math.PI / 180;
      x *= halfToRad;
      y *= halfToRad;
      z *= halfToRad;
      var sx = Math.sin(x);
      var cx = Math.cos(x);
      var sy = Math.sin(y);
      var cy = Math.cos(y);
      var sz = Math.sin(z);
      var cz = Math.cos(z);
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      return out;
    }
    function str(a) {
      return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    var clone = vec4.clone;
    exports.clone = clone;
    var fromValues = vec4.fromValues;
    exports.fromValues = fromValues;
    var copy = vec4.copy;
    exports.copy = copy;
    var set = vec4.set;
    exports.set = set;
    var add = vec4.add;
    exports.add = add;
    var mul = multiply;
    exports.mul = mul;
    var scale = vec4.scale;
    exports.scale = scale;
    var dot = vec4.dot;
    exports.dot = dot;
    var lerp = vec4.lerp;
    exports.lerp = lerp;
    var length = vec4.length;
    exports.length = length;
    var len = length;
    exports.len = len;
    var squaredLength = vec4.squaredLength;
    exports.squaredLength = squaredLength;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var normalize = vec4.normalize;
    exports.normalize = normalize;
    var exactEquals = vec4.exactEquals;
    exports.exactEquals = exactEquals;
    var equals = vec4.equals;
    exports.equals = equals;
    var rotationTo = function() {
      var tmpvec3 = vec318.create();
      var xUnitVec3 = vec318.fromValues(1, 0, 0);
      var yUnitVec3 = vec318.fromValues(0, 1, 0);
      return function(out, a, b) {
        var dot2 = vec318.dot(a, b);
        if (dot2 < -0.999999) {
          vec318.cross(tmpvec3, xUnitVec3, a);
          if (vec318.len(tmpvec3) < 1e-6)
            vec318.cross(tmpvec3, yUnitVec3, a);
          vec318.normalize(tmpvec3, tmpvec3);
          setAxisAngle(out, tmpvec3, Math.PI);
          return out;
        } else if (dot2 > 0.999999) {
          out[0] = 0;
          out[1] = 0;
          out[2] = 0;
          out[3] = 1;
          return out;
        } else {
          vec318.cross(tmpvec3, a, b);
          out[0] = tmpvec3[0];
          out[1] = tmpvec3[1];
          out[2] = tmpvec3[2];
          out[3] = 1 + dot2;
          return normalize(out, out);
        }
      };
    }();
    exports.rotationTo = rotationTo;
    var sqlerp = function() {
      var temp1 = create();
      var temp2 = create();
      return function(out, a, b, c, d, t) {
        slerp(temp1, a, d, t);
        slerp(temp2, b, c, t);
        slerp(out, temp1, temp2, 2 * t * (1 - t));
        return out;
      };
    }();
    exports.sqlerp = sqlerp;
    var setAxes = function() {
      var matr = mat3.create();
      return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];
        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];
        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        return normalize(out, fromMat3(out, matr));
      };
    }();
    exports.setAxes = setAxes;
  }
});

// node_modules/gl-matrix/cjs/quat2.js
var require_quat2 = __commonJS({
  "node_modules/gl-matrix/cjs/quat2.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.fromValues = fromValues;
    exports.fromRotationTranslationValues = fromRotationTranslationValues;
    exports.fromRotationTranslation = fromRotationTranslation;
    exports.fromTranslation = fromTranslation;
    exports.fromRotation = fromRotation;
    exports.fromMat4 = fromMat4;
    exports.copy = copy;
    exports.identity = identity;
    exports.set = set;
    exports.getDual = getDual;
    exports.setDual = setDual;
    exports.getTranslation = getTranslation;
    exports.translate = translate;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.rotateByQuatAppend = rotateByQuatAppend;
    exports.rotateByQuatPrepend = rotateByQuatPrepend;
    exports.rotateAroundAxis = rotateAroundAxis;
    exports.add = add;
    exports.multiply = multiply;
    exports.scale = scale;
    exports.lerp = lerp;
    exports.invert = invert;
    exports.conjugate = conjugate;
    exports.normalize = normalize;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.dot = exports.mul = exports.setReal = exports.getReal = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    var quat6 = _interopRequireWildcard(require_quat());
    var mat46 = _interopRequireWildcard(require_mat4());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var dq = new glMatrix.ARRAY_TYPE(8);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        dq[0] = 0;
        dq[1] = 0;
        dq[2] = 0;
        dq[4] = 0;
        dq[5] = 0;
        dq[6] = 0;
        dq[7] = 0;
      }
      dq[3] = 1;
      return dq;
    }
    function clone(a) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = a[0];
      dq[1] = a[1];
      dq[2] = a[2];
      dq[3] = a[3];
      dq[4] = a[4];
      dq[5] = a[5];
      dq[6] = a[6];
      dq[7] = a[7];
      return dq;
    }
    function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = x1;
      dq[1] = y1;
      dq[2] = z1;
      dq[3] = w1;
      dq[4] = x2;
      dq[5] = y2;
      dq[6] = z2;
      dq[7] = w2;
      return dq;
    }
    function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = x1;
      dq[1] = y1;
      dq[2] = z1;
      dq[3] = w1;
      var ax = x2 * 0.5, ay = y2 * 0.5, az = z2 * 0.5;
      dq[4] = ax * w1 + ay * z1 - az * y1;
      dq[5] = ay * w1 + az * x1 - ax * z1;
      dq[6] = az * w1 + ax * y1 - ay * x1;
      dq[7] = -ax * x1 - ay * y1 - az * z1;
      return dq;
    }
    function fromRotationTranslation(out, q, t) {
      var ax = t[0] * 0.5, ay = t[1] * 0.5, az = t[2] * 0.5, bx = q[0], by = q[1], bz = q[2], bw = q[3];
      out[0] = bx;
      out[1] = by;
      out[2] = bz;
      out[3] = bw;
      out[4] = ax * bw + ay * bz - az * by;
      out[5] = ay * bw + az * bx - ax * bz;
      out[6] = az * bw + ax * by - ay * bx;
      out[7] = -ax * bx - ay * by - az * bz;
      return out;
    }
    function fromTranslation(out, t) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = t[0] * 0.5;
      out[5] = t[1] * 0.5;
      out[6] = t[2] * 0.5;
      out[7] = 0;
      return out;
    }
    function fromRotation(out, q) {
      out[0] = q[0];
      out[1] = q[1];
      out[2] = q[2];
      out[3] = q[3];
      out[4] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      return out;
    }
    function fromMat4(out, a) {
      var outer = quat6.create();
      mat46.getRotation(outer, a);
      var t = new glMatrix.ARRAY_TYPE(3);
      mat46.getTranslation(t, a);
      fromRotationTranslation(out, outer, t);
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      return out;
    }
    function identity(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      return out;
    }
    function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
      out[0] = x1;
      out[1] = y1;
      out[2] = z1;
      out[3] = w1;
      out[4] = x2;
      out[5] = y2;
      out[6] = z2;
      out[7] = w2;
      return out;
    }
    var getReal = quat6.copy;
    exports.getReal = getReal;
    function getDual(out, a) {
      out[0] = a[4];
      out[1] = a[5];
      out[2] = a[6];
      out[3] = a[7];
      return out;
    }
    var setReal = quat6.copy;
    exports.setReal = setReal;
    function setDual(out, q) {
      out[4] = q[0];
      out[5] = q[1];
      out[6] = q[2];
      out[7] = q[3];
      return out;
    }
    function getTranslation(out, a) {
      var ax = a[4], ay = a[5], az = a[6], aw = a[7], bx = -a[0], by = -a[1], bz = -a[2], bw = a[3];
      out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      return out;
    }
    function translate(out, a, v) {
      var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3], bx1 = v[0] * 0.5, by1 = v[1] * 0.5, bz1 = v[2] * 0.5, ax2 = a[4], ay2 = a[5], az2 = a[6], aw2 = a[7];
      out[0] = ax1;
      out[1] = ay1;
      out[2] = az1;
      out[3] = aw1;
      out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
      out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
      out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
      out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
      return out;
    }
    function rotateX(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat6.rotateX(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateY(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat6.rotateY(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateZ(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat6.rotateZ(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateByQuatAppend(out, a, q) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3], ax = a[0], ay = a[1], az = a[2], aw = a[3];
      out[0] = ax * qw + aw * qx + ay * qz - az * qy;
      out[1] = ay * qw + aw * qy + az * qx - ax * qz;
      out[2] = az * qw + aw * qz + ax * qy - ay * qx;
      out[3] = aw * qw - ax * qx - ay * qy - az * qz;
      ax = a[4];
      ay = a[5];
      az = a[6];
      aw = a[7];
      out[4] = ax * qw + aw * qx + ay * qz - az * qy;
      out[5] = ay * qw + aw * qy + az * qx - ax * qz;
      out[6] = az * qw + aw * qz + ax * qy - ay * qx;
      out[7] = aw * qw - ax * qx - ay * qy - az * qz;
      return out;
    }
    function rotateByQuatPrepend(out, q, a) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3], bx = a[0], by = a[1], bz = a[2], bw = a[3];
      out[0] = qx * bw + qw * bx + qy * bz - qz * by;
      out[1] = qy * bw + qw * by + qz * bx - qx * bz;
      out[2] = qz * bw + qw * bz + qx * by - qy * bx;
      out[3] = qw * bw - qx * bx - qy * by - qz * bz;
      bx = a[4];
      by = a[5];
      bz = a[6];
      bw = a[7];
      out[4] = qx * bw + qw * bx + qy * bz - qz * by;
      out[5] = qy * bw + qw * by + qz * bx - qx * bz;
      out[6] = qz * bw + qw * bz + qx * by - qy * bx;
      out[7] = qw * bw - qx * bx - qy * by - qz * bz;
      return out;
    }
    function rotateAroundAxis(out, a, axis, rad) {
      if (Math.abs(rad) < glMatrix.EPSILON) {
        return copy(out, a);
      }
      var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
      rad = rad * 0.5;
      var s = Math.sin(rad);
      var bx = s * axis[0] / axisLength;
      var by = s * axis[1] / axisLength;
      var bz = s * axis[2] / axisLength;
      var bw = Math.cos(rad);
      var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3];
      out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      var ax = a[4], ay = a[5], az = a[6], aw = a[7];
      out[4] = ax * bw + aw * bx + ay * bz - az * by;
      out[5] = ay * bw + aw * by + az * bx - ax * bz;
      out[6] = az * bw + aw * bz + ax * by - ay * bx;
      out[7] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      return out;
    }
    function multiply(out, a, b) {
      var ax0 = a[0], ay0 = a[1], az0 = a[2], aw0 = a[3], bx1 = b[4], by1 = b[5], bz1 = b[6], bw1 = b[7], ax1 = a[4], ay1 = a[5], az1 = a[6], aw1 = a[7], bx0 = b[0], by0 = b[1], bz0 = b[2], bw0 = b[3];
      out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
      out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
      out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
      out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
      out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
      out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
      out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
      out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
      return out;
    }
    var mul = multiply;
    exports.mul = mul;
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      return out;
    }
    var dot = quat6.dot;
    exports.dot = dot;
    function lerp(out, a, b, t) {
      var mt = 1 - t;
      if (dot(a, b) < 0)
        t = -t;
      out[0] = a[0] * mt + b[0] * t;
      out[1] = a[1] * mt + b[1] * t;
      out[2] = a[2] * mt + b[2] * t;
      out[3] = a[3] * mt + b[3] * t;
      out[4] = a[4] * mt + b[4] * t;
      out[5] = a[5] * mt + b[5] * t;
      out[6] = a[6] * mt + b[6] * t;
      out[7] = a[7] * mt + b[7] * t;
      return out;
    }
    function invert(out, a) {
      var sqlen = squaredLength(a);
      out[0] = -a[0] / sqlen;
      out[1] = -a[1] / sqlen;
      out[2] = -a[2] / sqlen;
      out[3] = a[3] / sqlen;
      out[4] = -a[4] / sqlen;
      out[5] = -a[5] / sqlen;
      out[6] = -a[6] / sqlen;
      out[7] = a[7] / sqlen;
      return out;
    }
    function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      out[4] = -a[4];
      out[5] = -a[5];
      out[6] = -a[6];
      out[7] = a[7];
      return out;
    }
    var length = quat6.length;
    exports.length = length;
    var len = length;
    exports.len = len;
    var squaredLength = quat6.squaredLength;
    exports.squaredLength = squaredLength;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    function normalize(out, a) {
      var magnitude = squaredLength(a);
      if (magnitude > 0) {
        magnitude = Math.sqrt(magnitude);
        var a0 = a[0] / magnitude;
        var a1 = a[1] / magnitude;
        var a2 = a[2] / magnitude;
        var a3 = a[3] / magnitude;
        var b0 = a[4];
        var b1 = a[5];
        var b2 = a[6];
        var b3 = a[7];
        var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
        out[0] = a0;
        out[1] = a1;
        out[2] = a2;
        out[3] = a3;
        out[4] = (b0 - a0 * a_dot_b) / magnitude;
        out[5] = (b1 - a1 * a_dot_b) / magnitude;
        out[6] = (b2 - a2 * a_dot_b) / magnitude;
        out[7] = (b3 - a3 * a_dot_b) / magnitude;
      }
      return out;
    }
    function str(a) {
      return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7));
    }
  }
});

// node_modules/gl-matrix/cjs/vec2.js
var require_vec2 = __commonJS({
  "node_modules/gl-matrix/cjs/vec2.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.create = create;
    exports.clone = clone;
    exports.fromValues = fromValues;
    exports.copy = copy;
    exports.set = set;
    exports.add = add;
    exports.subtract = subtract;
    exports.multiply = multiply;
    exports.divide = divide;
    exports.ceil = ceil;
    exports.floor = floor;
    exports.min = min;
    exports.max = max;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.distance = distance;
    exports.squaredDistance = squaredDistance;
    exports.length = length;
    exports.squaredLength = squaredLength;
    exports.negate = negate;
    exports.inverse = inverse;
    exports.normalize = normalize;
    exports.dot = dot;
    exports.cross = cross;
    exports.lerp = lerp;
    exports.random = random;
    exports.transformMat2 = transformMat2;
    exports.transformMat2d = transformMat2d;
    exports.transformMat3 = transformMat3;
    exports.transformMat4 = transformMat4;
    exports.rotate = rotate;
    exports.angle = angle;
    exports.zero = zero;
    exports.str = str;
    exports.exactEquals = exactEquals;
    exports.equals = equals;
    exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(2);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(2);
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    function fromValues(x, y) {
      var out = new glMatrix.ARRAY_TYPE(2);
      out[0] = x;
      out[1] = y;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    function set(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      return out;
    }
    function round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0], y = b[1] - a[1];
      return Math.hypot(x, y);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0], y = b[1] - a[1];
      return x * x + y * y;
    }
    function length(a) {
      var x = a[0], y = a[1];
      return Math.hypot(x, y);
    }
    function squaredLength(a) {
      var x = a[0], y = a[1];
      return x * x + y * y;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      return out;
    }
    function normalize(out, a) {
      var x = a[0], y = a[1];
      var len2 = x * x + y * y;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = a[0] * len2;
      out[1] = a[1] * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1];
    }
    function cross(out, a, b) {
      var z = a[0] * b[1] - a[1] * b[0];
      out[0] = out[1] = 0;
      out[2] = z;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0], ay = a[1];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 || 1;
      var r = glMatrix.RANDOM() * 2 * Math.PI;
      out[0] = Math.cos(r) * scale2;
      out[1] = Math.sin(r) * scale2;
      return out;
    }
    function transformMat2(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[2] * y;
      out[1] = m[1] * x + m[3] * y;
      return out;
    }
    function transformMat2d(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[2] * y + m[4];
      out[1] = m[1] * x + m[3] * y + m[5];
      return out;
    }
    function transformMat3(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[3] * y + m[6];
      out[1] = m[1] * x + m[4] * y + m[7];
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0];
      var y = a[1];
      out[0] = m[0] * x + m[4] * y + m[12];
      out[1] = m[1] * x + m[5] * y + m[13];
      return out;
    }
    function rotate(out, a, b, rad) {
      var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
      out[0] = p0 * cosC - p1 * sinC + b[0];
      out[1] = p0 * sinC + p1 * cosC + b[1];
      return out;
    }
    function angle(a, b) {
      var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      return out;
    }
    function str(a) {
      return "vec2(" + a[0] + ", " + a[1] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1];
      var b0 = b[0], b1 = b[1];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
    }
    var len = length;
    exports.len = len;
    var sub = subtract;
    exports.sub = sub;
    var mul = multiply;
    exports.mul = mul;
    var div = divide;
    exports.div = div;
    var dist = distance;
    exports.dist = dist;
    var sqrDist = squaredDistance;
    exports.sqrDist = sqrDist;
    var sqrLen = squaredLength;
    exports.sqrLen = sqrLen;
    var forEach = function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 2;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
        }
        return a;
      };
    }();
    exports.forEach = forEach;
  }
});

// node_modules/gl-matrix/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/gl-matrix/cjs/index.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.vec4 = exports.vec3 = exports.vec2 = exports.quat2 = exports.quat = exports.mat4 = exports.mat3 = exports.mat2d = exports.mat2 = exports.glMatrix = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    exports.glMatrix = glMatrix;
    var mat2 = _interopRequireWildcard(require_mat2());
    exports.mat2 = mat2;
    var mat2d = _interopRequireWildcard(require_mat2d());
    exports.mat2d = mat2d;
    var mat3 = _interopRequireWildcard(require_mat3());
    exports.mat3 = mat3;
    var mat46 = _interopRequireWildcard(require_mat4());
    exports.mat4 = mat46;
    var quat6 = _interopRequireWildcard(require_quat());
    exports.quat = quat6;
    var quat22 = _interopRequireWildcard(require_quat2());
    exports.quat2 = quat22;
    var vec23 = _interopRequireWildcard(require_vec2());
    exports.vec2 = vec23;
    var vec318 = _interopRequireWildcard(require_vec3());
    exports.vec3 = vec318;
    var vec4 = _interopRequireWildcard(require_vec4());
    exports.vec4 = vec4;
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
  }
});

// src/Game.ts
var Game = class {
  constructor(entityManager) {
    this.prevTimestamp = 0;
    this.deltaTime = 0;
    this.systems = /* @__PURE__ */ new Set();
    this.entityManager = entityManager;
    this.gameLoop = this.gameLoop.bind(this);
  }
  addSystem(system) {
    this.systems.add(system);
  }
  addSystems(systems) {
    systems.forEach((system) => this.systems.add(system));
  }
  gameLoop() {
    const currentTimeStamp = performance.now();
    this.deltaTime = (currentTimeStamp - this.prevTimestamp) / 1e3;
    this.prevTimestamp = currentTimeStamp;
    this.update(this.deltaTime);
    this.render();
    requestAnimationFrame(this.gameLoop);
  }
  update(deltaTime) {
    for (const system of this.systems) {
      system.update(deltaTime, this.entityManager);
    }
  }
  render() {
    for (const system of this.systems) {
      system.render(this.entityManager);
    }
  }
  async run() {
    for (const system of this.systems) {
      await system.preload(this.entityManager);
    }
    this.gameLoop();
  }
};

// src/WebGLCanvas.ts
var WebGLCanvas = class {
  constructor(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const gl = canvas.getContext("webgl2");
    if (!gl)
      throw new Error("Failed to initialize GL context.");
    this.gl = gl;
    this.width = width;
    this.height = height;
    document.body.appendChild(canvas);
  }
  clear() {
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  setViewPort() {
    this.gl.viewport(0, 0, this.width, this.height);
  }
};

// src/buffers/Buffer.ts
var GLBuffer = class {
  constructor(gl, buffers, contextBase) {
    this.gl = gl;
    this.buffers = buffers;
    this.contextBase = contextBase;
  }
  createBuffer(name, data) {
    const indexBuffer = this.gl.createBuffer();
    if (!indexBuffer)
      return;
    this.buffers.set(name, indexBuffer);
    this.bindBuffer(name);
    this.gl.bufferData(this.contextBase, data, this.gl.STATIC_DRAW);
    this.unbindBuffer(name);
  }
  associateWithAttribute(name, program, attribute, size, type, stride, offset) {
    if (!this.buffers.get(name))
      return;
    this.bindBuffer(name);
    const attributeLocation = this.gl.getAttribLocation(program, attribute);
    this.gl.vertexAttribPointer(attributeLocation, size, type, false, stride, offset);
    this.gl.enableVertexAttribArray(attributeLocation);
    this.unbindBuffer(name);
  }
  bindBuffer(name) {
    const buffer = this.buffers.get(name);
    if (!buffer)
      return;
    this.gl.bindBuffer(this.contextBase, buffer);
  }
  unbindBuffer(name) {
    const buffer = this.buffers.get(name);
    if (!buffer)
      return;
    this.gl.bindBuffer(this.contextBase, null);
  }
  getBuffer(name) {
    return this.buffers.get(name);
  }
};

// src/buffers/ColorBuffer.ts
var ColorBuffer = class extends GLBuffer {
  constructor(gl) {
    super(gl, /* @__PURE__ */ new Map(), gl.ARRAY_BUFFER);
  }
};

// src/buffers/IBO.ts
var IBO = class extends GLBuffer {
  constructor(gl) {
    super(gl, /* @__PURE__ */ new Map(), gl.ELEMENT_ARRAY_BUFFER);
  }
};

// src/buffers/VBO.ts
var VBO = class extends GLBuffer {
  constructor(gl) {
    super(gl, /* @__PURE__ */ new Map(), gl.ARRAY_BUFFER);
  }
};

// src/buffers/UV.ts
var UV = class extends GLBuffer {
  constructor(gl) {
    super(gl, /* @__PURE__ */ new Map(), gl.ARRAY_BUFFER);
  }
};

// src/buffers/BufferManager.ts
var BufferManager = class {
  constructor(gl) {
    this.gl = gl;
    this.vbos = /* @__PURE__ */ new Map();
    this.ibos = /* @__PURE__ */ new Map();
    this.uvs = /* @__PURE__ */ new Map();
    this.colorBuffers = /* @__PURE__ */ new Map();
  }
  createVBO(id, data) {
    const vbo = new VBO(this.gl);
    vbo.createBuffer(id, data);
    this.vbos.set(id, vbo);
  }
  createIBO(id, data) {
    const ibo = new IBO(this.gl);
    ibo.createBuffer(id, data);
    this.ibos.set(id, ibo);
  }
  createUV(id, data) {
    const uv = new UV(this.gl);
    uv.createBuffer(id, data);
    this.uvs.set(id, uv);
  }
  createColorBuffer(id, data) {
    const colorBuffer = new ColorBuffer(this.gl);
    colorBuffer.createBuffer(id, data);
    this.colorBuffers.set(id, colorBuffer);
  }
  createBuffers(id, renderComponent) {
    this.createVBO(id, new Float32Array(renderComponent.vertices));
    this.createIBO(id, new Uint16Array(renderComponent.indices));
    if (renderComponent.uvs) {
      this.createUV(id, new Float32Array(renderComponent.uvs));
    }
  }
  bindVBO(id) {
    const vbo = this.vbos.get(id);
    if (vbo)
      vbo.bindBuffer(id);
    else
      console.warn(`Failed to get VBO for entity with ID: ${id}`);
  }
  bindIBO(id) {
    const ibo = this.ibos.get(id);
    if (ibo)
      ibo.bindBuffer(id);
    else
      console.warn(`Failed to get IBO for entity with ID: ${id}`);
  }
  bindColorBuffer(id) {
    const colorBuffer = this.colorBuffers.get(id);
    if (colorBuffer)
      colorBuffer.bindBuffer(id);
    else
      console.warn(`Failed to get Color Buffer for entity with ID: ${id}`);
  }
  bindUV(id) {
    const uv = this.uvs.get(id);
    if (uv)
      uv.bindBuffer(id);
    else
      console.warn(`Failed to get UV for entity with ID: ${id}`);
  }
  bindBuffers(id) {
    this.bindVBO(id);
    this.bindIBO(id);
  }
  unbindVBO(id) {
    const vbo = this.vbos.get(id);
    if (vbo)
      vbo.unbindBuffer(id);
    else
      console.warn(`Failed to get VBO for entity with ID: ${id}`);
  }
  unbindIBO(id) {
    const ibo = this.ibos.get(id);
    if (ibo)
      ibo.unbindBuffer(id);
    else
      console.warn(`Failed to get IBO for entity with ID: ${id}`);
  }
  unbindColorBuffer(id) {
    const colorBuffer = this.colorBuffers.get(id);
    if (colorBuffer)
      colorBuffer.unbindBuffer(id);
    else
      console.warn(`Failed to get Color Buffer for entity with ID: ${id}`);
  }
  unbindUV(id) {
    const uv = this.uvs.get(id);
    if (uv)
      uv.unbindBuffer(id);
    else
      console.warn(`Failed to get UV for entity with ID: ${id}`);
  }
  inbindBuffers(id) {
    this.unbindVBO(id);
    this.unbindIBO(id);
  }
  associateVBOWithAttribute(id, program, attribute, size, type, stride, offset) {
    const vbo = this.vbos.get(id);
    if (vbo)
      vbo.associateWithAttribute(id, program.program, attribute, size, type, stride, offset);
    else
      console.warn(`Failed to get VBO for entity with ID: ${id}`);
  }
  associateIBOWithAttribute(id, program, attribute, size, type, stride, offset) {
    const ibo = this.ibos.get(id);
    if (ibo)
      ibo.associateWithAttribute(id, program.program, attribute, size, type, stride, offset);
    else
      console.warn(`Failed to get IBO for entity with ID: ${id}`);
  }
  associateColorBufferWithAttribute(id, program, attribute, size, type, stride, offset) {
    const colorBuffer = this.colorBuffers.get(id);
    if (colorBuffer)
      colorBuffer.associateWithAttribute(id, program.program, attribute, size, type, stride, offset);
    else
      console.warn(`Failed to get Color Buffer for entity with ID: ${id}`);
  }
  associateUVWithAttribute(id, program, attribute, size, type, stride, offset) {
    const uv = this.uvs.get(id);
    if (uv)
      uv.associateWithAttribute(id, program.program, attribute, size, type, stride, offset);
    else
      console.warn(`Failed to get UV for entity with ID: ${id}`);
  }
};

// src/config.ts
var import_gl_matrix = __toESM(require_cjs());
var config = {
  canvasWidth: 1600,
  canvasHeight: 900,
  cameraPosition: import_gl_matrix.vec3.fromValues(0, -10, -8),
  cameraRotation: import_gl_matrix.quat.create(),
  cameraSpeed: 0.05,
  mouseSensitivity: 2
};

// src/entities/EntitiyInitializer.ts
var import_gl_matrix11 = __toESM(require_cjs());

// src/entities/createCubeEntity.ts
var import_gl_matrix8 = __toESM(require_cjs());

// src/entities/EntityBuilder.ts
var import_gl_matrix7 = __toESM(require_cjs());

// src/ShaderProgram.ts
var ShaderProgram = class {
  constructor(gl) {
    this.gl = gl;
    this.vertexShader = void 0;
    this.fragmentShader = void 0;
    this.shaderProgram = void 0;
  }
  async loadShaderSource(url) {
    const response = await fetch(url);
    return response.text();
  }
  async initializeShaders(vertexShaderUrl, fragmentShaderUrl) {
    const vertexShaderSource = await this.loadShaderSource(vertexShaderUrl);
    const fragmentShaderSource = await this.loadShaderSource(fragmentShaderUrl);
    this.vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    this.fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (this.vertexShader && this.fragmentShader) {
      this.create();
    }
  }
  compileShader(type, source) {
    const shader = this.gl.createShader(type);
    if (!shader)
      return void 0;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return void 0;
    }
    return shader;
  }
  create() {
    const shaderProgram = this.gl.createProgram();
    if (!shaderProgram || !this.vertexShader || !this.fragmentShader)
      return;
    this.gl.attachShader(shaderProgram, this.vertexShader);
    this.gl.attachShader(shaderProgram, this.fragmentShader);
    this.gl.linkProgram(shaderProgram);
    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.error("Shader program linking error:", this.gl.getProgramInfoLog(shaderProgram));
      return;
    }
    this.gl.useProgram(shaderProgram);
    this.gl.deleteShader(this.vertexShader);
    this.gl.deleteShader(this.fragmentShader);
    this.shaderProgram = shaderProgram;
  }
  use() {
    if (!this.program)
      return;
    this.gl.useProgram(this.program);
  }
  get program() {
    return this.shaderProgram;
  }
  setUniform3f(uniformName, vectors) {
    if (!this.program)
      return;
    this.use();
    const location = this.gl.getUniformLocation(this.program, uniformName);
    if (!location)
      return;
    this.gl.uniform3f(location, vectors[0], vectors[1], vectors[2]);
  }
  setUniform1i(uniformName, vector) {
    if (!this.program)
      return;
    this.use();
    const location = this.gl.getUniformLocation(this.program, uniformName);
    if (!location)
      return;
    this.gl.uniform1i(location, vector);
  }
  setUniform1f(uniformName, vector) {
    if (!this.program)
      return;
    this.use();
    const location = this.gl.getUniformLocation(this.program, uniformName);
    if (!location)
      return;
    this.gl.uniform1f(location, vector);
  }
  setUniformMatrix4fv(uniformName, matrix) {
    if (!this.program)
      return;
    this.use();
    const location = this.gl.getUniformLocation(this.program, uniformName);
    if (!location)
      return;
    this.gl.uniformMatrix4fv(location, false, matrix);
  }
};

// src/components/CollisionComponent.ts
var import_gl_matrix2 = __toESM(require_cjs());

// src/utils/utils.ts
function* seedSequence() {
  let seed = Date.now();
  while (true) {
    seed = (seed * 9301 + 49297) % 233280;
    yield seed;
  }
}
var seedGenerator = seedSequence();
var integer = (min, max) => {
  const range = max - min + 1;
  const nextSeed = seedGenerator.next().value;
  return Math.floor(nextSeed / 233280 * range) + min;
};
var UUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = integer(0, 15);
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};

// src/components/Component.ts
var Component = class {
  constructor(name) {
    this.id = UUID();
    this.name = name;
  }
  getId() {
    return this.id;
  }
};

// src/components/CollisionComponent.ts
var CollisionComponent = class extends Component {
  constructor(size) {
    super("CollisionComponent");
    this.size = size;
    this.center = import_gl_matrix2.vec3.create();
  }
};

// src/components/MaterialComponent.ts
var MaterialComponent = class extends Component {
  // Transparency of the material (0.0: fully opaque, 1.0: fully transparent)
  constructor(color, shininess = 32, transparency = 0, texture) {
    super("MaterialComponent");
    this.color = color;
    this.shininess = shininess;
    this.transparency = transparency;
    this.texture = texture;
  }
};

// src/components/RigidBodyComponent.ts
var import_gl_matrix3 = __toESM(require_cjs());
var RigidBodyComponent = class extends Component {
  constructor(mass, isStatic = false) {
    super("RigidBodyComponent");
    this.mass = mass;
    this.velocity = import_gl_matrix3.vec3.create();
    this.acceleration = import_gl_matrix3.vec3.create();
    this.angularVelocity = import_gl_matrix3.vec3.create();
    this.angularAcceleration = import_gl_matrix3.vec3.create();
    this.orientation = import_gl_matrix3.quat.create();
    this.angularDamping = 0.1;
    this.restitution = 0.5;
    this.friction = 0.5;
    this.isStatic = isStatic;
  }
};

// src/components/TransformComponent.ts
var import_gl_matrix4 = __toESM(require_cjs());
var TransformComponent = class extends Component {
  constructor(position = import_gl_matrix4.vec3.create(), rotation = import_gl_matrix4.quat.create(), scale = import_gl_matrix4.vec3.fromValues(1, 1, 1)) {
    super("TransformComponent");
    this.modelMatrix = import_gl_matrix4.mat4.create();
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }
  moveForward(distance) {
    const forward = import_gl_matrix4.vec3.fromValues(0, 0, 1);
    import_gl_matrix4.vec3.transformQuat(forward, forward, this.rotation);
    import_gl_matrix4.vec3.scaleAndAdd(this.position, this.position, forward, distance);
  }
  moveBackward(distance) {
    const backward = import_gl_matrix4.vec3.fromValues(0, 0, -1);
    import_gl_matrix4.vec3.transformQuat(backward, backward, this.rotation);
    import_gl_matrix4.vec3.scaleAndAdd(this.position, this.position, backward, distance);
  }
  moveLeft(distance) {
    const left = import_gl_matrix4.vec3.fromValues(1, 0, 0);
    import_gl_matrix4.vec3.transformQuat(left, left, this.rotation);
    import_gl_matrix4.vec3.scaleAndAdd(this.position, this.position, left, distance);
  }
  moveRight(distance) {
    const right = import_gl_matrix4.vec3.fromValues(-1, 0, 0);
    import_gl_matrix4.vec3.transformQuat(right, right, this.rotation);
    import_gl_matrix4.vec3.scaleAndAdd(this.position, this.position, right, distance);
  }
  rotateX(angle) {
    import_gl_matrix4.quat.rotateX(this.rotation, this.rotation, angle);
  }
  rotateY(angle) {
    import_gl_matrix4.quat.rotateY(this.rotation, this.rotation, angle);
  }
  rotateZ(angle) {
    import_gl_matrix4.quat.rotateZ(this.rotation, this.rotation, angle);
  }
  getRotationQuat() {
    const quatX = import_gl_matrix4.quat.create();
    const quatY = import_gl_matrix4.quat.create();
    const quatZ = import_gl_matrix4.quat.create();
    import_gl_matrix4.quat.setAxisAngle(quatX, [1, 0, 0], this.rotation[0]);
    import_gl_matrix4.quat.setAxisAngle(quatY, [0, 1, 0], this.rotation[1]);
    import_gl_matrix4.quat.setAxisAngle(quatZ, [0, 0, 1], this.rotation[2]);
    const resultQuat = import_gl_matrix4.quat.create();
    import_gl_matrix4.quat.multiply(resultQuat, quatY, quatX);
    import_gl_matrix4.quat.multiply(resultQuat, quatZ, resultQuat);
    return resultQuat;
  }
};

// src/components/lights/LightComponent.ts
var import_gl_matrix5 = __toESM(require_cjs());
var LightComponent = class extends Component {
  // Type identifier for the light (e.g., "point", "directional", "spot")
  constructor(color, intensity, type) {
    super("LightComponent");
    // The intensity/brightness of the light
    this.direction = import_gl_matrix5.vec3.create();
    this.combinedLightColor = import_gl_matrix5.vec3.create();
    this.color = color;
    this.intensity = intensity;
    this.type = type;
  }
};

// src/components/lights/SpotLightComponent.ts
var SpotLightComponent = class extends LightComponent {
  constructor(color, intensity, position, direction, angle, innerConeAngle, outerConeAngle, cutoffAngle) {
    super(color, intensity, "spot" /* Spot */);
    this.position = position;
    this.direction = direction;
    this.angle = angle;
    this.innerConeAngle = innerConeAngle;
    this.outerConeAngle = outerConeAngle;
    this.cutoffAngle = cutoffAngle;
  }
};

// src/components/rendering/RenderComponent.ts
var RenderComponent = class extends Component {
  constructor(vertices, indices, normals, uvs, shaderProgram) {
    super("RenderComponent");
    this.vertices = vertices;
    this.indices = indices;
    this.normals = normals;
    this.uvs = uvs;
    this.shaderProgram = shaderProgram;
  }
};

// src/components/rendering/SkyboxComponent.ts
var SkyboxComponent = class extends Component {
  constructor() {
    super("SkyboxComponent");
  }
};

// src/components/rendering/TerrainComponent.ts
var TerrainComponent = class extends Component {
  constructor() {
    super("TerrainComponent");
  }
};

// src/utils/TerrainUtils.ts
var import_gl_matrix6 = __toESM(require_cjs());
var TerrainUtils = class {
  static fractalBrownianMotion(x, y, octaves, lacunarity, persistence) {
    let frequency = 1;
    let amplitude = 1;
    let noiseValue = 0;
    for (let o = 0; o < octaves; o++) {
      const xCoord = x * frequency;
      const yCoord = y * frequency;
      const noise = this.perlin(xCoord, yCoord);
      noiseValue += noise * amplitude;
      frequency *= lacunarity;
      amplitude *= persistence;
    }
    return noiseValue;
  }
  static generateHeightMap(width, height, frequency, amplitude, octaves) {
    const heightMap = new Array(height).fill(0).map(() => new Array(width).fill(0));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let noiseValue = 0;
        let frequencyTemp = frequency;
        let amplitudeTemp = amplitude;
        for (let o = 0; o < octaves; o++) {
          const xCoord = x * frequencyTemp;
          const yCoord = y * frequencyTemp;
          const noise = this.fractalBrownianMotion(xCoord, yCoord, octaves, 2, 0.6);
          noiseValue += noise * amplitudeTemp;
          frequencyTemp *= 2;
          amplitudeTemp *= 0.5;
        }
        noiseValue = noiseValue * 2 - 1;
        heightMap[y][x] = noiseValue;
      }
    }
    return heightMap;
  }
  static interpolate(a0, a1, w) {
    if (0 > w)
      return a0;
    if (1 < w)
      return a1;
    return (a1 - a0) * ((w * (w * 6 - 15) + 10) * w * w * w) + a0;
  }
  static randomGradient(ix, iy) {
    const w = 8 * 32;
    const s = w / 2;
    let a = ix, b = iy;
    a *= 3284157443;
    b ^= a << s | a >>> w - s;
    b *= 1911520717;
    a ^= b << s | b >>> w - s;
    a *= 2048419325;
    const random = a * (Math.PI / ~(~0 >>> 1));
    const v = [Math.cos(random), Math.sin(random)];
    return v;
  }
  static dotGridGradient(ix, iy, x, y) {
    const gradient = this.randomGradient(ix, iy);
    const dx = x - ix;
    const dy = y - iy;
    return dx * gradient[0] + dy * gradient[1];
  }
  static perlin(x, y) {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;
    const sx = x - x0;
    const sy = y - y0;
    let n0, n1, ix0, ix1, value;
    n0 = this.dotGridGradient(x0, y0, x, y);
    n1 = this.dotGridGradient(x1, y0, x, y);
    ix0 = this.interpolate(n0, n1, sx);
    n0 = this.dotGridGradient(x0, x1, x, y);
    n1 = this.dotGridGradient(x1, y1, x, y);
    ix1 = this.interpolate(n0, n1, sx);
    value = this.interpolate(ix0, ix1, sy);
    return value;
  }
  static computeVertexNormals(vertices, indices) {
    const faceNormals = [];
    const vertexNormals = new Array(vertices.length / 3).fill(import_gl_matrix6.vec3.create());
    for (let i = 0; i < indices.length; i += 3) {
      const p1 = indices[i] * 3;
      const p2 = indices[i + 1] * 3;
      const p3 = indices[i + 2] * 3;
      const v1 = import_gl_matrix6.vec3.fromValues(vertices[p1], vertices[p1 + 1], vertices[p1 + 2]);
      const v2 = import_gl_matrix6.vec3.fromValues(vertices[p2], vertices[p2 + 1], vertices[p2 + 2]);
      const v3 = import_gl_matrix6.vec3.fromValues(vertices[p3], vertices[p3 + 1], vertices[p3 + 2]);
      const edge1 = import_gl_matrix6.vec3.create();
      const edge2 = import_gl_matrix6.vec3.create();
      import_gl_matrix6.vec3.subtract(edge1, v2, v1);
      import_gl_matrix6.vec3.subtract(edge2, v3, v1);
      const faceNormal = import_gl_matrix6.vec3.create();
      import_gl_matrix6.vec3.cross(faceNormal, edge1, edge2);
      import_gl_matrix6.vec3.normalize(faceNormal, faceNormal);
      faceNormals.push(faceNormal);
    }
    for (let i = 0; i < indices.length; i++) {
      const vertexIndex = indices[i];
      import_gl_matrix6.vec3.add(vertexNormals[vertexIndex], vertexNormals[vertexIndex], faceNormals[Math.floor(i / 3)]);
    }
    vertexNormals.forEach((normal) => {
      import_gl_matrix6.vec3.normalize(normal, normal);
    });
    return vertexNormals;
  }
};

// src/utils/MeshUtils.ts
var MeshUtils = class {
  static generateGridMesh(rows, cols, heightmap) {
    const terrainSizeX = heightmap ? heightmap[0].length : rows;
    const terrainSizeZ = heightmap ? heightmap.length : cols;
    const terrainScaleY = 4;
    const vertices = [];
    const indices = [];
    for (let z = 0; z < terrainSizeZ; z++) {
      for (let x = 0; x < terrainSizeX; x++) {
        const height = heightmap ? heightmap[z][x] * terrainScaleY : 1;
        vertices.push(x, height, z);
      }
    }
    for (let z = 0; z < terrainSizeZ - 1; z++) {
      for (let x = 0; x < terrainSizeX - 1; x++) {
        const topLeft = z * terrainSizeX + x;
        const topRight = topLeft + 1;
        const bottomLeft = (z + 1) * terrainSizeX + x;
        const bottomRight = bottomLeft + 1;
        indices.push(topLeft, bottomLeft, topRight);
        indices.push(topRight, bottomLeft, bottomRight);
      }
    }
    const normals = TerrainUtils.computeVertexNormals(vertices, indices);
    return { vertices, indices, normals };
  }
  static generateCubeMesh(size) {
    const halfSize = size / 2;
    const vertices = [
      // Front face
      -halfSize,
      -halfSize,
      halfSize,
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      halfSize,
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      // Back face
      halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      -halfSize,
      // Top face (counter-clockwise order)
      -halfSize,
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      // Bottom face (counter-clockwise order)
      -halfSize,
      -halfSize,
      halfSize,
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      // Left face
      -halfSize,
      -halfSize,
      -halfSize,
      -halfSize,
      halfSize,
      -halfSize,
      -halfSize,
      halfSize,
      halfSize,
      -halfSize,
      -halfSize,
      halfSize,
      // Right face
      halfSize,
      -halfSize,
      halfSize,
      halfSize,
      halfSize,
      halfSize,
      halfSize,
      halfSize,
      -halfSize,
      halfSize,
      -halfSize,
      -halfSize
    ];
    const indices = [
      0,
      1,
      2,
      0,
      2,
      3,
      // Front face
      4,
      5,
      6,
      4,
      6,
      7,
      // Back face
      8,
      9,
      10,
      8,
      10,
      11,
      // Top face
      12,
      13,
      14,
      12,
      14,
      15,
      // Bottom face
      16,
      17,
      18,
      16,
      18,
      19,
      // Left face
      20,
      21,
      22,
      20,
      22,
      23
      // Right face
    ];
    const normals = TerrainUtils.computeVertexNormals(vertices, indices);
    const uvs = this.generateCubeUVs();
    return { vertices, indices, normals, uvs };
  }
  static generateCubeUVs() {
    return [
      // Front
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      // Back
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      // Top
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      // Bottom
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      // Right
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      // Left
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ];
  }
};

// src/utils/TextureUtils.ts
var TextureUtils = class {
  static async loadTexture(gl, imageSrc) {
    return new Promise((resolve, reject) => {
      const texture = gl.createTexture();
      if (!texture)
        return reject();
      const image = new Image();
      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        return resolve(texture);
      };
      image.onerror = reject;
      image.src = imageSrc;
    });
  }
  static async loadTextures(gl, imageSrcList) {
    return new Promise((resolve, reject) => {
      const textures = [];
      for (const imageSrc of imageSrcList) {
        const texture = gl.createTexture();
        if (!texture)
          return reject();
        const image = new Image();
        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.generateMipmap(gl.TEXTURE_2D);
          textures.push(texture);
        };
        image.onerror = reject;
        image.src = imageSrc;
      }
      if (textures.length === imageSrcList.length) {
        return resolve(textures);
      }
    });
  }
  static async loadCubeMapTexture(gl, imageSrcList) {
    return new Promise((resolve, reject) => {
      const texture = gl.createTexture();
      if (!texture)
        return reject("Failed to create WebGL texture.");
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (imageSrcList.length !== 6) {
        return reject("You must provide exactly 6 images for the cube map.");
      }
      const images = [];
      let loadedImages = 0;
      for (let i = 0; i < imageSrcList.length; i++) {
        const image = new Image();
        image.onload = () => {
          images[i] = image;
          loadedImages++;
          if (loadedImages === 6) {
            for (let face = 0; face < 6; face++) {
              gl.texImage2D(
                gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
                // Cube map face
                0,
                // Level
                gl.RGBA,
                // Internal format
                gl.RGBA,
                // Format
                gl.UNSIGNED_BYTE,
                // Type
                images[face]
                // Image data
              );
            }
            resolve(texture);
          }
        };
        image.onerror = () => reject(`Failed to load image: ${imageSrcList[i]}`);
        image.src = imageSrcList[i];
      }
    });
  }
};

// src/entities/Entity.ts
var Entity = class {
  constructor() {
    this.components = /* @__PURE__ */ new Map();
    this.id = UUID();
  }
  addComponent(componentName, component) {
    this.components.set(componentName, component);
    return component;
  }
  hasComponent(componentName) {
    return this.components.has(componentName);
  }
  getComponent(componentName) {
    return this.components.get(componentName);
  }
  getComponents() {
    return Array.from(this.components.values());
  }
  removeComponent(componentName) {
    this.components.delete(componentName);
  }
  removeComponents() {
    this.components.clear();
  }
};

// src/entities/EntityBuilder.ts
var EntityBuilder = class {
  constructor(webGLContext) {
    this.isSkybox = false;
    this.isTerrain = false;
    this.isRigidBody = false;
    this.meshSize = 1;
    this.gridSize = {
      rows: 200,
      cols: 200
    };
    this.lightProperties = {
      color: import_gl_matrix7.vec3.fromValues(1, 1, 1),
      intensity: 1,
      position: import_gl_matrix7.vec3.create(),
      direction: import_gl_matrix7.vec3.create(),
      angle: 10,
      innerConeAngle: 10,
      outerConeAngle: 5,
      cutoffAngle: 10
    };
    this.materialProperties = {
      color: import_gl_matrix7.vec3.fromValues(1, 1, 1),
      shinyness: 0.8,
      transparency: 1
    };
    this.position = import_gl_matrix7.vec3.create();
    this.collisionSize = import_gl_matrix7.vec3.create();
    this.physicsProperties = {
      mass: 5,
      isStatic: false
      // Whether the rigid body is immovable
    };
    this.webGLContext = webGLContext;
  }
  setMeshSize(size) {
    this.meshSize = size;
    return this;
  }
  setHeightMap(width, height, frequency, amplitude, octaves) {
    this.heightMap = TerrainUtils.generateHeightMap(width, height, frequency, amplitude, octaves);
  }
  setPhysicsProperties(physicsProperties) {
    this.physicsProperties = { ...this.physicsProperties, ...physicsProperties };
    return this;
  }
  setTextureSrc(src) {
    if (this.isSkybox)
      throw new Error("Assign 6 textures for a skybox.");
    this.textureSrc = src;
    return this;
  }
  setTextureSrcList(srcList) {
    if (!this.isSkybox)
      throw new Error("Only one texture if not skybox.");
    this.textureSrcList = srcList;
    return this;
  }
  setLightProperties(lightProperties) {
    this.lightProperties = { ...this.lightProperties, ...lightProperties };
    return this;
  }
  setCollisionSize(size) {
    this.collisionSize = size;
    return this;
  }
  setIsTerrain() {
    this.isTerrain = true;
    return this;
  }
  setIsSkybox() {
    this.isSkybox = true;
    return this;
  }
  setIsRigidBody() {
    this.isRigidBody = true;
    return this;
  }
  setVertexShader(vertexShaderSource) {
    this.vertexShaderSource = vertexShaderSource;
    return this;
  }
  setFragmentShader(fragmentShaderSource) {
    this.fragmentShaderSource = fragmentShaderSource;
    return this;
  }
  setMaterialProperties(materialProperties) {
    this.materialProperties = { ...this.materialProperties, ...materialProperties };
    return this;
  }
  setGridSize(gridSize) {
    this.gridSize = gridSize;
    return this;
  }
  setPosition(position) {
    this.position = position;
    return this;
  }
  async build() {
    const entity = new Entity();
    if (!this.vertexShaderSource || !this.fragmentShaderSource) {
      throw new Error("Assign a vertex and a fragment shader to Entity.");
    }
    const shaderProgram = new ShaderProgram(this.webGLContext);
    await shaderProgram.initializeShaders(this.vertexShaderSource, this.fragmentShaderSource);
    const meshData = this.generateMesh();
    if (!meshData.vertices || !meshData.indices || !meshData.normals) {
      throw new Error("Failed to generate mesh.");
    }
    const texture = await this.loadTexture();
    const materialComponent = this.createMaterialComponent(texture);
    const renderComponent = this.createRenderComponent(meshData, shaderProgram);
    if (!this.isSkybox) {
      const lightComponent = this.createSpotLightComponent();
      const transformComponent = this.createTransformComponent();
      entity.addComponent("TransformComponent", transformComponent);
      entity.addComponent("LightComponent", lightComponent);
    } else {
      entity.addComponent("SkyboxComponent", new SkyboxComponent());
    }
    if (this.isRigidBody) {
      const rigidBodyComponent = this.createRigidBodyComponent(this.physicsProperties);
      entity.addComponent("RigidBodyComponent", rigidBodyComponent);
      entity.addComponent("CollisionComponent", new CollisionComponent(this.collisionSize));
    }
    if (this.isTerrain) {
      const terrainComponent = new TerrainComponent();
      entity.addComponent("TerrainComponent", terrainComponent);
    }
    entity.addComponent("RenderComponent", renderComponent);
    entity.addComponent("MaterialComponent", materialComponent);
    return entity;
  }
  async loadTexture() {
    if (this.isSkybox && this.textureSrcList) {
      return await TextureUtils.loadCubeMapTexture(this.webGLContext, this.textureSrcList);
    } else if (!this.isSkybox && this.textureSrc) {
      return await TextureUtils.loadTexture(this.webGLContext, this.textureSrc);
    } else {
      throw new Error("Failed to load texture.");
    }
  }
  generateMesh() {
    if (this.isTerrain) {
      return MeshUtils.generateGridMesh(this.gridSize.rows, this.gridSize.cols, this.heightMap);
    } else {
      return MeshUtils.generateCubeMesh(this.meshSize);
    }
  }
  createSpotLightComponent() {
    return new SpotLightComponent(
      this.lightProperties.color,
      this.lightProperties.intensity,
      this.lightProperties.position,
      this.lightProperties.direction,
      this.lightProperties.angle,
      this.lightProperties.innerConeAngle,
      this.lightProperties.outerConeAngle,
      this.lightProperties.cutoffAngle
    );
  }
  createTransformComponent() {
    return new TransformComponent(this.position);
  }
  createRenderComponent(meshData, shaderProgram) {
    return new RenderComponent(meshData.vertices, meshData.indices, meshData.normals, meshData.uvs, shaderProgram);
  }
  createMaterialComponent(texture) {
    return new MaterialComponent(
      this.materialProperties.color,
      this.materialProperties.shinyness,
      this.materialProperties.transparency,
      texture
    );
  }
  createRigidBodyComponent(physicsProperties) {
    return new RigidBodyComponent(
      physicsProperties.mass,
      physicsProperties.isStatic
    );
  }
};

// src/entities/createCubeEntity.ts
async function createCubeEntity(webGLContext, position) {
  const size = 1;
  const mass = size;
  const cube = await new EntityBuilder(webGLContext).setIsRigidBody().setFragmentShader("./shaders/frag-shader.frag").setVertexShader("./shaders/vert-shader.vert").setMeshSize(size).setPhysicsProperties({
    isStatic: false,
    mass
  }).setCollisionSize(import_gl_matrix8.vec3.fromValues(size, size, size)).setTextureSrc("./assets/prototype/Orange/texture_01.png").setMaterialProperties({
    color: import_gl_matrix8.vec3.fromValues(0.15, 0.15, 0.15),
    shinyness: 0.8,
    transparency: 1
  }).setPosition(position).build();
  return cube;
}

// src/entities/createSkyBox.ts
var import_gl_matrix9 = __toESM(require_cjs());
async function createSkybox(webGLContext) {
  const skybox = new EntityBuilder(webGLContext).setIsSkybox().setFragmentShader("./shaders/skybox-frag-shader.frag").setVertexShader("./shaders/skybox-vert-shader.vert").setMeshSize(1e4).setTextureSrcList([
    "./assets/skybox/daylight/Daylight Box_Left.bmp",
    "./assets/skybox/daylight/Daylight Box_Right.bmp",
    "./assets/skybox/daylight/Daylight Box_Top.png",
    "./assets/skybox/daylight/Daylight Box_Bottom.bmp",
    "./assets/skybox/daylight/Daylight Box_Back.bmp",
    "./assets/skybox/daylight/Daylight Box_Front.bmp"
  ]).setMaterialProperties({
    color: import_gl_matrix9.vec3.fromValues(1, 1, 1),
    shinyness: 0.8,
    transparency: 1
  }).build();
  return skybox;
}

// src/entities/createTerrainEntity.ts
var import_gl_matrix10 = __toESM(require_cjs());
async function createTerrainEntity(webGLContext) {
  const terrain = await new EntityBuilder(webGLContext).setIsTerrain().setIsRigidBody().setPhysicsProperties({
    isStatic: true,
    mass: 0
  }).setFragmentShader("./shaders/terrain-frag-shader.frag").setVertexShader("./shaders/terrain-vert-shader.vert").setGridSize({
    rows: 100,
    cols: 100
  }).setCollisionSize(import_gl_matrix10.vec3.fromValues(100, 1, 100)).setTextureSrc("./assets/prototype/dark/texture_02.png").setMaterialProperties({
    color: import_gl_matrix10.vec3.fromValues(0.15, 0.15, 0.15),
    shinyness: 0.8,
    transparency: 1
  }).setPosition(import_gl_matrix10.vec3.fromValues(-50, 0, -50)).build();
  return terrain;
}

// src/entities/EntitiyInitializer.ts
var EntityInitializer = class {
  static async initializeEntities(entityManager, gl) {
    const terrain = await createTerrainEntity(gl);
    for (let i = 0; i < 10; i++) {
      const cube = await createCubeEntity(gl, import_gl_matrix11.vec3.fromValues(i * 2, i * 20, 0));
      entityManager.addEntity(cube);
    }
    const skybox = await createSkybox(gl);
    entityManager.addEntities([skybox, terrain]);
  }
};

// src/entities/EntityManager.ts
var EntityManager = class {
  constructor() {
    this.entities = [];
  }
  getEntities() {
    return this.entities;
  }
  addEntity(entity) {
    this.entities.push(entity);
  }
  addEntities(entities) {
    this.entities.push(...entities);
  }
  getEntityById(id) {
    return this.entities.find((e) => e.id === id);
  }
  getEntitiesByComponent(componentName) {
    return this.entities.filter((value) => value.getComponent(componentName) !== void 0);
  }
  getEntitiesByComponents(components) {
    const uniqueEntities = /* @__PURE__ */ new Set();
    this.entities.forEach((entity) => {
      if (components.some((c) => entity.getComponent(c) !== void 0)) {
        uniqueEntities.add(entity);
      }
    });
    return Array.from(uniqueEntities);
  }
  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
};

// src/entities/createPlayerEntity.ts
var import_gl_matrix12 = __toESM(require_cjs());
async function createPlayerEntity(webGLContext) {
  const player = await new EntityBuilder(webGLContext).setIsRigidBody().setFragmentShader("./shaders/frag-shader.frag").setVertexShader("./shaders/vert-shader.vert").setMeshSize(3).setPhysicsProperties({
    isStatic: false,
    mass: 1
  }).setCollisionSize(import_gl_matrix12.vec3.fromValues(10, 10, 10)).setTextureSrc("./assets/textures/short_bricks_floor_disp_1k.png").setMaterialProperties({
    color: import_gl_matrix12.vec3.fromValues(1, 1, 1),
    shinyness: 0.8,
    transparency: 1
  }).setLightProperties({
    color: import_gl_matrix12.vec3.fromValues(1, 1, 1),
    intensity: 1,
    position: import_gl_matrix12.vec3.fromValues(-1, -1, -1),
    direction: import_gl_matrix12.vec3.fromValues(1, 1, 1),
    angle: 121,
    innerConeAngle: 0.8,
    outerConeAngle: 0.8,
    cutoffAngle: 141
  }).setPosition(import_gl_matrix12.vec3.fromValues(0, 20, 0)).build();
  return player;
}

// src/systems/SystemInitializer.ts
var import_gl_matrix20 = __toESM(require_cjs());

// src/cameras/FirstPersonCamera.ts
var import_gl_matrix14 = __toESM(require_cjs());

// src/cameras/Camera.ts
var import_gl_matrix13 = __toESM(require_cjs());
var Camera = class {
  constructor(position, orientation) {
    this.position = position;
    this.orientation = orientation;
  }
  getViewMatrix() {
    const viewMatrix = import_gl_matrix13.mat4.create();
    const inverseCameraPosition = import_gl_matrix13.vec3.create();
    import_gl_matrix13.vec3.negate(inverseCameraPosition, this.position);
    import_gl_matrix13.mat4.translate(viewMatrix, viewMatrix, inverseCameraPosition);
    const cameraRotationMat = import_gl_matrix13.mat4.create();
    import_gl_matrix13.mat4.fromQuat(cameraRotationMat, this.orientation);
    import_gl_matrix13.mat4.multiply(viewMatrix, viewMatrix, cameraRotationMat);
    import_gl_matrix13.mat4.invert(viewMatrix, viewMatrix);
    return viewMatrix;
  }
};

// src/cameras/FirstPersonCamera.ts
var FirstPersonCamera = class extends Camera {
  constructor(position, orientation, mouseSensitivity = 0.2) {
    super(position, orientation);
    this.mouseSensitivity = mouseSensitivity;
  }
  moveForward(amount) {
    const forwardDirection = import_gl_matrix14.vec3.transformQuat(import_gl_matrix14.vec3.create(), import_gl_matrix14.vec3.fromValues(0, 0, -1), this.orientation);
    import_gl_matrix14.vec3.scaleAndAdd(this.position, this.position, forwardDirection, -amount);
  }
  moveBackward(amount) {
    const backwardDirection = import_gl_matrix14.vec3.transformQuat(import_gl_matrix14.vec3.create(), import_gl_matrix14.vec3.fromValues(0, 0, 1), this.orientation);
    import_gl_matrix14.vec3.scaleAndAdd(this.position, this.position, backwardDirection, -amount);
  }
  moveLeft(amount) {
    const right = import_gl_matrix14.vec3.transformQuat(import_gl_matrix14.vec3.create(), import_gl_matrix14.vec3.fromValues(1, 0, 0), this.orientation);
    import_gl_matrix14.vec3.scaleAndAdd(this.position, this.position, right, amount);
  }
  moveRight(amount) {
    const right = import_gl_matrix14.vec3.transformQuat(import_gl_matrix14.vec3.create(), import_gl_matrix14.vec3.fromValues(1, 0, 0), this.orientation);
    import_gl_matrix14.vec3.scaleAndAdd(this.position, this.position, right, -amount);
  }
  rotate(pitch, yaw) {
    const pitchQuat = import_gl_matrix14.quat.setAxisAngle(import_gl_matrix14.quat.create(), [1, 0, 0], pitch * this.mouseSensitivity);
    const yawQuat = import_gl_matrix14.quat.setAxisAngle(import_gl_matrix14.quat.create(), [0, 1, 0], yaw * this.mouseSensitivity);
    import_gl_matrix14.quat.multiply(this.orientation, this.orientation, pitchQuat);
    import_gl_matrix14.quat.multiply(this.orientation, yawQuat, this.orientation);
    import_gl_matrix14.quat.normalize(this.orientation, this.orientation);
  }
};

// src/systems/CameraSystem.ts
var import_gl_matrix16 = __toESM(require_cjs());

// src/utils/InputManager.ts
var import_gl_matrix15 = __toESM(require_cjs());
var InputManager = class {
  constructor() {
    this.keysPressed = {};
    this.mouseButtonsPressed = {};
    this.mouseX = 0;
    this.mouseY = 0;
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keyup", (event) => this.handleKeyUp(event));
    document.addEventListener("mousedown", (event) => this.handleMouseDown(event));
    document.addEventListener("mouseup", (event) => this.handleMouseUp(event));
    document.addEventListener("mousemove", (event) => this.handleMouseMove(event));
  }
  handleKeyDown(event) {
    this.keysPressed[event.key] = true;
  }
  handleKeyUp(event) {
    this.keysPressed[event.key] = false;
  }
  handleMouseDown(event) {
    this.mouseButtonsPressed[event.button] = true;
  }
  handleMouseUp(event) {
    this.mouseButtonsPressed[event.button] = false;
  }
  handleMouseMove(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  isMouseButtonDown(button) {
    return this.mouseButtonsPressed[button] || false;
  }
  getMouseX() {
    return this.mouseX;
  }
  getMouseY() {
    return this.mouseY;
  }
  isKeyPressed(key) {
    return !!this.keysPressed[key];
  }
  getMovementInput() {
    const movementInput = import_gl_matrix15.vec2.create();
    console.log(this.keysPressed);
    if (this.isKeyPressed("w") || this.isKeyPressed("ArrowUp")) {
      movementInput[1] -= 1;
    }
    if (this.isKeyPressed("s") || this.isKeyPressed("ArrowDown")) {
      movementInput[1] += 1;
    }
    if (this.isKeyPressed("a") || this.isKeyPressed("ArrowLeft")) {
      movementInput[0] -= 1;
    }
    if (this.isKeyPressed("d") || this.isKeyPressed("ArrowRight")) {
      movementInput[0] += 1;
    }
    if (import_gl_matrix15.vec2.length(movementInput) > 0) {
      import_gl_matrix15.vec2.normalize(movementInput, movementInput);
    }
    return movementInput;
  }
};

// src/systems/System.ts
var System = class {
};

// src/systems/CameraSystem.ts
var CameraSystem = class extends System {
  constructor(projectionMatrix, canvas, camera, moveSpeed = 2) {
    super();
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.inputManager = new InputManager();
    this.moveSpeed = moveSpeed;
    this.camera = camera;
    this.projectionMatrix = projectionMatrix;
    this.canvas = canvas;
  }
  async preload() {
    import_gl_matrix16.mat4.perspective(this.projectionMatrix, 45, this.canvas.width / this.canvas.height, 0.1, 1e4);
  }
  update() {
    this.handleInput();
  }
  render(entityManager) {
    const renderEntities = entityManager.getEntitiesByComponent("RenderComponent");
    for (const entity of renderEntities) {
      const renderComponent = entity.getComponent("RenderComponent");
      if (!renderComponent)
        continue;
      this.setMatrixUniforms(renderComponent.shaderProgram);
    }
  }
  handleInput() {
    const moveAmount = this.moveSpeed * (this.inputManager.isKeyPressed("Shift") ? 3 : 1);
    if (this.inputManager.isKeyPressed("w")) {
      this.camera.moveForward(moveAmount);
    } else if (this.inputManager.isKeyPressed("s")) {
      this.camera.moveBackward(moveAmount);
    }
    if (this.inputManager.isKeyPressed("a")) {
      this.camera.moveLeft(moveAmount);
    } else if (this.inputManager.isKeyPressed("d")) {
      this.camera.moveRight(moveAmount);
    }
    if (this.inputManager.isMouseButtonDown(0)) {
      const deltaX = (this.inputManager.getMouseX() - this.prevMouseX) * 1e-3;
      const deltaY = (this.inputManager.getMouseY() - this.prevMouseY) * 1e-3;
      this.camera.rotate(-deltaY, -deltaX);
    }
    this.prevMouseX = this.inputManager.getMouseX();
    this.prevMouseY = this.inputManager.getMouseY();
  }
  setMatrixUniforms(shaderProgram) {
    shaderProgram.use();
    shaderProgram.setUniformMatrix4fv("pMatrix", this.projectionMatrix);
    shaderProgram.setUniformMatrix4fv("vMatrix", this.camera.getViewMatrix());
  }
};

// src/systems/CollisionSystem.ts
var CollisionSystem = class extends System {
  async preload() {
  }
  update(_, entityManager) {
    const terrainEntity = entityManager.getEntitiesByComponent("TerrainComponent")[0];
    const collisionEntities = entityManager.getEntitiesByComponent("CollisionComponent").filter((e) => !e.hasComponent("TerrainComponent"));
    for (const entityA of collisionEntities) {
      const collisionA = entityA.getComponent("CollisionComponent");
      if (!collisionA)
        continue;
      const transformA = entityA.getComponent("TransformComponent");
      if (!transformA)
        continue;
      const rigidBodyA = entityA.getComponent("RigidBodyComponent");
      if (!rigidBodyA)
        continue;
      const collisionB = terrainEntity.getComponent("CollisionComponent");
      if (!collisionB)
        continue;
      const transformB = terrainEntity.getComponent("TransformComponent");
      if (!transformB)
        continue;
      const rigidBodyB = terrainEntity.getComponent("RigidBodyComponent");
      if (!rigidBodyB)
        continue;
      if (transformA.position[1] < transformB.position[1] + (collisionA.size[1] + collisionA.size[1] / 2)) {
        transformA.position[1] = collisionB.size[1] + collisionA.size[1] / 2;
        rigidBodyA.velocity[1] = 0;
      }
    }
  }
  render() {
  }
};

// src/systems/LightingSystem.ts
var import_gl_matrix17 = __toESM(require_cjs());
var LightingSystem = class extends System {
  async preload() {
  }
  update(deltaTime, entityManager) {
    const entitiesWithLighting = entityManager.getEntitiesByComponent("LightComponent");
    const entitiesWithRender = entityManager.getEntitiesByComponent("RenderComponent");
    entitiesWithRender.forEach((renderEntity) => {
      const renderComponent = renderEntity.getComponent("RenderComponent");
      if (!renderComponent)
        return;
      const renderTransformComponent = renderEntity.getComponent("TransformComponent");
      if (!renderTransformComponent)
        return;
      let combinedLightColor = import_gl_matrix17.vec3.create();
      entitiesWithLighting.forEach((lightEntity) => {
        const lightingComponent = lightEntity.getComponent("LightComponent");
        if (!lightingComponent)
          return;
        const lightingTransformComponent = lightEntity.getComponent("TransformComponent");
        if (!lightingTransformComponent)
          return;
        const lightColor = lightingComponent.color;
        const lightIntensity = lightingComponent.intensity;
        const lightPosition = lightingTransformComponent.position;
        const lightDirection = import_gl_matrix17.vec3.create();
        import_gl_matrix17.vec3.subtract(lightDirection, renderTransformComponent.position, lightPosition);
        import_gl_matrix17.vec3.normalize(lightDirection, lightDirection);
        const lightDistance = import_gl_matrix17.vec3.distance(renderTransformComponent.position, lightPosition);
        const attenuationFactor = 1 / (1 + lightDistance * lightIntensity);
        if (lightingComponent instanceof SpotLightComponent) {
          const lightCutoffAngle = lightingComponent.cutoffAngle;
          const angleToLight = import_gl_matrix17.vec3.angle(lightDirection, renderTransformComponent.position);
          if (angleToLight <= lightCutoffAngle) {
            const spotlightIntensity = 1 - angleToLight / lightCutoffAngle;
            import_gl_matrix17.vec3.scaleAndAdd(combinedLightColor, combinedLightColor, lightColor, spotlightIntensity * attenuationFactor);
          }
        }
        lightingComponent.combinedLightColor = combinedLightColor;
      });
    });
  }
  render() {
  }
};

// src/systems/PhysicsSystem.ts
var import_gl_matrix18 = __toESM(require_cjs());

// src/utils/constants.ts
var GRAVITY = 9.81;

// src/systems/PhysicsSystem.ts
var PhysicsSystem = class extends System {
  async preload() {
  }
  update(deltaTime, entityManager) {
    const physicsEntities = entityManager.getEntitiesByComponent("RigidBodyComponent");
    for (const entity of physicsEntities) {
      const rigidBodyComponent = entity.getComponent("RigidBodyComponent");
      if (!rigidBodyComponent)
        continue;
      const transformComponent = entity.getComponent("TransformComponent");
      if (!transformComponent)
        continue;
      import_gl_matrix18.vec3.set(rigidBodyComponent.acceleration, 0, 0, 0);
      const gravitationalForce = import_gl_matrix18.vec3.fromValues(0, -GRAVITY, 0);
      import_gl_matrix18.vec3.scale(gravitationalForce, gravitationalForce, rigidBodyComponent.mass);
      import_gl_matrix18.vec3.add(rigidBodyComponent.acceleration, rigidBodyComponent.acceleration, gravitationalForce);
      import_gl_matrix18.vec3.scaleAndAdd(rigidBodyComponent.velocity, rigidBodyComponent.velocity, rigidBodyComponent.acceleration, deltaTime);
    }
  }
  render() {
  }
};

// src/systems/PlayerSystem.ts
var PlayerSystem = class extends System {
  constructor(playerEntity, camera) {
    super();
  }
  async preload() {
  }
  update(deltaTime) {
  }
  render() {
  }
};

// src/systems/RenderSystem.ts
var RenderSystem = class extends System {
  constructor(canvas, bufferManager, camera, projectionMatrix) {
    super();
    this.canvas = canvas;
    this.gl = canvas.gl;
    this.bufferManager = bufferManager;
    this.camera = camera;
    this.projectionMatrix = projectionMatrix;
  }
  async preload(entityManager) {
    const entities = entityManager.getEntitiesByComponent("RenderComponent");
    await this.preloadBuffers(entities);
    this.canvas.setViewPort();
  }
  update() {
  }
  render(entityManager) {
    this.canvas.clear();
    const entities = entityManager.getEntitiesByComponent("RenderComponent");
    const skyboxEntity = entities.find((e) => e.hasComponent("SkyboxComponent"));
    const renderEntities = entities.filter((e) => !e.hasComponent("SkyboxComponent"));
    if (skyboxEntity) {
      this.renderSkybox(skyboxEntity);
    }
    this.renderEntities(renderEntities);
  }
  async preloadBuffers(entities) {
    for (const entity of entities) {
      const renderComponent = entity.getComponent("RenderComponent");
      if (!renderComponent)
        continue;
      renderComponent.shaderProgram.use();
      this.bufferManager.createBuffers(entity.id, renderComponent);
    }
  }
  renderSkybox(skyboxEntity) {
    const skyboxRenderComponent = skyboxEntity.getComponent("RenderComponent");
    if (!skyboxRenderComponent)
      return;
    const materialComponent = skyboxEntity.getComponent("MaterialComponent");
    if (!materialComponent)
      return;
    skyboxRenderComponent.shaderProgram.use();
    skyboxRenderComponent.shaderProgram.setUniform1i("skybox", 0);
    skyboxRenderComponent.shaderProgram.setUniformMatrix4fv("view", this.camera.getViewMatrix());
    skyboxRenderComponent.shaderProgram.setUniformMatrix4fv("projection", this.projectionMatrix);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, materialComponent.texture);
    this.bufferManager.bindBuffers(skyboxEntity.id);
    this.bufferManager.associateVBOWithAttribute(skyboxEntity.id, skyboxRenderComponent.shaderProgram, "position", 3, this.gl.FLOAT, 0, 0);
    this.gl.drawElements(this.gl.TRIANGLES, skyboxRenderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }
  renderEntities(entities) {
    for (const entity of entities) {
      const renderComponent = entity.getComponent("RenderComponent");
      if (!renderComponent)
        continue;
      const materialComponent = entity.getComponent("MaterialComponent");
      if (!materialComponent)
        continue;
      renderComponent.shaderProgram.use();
      this.setupShaderProgramUniforms(entity, renderComponent, materialComponent);
      this.bufferManager.bindBuffers(entity.id);
      if (renderComponent.normals.length > 0) {
        this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "normal", 3, this.gl.FLOAT, 0, 0);
      }
      this.bufferManager.associateVBOWithAttribute(entity.id, renderComponent.shaderProgram, "position", 3, this.gl.FLOAT, 0, 0);
      if (renderComponent.uvs)
        this.bufferManager.associateUVWithAttribute(entity.id, renderComponent.shaderProgram, "uv", 2, this.gl.FLOAT, 0, 0);
      this.gl.drawElements(this.gl.TRIANGLES, renderComponent.indices.length, this.gl.UNSIGNED_SHORT, 0);
    }
  }
  setupShaderProgramUniforms(entity, renderComponent, materialComponent) {
    const shaderProgram = renderComponent.shaderProgram;
    shaderProgram.setUniform3f("materialColor", materialComponent.color);
    if (materialComponent.texture) {
      shaderProgram.setUniform1i("textureSampler", 0);
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, materialComponent.texture);
    }
    const lightComponent = entity.getComponent("LightComponent");
    if (lightComponent) {
      shaderProgram.setUniform3f("lightColor", lightComponent.color);
      shaderProgram.setUniform1f("lightIntensity", lightComponent.intensity);
      shaderProgram.setUniform3f("lightDirection", lightComponent.direction);
      shaderProgram.setUniform3f("ambientLightColor", lightComponent.combinedLightColor);
      shaderProgram.setUniform1f("ambientLightIntensity", 8);
    }
  }
};

// src/systems/TransformSystem.ts
var import_gl_matrix19 = __toESM(require_cjs());
var TransformSystem = class extends System {
  async preload(entityManager) {
    const entities = entityManager.getEntitiesByComponents(["TransformComponent", "RenderComponent"]);
    this.preloadEntities(entities);
  }
  update(deltaTime, entityManager) {
    const entities = entityManager.getEntitiesByComponent("RigidBodyComponent");
    this.updateEntities(deltaTime, entities);
  }
  render() {
  }
  preloadEntities(entities) {
    for (const entity of entities) {
      const transformComponent = entity.getComponent("TransformComponent");
      if (!transformComponent)
        continue;
      const modelMatrix = this.getModelMatrix(transformComponent);
      const renderComponent = entity.getComponent("RenderComponent");
      if (!renderComponent)
        continue;
      const shaderProgram = renderComponent.shaderProgram;
      shaderProgram.use();
      shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);
    }
    ;
  }
  updateEntities(deltaTime, entities) {
    for (const entity of entities) {
      const rigidBodyComponent = entity.getComponent("RigidBodyComponent");
      if (!rigidBodyComponent)
        continue;
      const transformComponent = entity.getComponent("TransformComponent");
      if (!transformComponent)
        continue;
      if (!rigidBodyComponent.isStatic)
        import_gl_matrix19.vec3.scaleAndAdd(transformComponent.position, transformComponent.position, rigidBodyComponent.velocity, deltaTime);
      const modelMatrix = this.getModelMatrix(transformComponent);
      const renderComponent = entity.getComponent("RenderComponent");
      if (!renderComponent)
        continue;
      const shaderProgram = renderComponent.shaderProgram;
      shaderProgram.use();
      shaderProgram.setUniformMatrix4fv("mMatrix", modelMatrix);
    }
  }
  getModelMatrix(transformComponent) {
    const modelMatrix = import_gl_matrix19.mat4.create();
    import_gl_matrix19.mat4.translate(modelMatrix, modelMatrix, transformComponent.position);
    import_gl_matrix19.mat4.rotateX(modelMatrix, modelMatrix, transformComponent.rotation[0]);
    import_gl_matrix19.mat4.rotateY(modelMatrix, modelMatrix, transformComponent.rotation[1]);
    import_gl_matrix19.mat4.rotateZ(modelMatrix, modelMatrix, transformComponent.rotation[2]);
    import_gl_matrix19.mat4.scale(modelMatrix, modelMatrix, transformComponent.scale);
    return modelMatrix;
  }
};

// src/systems/SystemInitializer.ts
var SystemInitializer = class {
  static initializeSystems(window, playerEntity, bufferManager, cameraSpeed, mouseSensitivity) {
    const camera = new FirstPersonCamera(config.cameraPosition, config.cameraRotation, mouseSensitivity);
    const projectionMatrix = import_gl_matrix20.mat4.create();
    const playerSystem = new PlayerSystem(playerEntity, camera);
    const renderSystem = new RenderSystem(window, bufferManager, camera, projectionMatrix);
    const transformSystem = new TransformSystem();
    const cameraSystem = new CameraSystem(projectionMatrix, window, camera, cameraSpeed);
    const lightingSystem = new LightingSystem();
    const collisionSystem = new CollisionSystem();
    const physicsSystem = new PhysicsSystem();
    return [cameraSystem, lightingSystem, physicsSystem, collisionSystem, transformSystem, playerSystem, renderSystem];
  }
};

// src/main.ts
var main = async () => {
  try {
    const entityManager = new EntityManager();
    const window = new WebGLCanvas(config.canvasWidth, config.canvasHeight);
    await EntityInitializer.initializeEntities(entityManager, window.gl);
    const bufferManager = new BufferManager(window.gl);
    const player = await createPlayerEntity(window.gl);
    const systems = SystemInitializer.initializeSystems(window, player, bufferManager, config.cameraSpeed, config.mouseSensitivity);
    const game = new Game(entityManager);
    game.addSystems(systems);
    game.run();
  } catch (error) {
    console.error(`Error creating entities: ${error}`);
  }
};
main();

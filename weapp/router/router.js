"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventHub = _interopRequireDefault(require('./../common/eventHub.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  router: [],
  route: {
    path: '',
    params: {},
    query: {},
    index: 0
  },
  done: function done(scope) {
    var _this = this;

    _eventHub["default"].$on('router:change', scope['router:change:eventHandler'] = function (v) {
      var _scope$$router$router, _this$router;

      // console.log('router:change:geted');
      (_scope$$router$router = scope.$router.router).splice.apply(_scope$$router$router, [0, v.router.length].concat(_toConsumableArray(v.router)));

      (_this$router = _this.router).splice.apply(_this$router, [0, v.router.length].concat(_toConsumableArray(v.router)));

      Object.assign(scope.$route, v.route);
      Object.assign(_this.route, v.route); // console.log('route:changed',scope.$route,scope);
    });

    _eventHub["default"].$on('router:offsetChange', scope['router:offsetChange:eventHandler'] = function (v) {
      Object.assign(scope.$route, _this.router[_this.router.length - 1 + v]);
      Object.assign(_this.route, _this.router[_this.router.length - 1 + v]);
    });
  },
  disDone: function disDone(scope) {
    _eventHub["default"].$off('$store:change', scope['router:change:eventHandler']);

    _eventHub["default"].$off('router:offsetChange', scope['router:offsetChange:eventHandler']);
  },
  go: function go(offset) {
    _eventHub["default"].$emit('router:offsetChange', offset);
  },
  getCurrentPath: function getCurrentPath() {
    return this.router[this.router.length - 1];
  },
  push: function push(route) {
    if (Object.prototype.toString.call(route) == "[object String]") {
      this.route.path = route;
      this.router.push({
        path: route
      });
    } else if (Object.prototype.toString.call(route) == "[object Object]") {
      this.route.path = route.path;
      this.router.push(route);
    } // console.log('router:push:emit');


    _eventHub["default"].$emit('router:change', this);
  }
};
exports["default"] = _default;
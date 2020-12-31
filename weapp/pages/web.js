"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  data: {
    nowSrc: ''
  },
  onLoad: function onLoad(options) {
    console.log('web:onLoad', options);
    this.nowSrc = decodeURIComponent(options.url);
  }
}, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined });
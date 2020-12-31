"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  methods: {
    goBack: function goBack() {
      this.$router.go(-1);
    }
  }
}, {info: {"components":{"bgAnimation":{"path":"./../components/bgAnimation"}},"on":{}}, handlers: {'40-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.goBack.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });
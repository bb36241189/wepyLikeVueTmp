"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  methods: {
    onValuesChange: function onValuesChange(picker, values) {
      this.hour = values[0];
      this.minute = values[1];
    },
    closePopup: function closePopup() {
      this.popupVisible = false;
      this.BUS.$emit('TimePicked', this.hour + ':' + this.minute);
    }
  },
  data: {
    popupVisible: false,
    hour: 0,
    minute: 0
  },
  created: function created() {
    var _this = this;

    console.log('HourMinute:created');
    this.BUS.$on("openPickerTime", function () {
      _this.popupVisible = true;
    });
  }
}, {info: {"components":{},"on":{}}, handlers: {'21-0': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.bindTimeChange.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });
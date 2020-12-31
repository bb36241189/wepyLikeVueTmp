"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  props: ["percent", "color"],
  data: {},
  computed: {
    realPercent: function realPercent() {
      if (this.percent) {
        return this.percent.replace('分', '%');
      } else {
        return '0%';
      }
    }
  },
  methods: {},
  created: function created() {},
  onShow: function onShow() {}
}, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined });
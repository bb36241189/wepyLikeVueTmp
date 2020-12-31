"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  props: ["score", "color"],
  data: {},
  computed: {},
  methods: {},
  created: function created() {},
  onShow: function onShow() {}
}, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined });
"use strict";

var _star = _interopRequireDefault(require('./../star/star.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  data: {
    starConfig: _star["default"],
    img_url: 'https://nqobaxsg.cn/star-info/dist/img/'
  },
  computed: {
    the_img_url: function the_img_url() {
      return this.img_url;
    }
  },
  methods: {
    closeMask: function closeMask() {
      this.$emit("closeMask");
    },
    choiseStar: function choiseStar(item) {
      wx.setStorageSync("cStar", JSON.stringify(item));
      this.$store.commit('changeCStar', item);
      this.$store.dispatch('loadStarInfo', item.key);
      this.$emit('closeMask');
    }
  },
  created: function created() {
    console.log('choiseStar:created', 'this.img_url:', this.img_url);
  },
  mounted: function mounted() {}
}, {info: {"components":{"bgAnimation":{"path":"./bgAnimation"}},"on":{}}, handlers: {'25-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeMask.apply(_vm, $args || [$event]);
  })();
}},'25-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'25-2': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.choiseStar(item);
  })();
}}}, models: {}, refs: undefined });
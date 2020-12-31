"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  config: {
    navigationBarTitleText: 'test'
  },
  hooks: {
    // Page 级别 hook, 只对当前 Page 的 setData 生效。
    'before-setData': function beforeSetData(dirty) {
      // if (Math.random() < 0.2) {
      //   console.log('setData canceled');
      //   return false; // Cancel setData
      // }
      dirty.time = +new Date();
      return dirty;
    }
  },
  mixins: [_test["default"]],
  data: {},
  computed: {},
  watch: {
    custom: {
      handler: function handler(v) {
        if (v) {
          this.navPaddingTop = v.top + 47;
        }
      },
      deep: true,
      immediate: true
    }
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '我刚刚预见了情感。事业。财运迷思~准了准了！你也试试看？',
      imageUrl: 'https://img.fenfenriji.com//69/27/03/Image/78090190-0F60-4757-E037-5EFB05808DF5.png',
      desc: '我刚刚预见了情感。事业。财运迷思~准了准了！你也试试看？',
      path: '/pages/index' // 路径，传递参数到指定页面。

    };
  },
  methods: {
    noneEnoughPeople: function noneEnoughPeople() {}
  },
  onLoad: function onLoad(options) {},
  onShow: function onShow() {},
  onHide: function onHide() {},
  created: function created() {// this.showQuickLucky = true;
  }
}, {info: {"components":{"choiseStar":{"path":"./../components/choiseStar"}},"on":{}}, handlers: {'5-0': {"touchmove": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.noneEnoughPeople.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });
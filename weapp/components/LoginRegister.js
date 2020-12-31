"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _CommonEnv = _interopRequireDefault(require('./../js/class/CommonEnv.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  data: {
    star: null,
    phone: null,
    code: null,
    isSendCode: true,
    countDown: 0
  },
  computed: {},
  watch: {
    countDown: function countDown(v) {
      var _this = this;

      if (v > 0) {
        setTimeout(function () {
          _this.countDown--;
        }, 1000);
      }
    },
    phone: function phone(v) {
      v.length > 11 && (this.phone = this.phone.slice(0, 11));
    },
    code: function code(v) {
      v.length > 6 && (this.code = this.code.slice(0, 6));
    }
  },
  methods: {
    closeMask: function closeMask() {
      this.$emit("closeMask");
    },
    goLogin: function goLogin() {
      var _this2 = this;

      _apiService["default"].starLoginWxMiniPro(this.$store.state.cStar.key).then(function (ret) {
        if (ret) {
          // CommonEnv.toast('登录成功!');
          _this2.$store.commit("changeUserInfo", ret);

          _apiService["default"].token = ret.token;
          wx.setStorageSync('token', _apiService["default"].token);

          _this2.$emit("closeMask");
        } else {
          return Promise.reject({
            msg: 'login lost'
          });
        }
      })["catch"](function (e) {
        if (e.code == "102") {
          _CommonEnv["default"].toast("验证码错误");
        } else {
          console.error(e);
        }
      });
    },
    sendValideCode: function sendValideCode() {
      var _this3 = this;

      if (/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.phone)) {
        if (this.countDown <= 0) {
          _apiService["default"].sendValideCode("86" + this.phone).then(function (ret) {
            if (ret.code == '0000') {
              _this3.countDown = 60;
            } else if (ret.msg == 'count over') {
              _CommonEnv["default"].toast('今天验证码发送太多了喔，请联系客服~');
            }
          })["catch"](function (e) {
            if (ret.msg == 'count over') {
              _CommonEnv["default"].toast('今天验证码发送太多了喔，请联系客服~');
            } else {
              console.error(e);
            }
          });
        }
      } else {
        _CommonEnv["default"].toast("手机号码输入有误,请重新输入");
      }
    }
  },
  created: function created() {
    this.star = JSON.parse(wx.getStorageSync("cStar"));
    console.log('loginRegister');
  },
  onShow: function onShow() {}
}, {info: {"components":{"bgAnimation":{"path":"./bgAnimation"}},"on":{}}, handlers: {'24-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeMask.apply(_vm, $args || [$event]);
  })();
}},'24-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'24-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.sendValideCode.apply(_vm, $args || [$event]);
  })();
}},'24-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeMask.apply(_vm, $args || [$event]);
  })();
}},'24-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.goLogin.apply(_vm, $args || [$event]);
  })();
}}}, models: {'1': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    },'2': {
      type: "input",
      expr: "code",
      handler: function set ($v) {
      var _vm=this;
        _vm.code = $v;
      
    }
    }}, refs: undefined });
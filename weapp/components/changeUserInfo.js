"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _CommonEnv = _interopRequireDefault(require('./../js/class/CommonEnv.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: ["d", "tab", "originStep"],
  mixins: [_test["default"]],
  data: {
    step: 1,
    type: '',
    text: '',
    sex: 0,
    nickname: '',
    birthDay: new Date()
  },
  computed: {
    birthDayFormat: function birthDayFormat() {
      if (this.birthDay) {
        return this.birthDay.Format('yyyy-MM-dd');
      } else {
        return '';
      }
    }
  },
  methods: {
    closeRecord: function closeRecord() {
      this.$emit('closeRecord');
    },
    getUserInfo: function getUserInfo(u) {
      console.log(u);
    },
    saveUserInfo: function saveUserInfo() {
      var _this = this;

      _apiService["default"].updateUserInfo(this.sex, this.nickname, this.birthDay.getTime()).then(function (ret) {
        _this.$store.dispatch('login');

        _this.closeRecord();
      })["catch"](function (e) {
        console.error(e);
      });
    },
    choiseBirthday: function choiseBirthday(e) {
      this.birthDay = new Date(e.$wx.detail.value); //   this.BUS.$emit('openPickerDate',this.birthDay.Format('yyyy-MM-dd'));
      //   this.BUS.$once('DatePicked',(dateStr) => {
      //       this.birthDay = new Date(dateStr);
      //   })
    },
    orderingAugury: function orderingAugury() {
      var _this2 = this;

      var tag = this.joinRdcConfig();

      if (!tag) {
        _CommonEnv["default"].toast('您还没有选择标签喔~');

        return;
      }

      _apiService["default"].saveNote(this.type, tag, this.text).then(function () {
        _this2.closeRecord();

        _this2.resetRdcConfig();
      })["catch"](function (e) {
        console.error(e);

        _CommonEnv["default"].toast('保存失败，请稍后再试试吧~');
      });
    },
    gotoBack: function gotoBack() {
      this.isPickedTime = false;
      this.step = 1;
    },
    getNowDay: function getNowDay() {
      return new Date().Format('MM月dd日');
    }
  },
  created: function created() {
    console.log('changeUserInfo', 'created');
    this.sex = this.$store.state.userInfo.sex;
    this.nickname = this.$store.state.userInfo.nickname;
    this.birthDay = new Date(Number(this.$store.state.userInfo.birth_day));
  },
  onShow: function onShow() {}
}, {info: {"components":{},"on":{}}, handlers: {'61-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeRecord.apply(_vm, $args || [$event]);
  })();
}},'61-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'61-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeRecord.apply(_vm, $args || [$event]);
  })();
}},'61-3': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.sex = 1;
  })();
}},'61-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.sex = 0;
  })();
}},'61-5': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.choiseBirthday.apply(_vm, $args || [$event]);
  })();
}},'61-6': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.saveUserInfo.apply(_vm, $args || [$event]);
  })();
}},'61-7': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.closeRecord(true);
  })();
}}}, models: {'4': {
      type: "input",
      expr: "nickname",
      handler: function set ($v) {
      var _vm=this;
        _vm.nickname = $v;
      
    }
    }}, refs: undefined });
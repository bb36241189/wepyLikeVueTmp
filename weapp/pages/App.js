"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _CommonEnv = _interopRequireDefault(require('./../js/class/CommonEnv.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  data: {
    nowBottomTab: "",
    //Diary,Mine
    showLogin: false,
    editData: null,
    isChangingStar: false,
    showRecord: false
  },
  watch: {
    nowBottomTab: function nowBottomTab(v) {
      if (v == "Fortune" && this.$route.path != "/starInfo") {
        this.$router.push({
          path: "/starInfo"
        });
      } else if (v == "Diary" && this.$route.path != "/notes") {
        this.$router.push({
          path: "/notes"
        });
      } else if (v == "Mine" && this.$route.path != "/mine") {
        this.$router.push({
          path: '/mine'
        });
      }
    },
    $route: function $route(to, from) {
      if (to.path == '/starInfo') {
        this.nowBottomTab = 'Fortune';
      } else if (to.path == '/notes') {
        this.nowBottomTab = 'Diary';
      } else if (to.path == '/mine') {
        this.nowBottomTab = 'Mine';
      }
    }
  },
  computed: {
    nowTab: function nowTab() {
      return this.$store.state.nowTab;
    },
    starInfo: function starInfo() {
      return this.$store.state.starInfo;
    }
  },
  methods: {
    goLogin: function goLogin() {
      var _this = this;

      _apiService["default"].starLoginWxMiniPro(this.$store.state.cStar.key).then(function (ret) {
        if (ret) {
          // CommonEnv.toast('登录成功!');
          _this.$store.commit("changeUserInfo", ret);

          _apiService["default"].token = ret.token;
          wx.setStorageSync('token', _apiService["default"].token);
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
    openRecord: function openRecord() {
      this.showRecord = true;
    },
    closeRecord: function closeRecord() {
      this.showRecord = false;
      this.editData = null;
    },
    closeChoiceStar: function closeChoiceStar() {
      this.isChangingStar = false;
    },
    closeLogin: function closeLogin(isOk) {
      if (!isOk) {
        // this.$router.push({path: "/starInfo"});
        this.nowBottomTab = 'Fortune';
      }

      this.showLogin = false;
    }
  },
  onShow: function onShow() {
    // this.BUS.$emit('openPickerDate');
    this.nowBottomTab = 'Fortune';
  },
  created: function created() {
    var _this2 = this;

    if (!wx.getStorageSync('cStar')) {
      this.isChangingStar = true;
    } else {
      console.log(wx.getStorageSync('cStar'));
      this.$store.commit('changeCStar', JSON.parse(wx.getStorageSync('cStar')));
      var starkey = this.$store.state.cStar.key;
      this.$store.dispatch('loadStarInfo', starkey);
    }

    if (wx.getStorageSync('token')) {
      this.$store.dispatch('login');
    }

    this.BUS.$on('changingStar', function () {
      _this2.isChangingStar = true;
    });
    this.BUS.$on('editNote', function (editData) {
      _this2.editData = editData;
      console.log('$on:editNote', _this2.editData);

      _this2.openRecord();
    });
    this.BUS.$on('openLogin', function () {
      _this2.goLogin(); // this.showLogin = true;

    });
  }
}, {info: {"components":{"routerView":{"path":"./../router/routerView"},"HourMinute":{"path":"./../components/HourMinute"},"YearMonthDate":{"path":"./../components/YearMonthDate"},"record":{"path":"./../components/record"},"LoginRegister":{"path":"./../components/LoginRegister"},"choiseStar":{"path":"./../components/choiseStar"}},"on":{"10-4":["closeMask"],"10-5":["closeMask"],"10-6":["closeRecord"]}}, handlers: {'10-0': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.nowBottomTab = 'Fortune';
  })();
}},'10-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.nowBottomTab = 'Diary';
  })();
}},'10-2': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.nowBottomTab = 'Mine';
  })();
}},'10-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.openRecord.apply(_vm, $args || [$event]);
  })();
}},'10-4': {"closeMask": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeLogin.apply(_vm, $args || [$event]);
  })();
}},'10-5': {"closeMask": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeChoiceStar.apply(_vm, $args || [$event]);
  })();
}},'10-6': {"closeRecord": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeRecord.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });
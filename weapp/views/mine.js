"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _star = _interopRequireDefault(require('./../star/star.js'));

var _urlTool = _interopRequireDefault(require('./../js/lib/urlTool.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  name: "mine",
  mixins: [_test["default"]],
  data: {
    showAuguryInput: false,
    showChangeUserInfo: false,
    hotAuguryList: null,
    starConfig: _star["default"],
    daySignCard: ''
  },
  methods: {
    gotoShowChangeUserInfo: function gotoShowChangeUserInfo() {
      console.log('gotoShowChangeUserInfo');
      this.showChangeUserInfo = true;
    },
    gotoAuguryIntro: function gotoAuguryIntro() {
      this.$router.push('/auguryIntro');
    },
    gotoDaySign: function gotoDaySign() {
      if (!this.daySignCard) {
        _apiService["default"].orderingAugury('daySign').then(function (ret) {
          var url = _urlTool["default"].getUrlByParamsObj('https://nqobaxsg.cn/star_tarot/dist/getDayCard.html', {
            order_id: ret.insertId,
            title: '塔罗日签',
            token: _apiService["default"].token,
            outer: 1
          });

          wx.navigateTo({
            url: '/pages/web?url=' + encodeURIComponent(url)
          });
        })["catch"](function (e) {
          console.error(e);
        });
      } else {
        var url = _urlTool["default"].getUrlByParamsObj('https://nqobaxsg.cn/star_tarot/dist/getDayCard.html', {
          dayCard: this.daySignCard.name,
          order_id: this.daySignCard.foresee_id,
          token: _apiService["default"].token,
          title: '塔罗日签',
          outer: 1
        });

        wx.navigateTo({
          url: '/pages/web?url=' + encodeURIComponent(url)
        });
      }
    },
    gotoAugury: function gotoAugury(item) {
      if (item.hot_title) {
        _apiService["default"].orderingAugury('augury', item.type, item.tag, item.hot_title).then(function (ret) {
          _urlTool["default"].gotoHrefWithParam('/star_tarot/dist/getCard.html?order_id=' + ret.insertId + '&title=' + item.tag.split('&')[0]);
        });
      } else {
        this.showAuguryInput = true;
      }
    }
  },
  computed: {
    starNameByKey: function starNameByKey() {
      for (var i = 0; i < this.starConfig.length; i++) {
        var item = this.starConfig[i];

        if (this.$store.state.userInfo && item.key == this.$store.state.userInfo.starName) {
          return item.name;
        }
      }

      return '';
    },
    starBgByKey: function starBgByKey() {
      for (var i = 0; i < this.starConfig.length; i++) {
        var item = this.starConfig[i];

        if (this.$store.state.userInfo && item.key == this.$store.state.userInfo.starName) {
          return item.icon.replace('2.png', '22.png');
        }
      }

      return '';
    },
    starInfo: function starInfo() {
      return this.$store.state.starInfo;
    },
    star: function star() {
      return this.$store.state.cStar;
    },
    userInfo: function userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created: function created() {
    var _this = this;

    if (!_apiService["default"].token) {
      this.BUS.$emit('openLogin');
    }

    _apiService["default"].getHotAugury().then(function (ret) {
      _this.hotAuguryList = ret;
    })["catch"](function (e) {
      console.error(e);
    });

    var dsc;

    _apiService["default"].getDaySign().then(function (ret) {
      if (ret.length) {
        return ret[0];
      } else {
        return Promise.reject({
          msg: 'no daySign'
        });
      }
    }).then(function (daySign) {
      dsc = daySign;
      return _apiService["default"].getSimpleTarotCardInfo(daySign.card_nums);
    }).then(function (ret) {
      _this.daySignCard = Object.assign(dsc, ret[0]);
    })["catch"](function (e) {
      if (e.msg != 'no daySign') {
        console.error(e);
      }
    });
  }
}, {info: {"components":{"bgAnimation":{"path":"./../components/bgAnimation"},"augury":{"path":"./../components/augury"},"changeUserInfo":{"path":"./../components/changeUserInfo"}},"on":{"41-5":["closeRecord"],"41-6":["closeRecord"]}}, handlers: {'41-0': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoShowChangeUserInfo();
  })();
}},'41-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.gotoAuguryIntro.apply(_vm, $args || [$event]);
  })();
}},'41-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.gotoDaySign.apply(_vm, $args || [$event]);
  })();
}},'41-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.gotoAugury.apply(_vm, $args || [$event]);
  })();
}},'41-4': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.gotoAugury(item);
  })();
}},'41-5': {"closeRecord": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showAuguryInput = false;;
  })();
}},'41-6': {"closeRecord": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showChangeUserInfo = false;;
  })();
}}}, models: {}, refs: undefined });
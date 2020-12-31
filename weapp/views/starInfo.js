"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _urlTool = _interopRequireDefault(require('./../js/lib/urlTool.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  name: "starInfo",
  mixins: [_test["default"]],
  data: {
    cards: null,
    showRecord: false,
    daySign: null
  },
  methods: {
    changingStar: function changingStar() {
      this.BUS.$emit('changingStar');
    },
    changeTab: function changeTab(tab) {
      this.$store.commit('changeNowTab', tab);

      if ((tab == 'day' || tab == 'tomorrow') && this.userInfo && !this.userInfo.is_discuss_note) {
        this.showRecord = true;
      }
    },
    gotoDaySign: function gotoDaySign() {
      if (!this.daySign) {
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
          dayCard: this.daySign.card_nums,
          order_id: this.daySign.foresee_id,
          token: _apiService["default"].token,
          title: '塔罗日签',
          outer: 1
        });

        wx.navigateTo({
          url: '/pages/web?url=' + encodeURIComponent(url)
        });
      }
    }
  },
  watch: {
    '$store.state.starInfo': function $storeStateStarInfo(v) {
      console.log('watch:starInfo:return', this.$store.state.starInfo);
    }
  },
  computed: {
    nowTab: function nowTab() {
      return this.$store.state.nowTab;
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

    console.log('created:starInfo:return', this.$store.state.starInfo);

    _apiService["default"].getDaySign().then(function (ret) {
      _this.daySign = ret.length ? ret[0] : '';
    })["catch"](function (e) {
      if (e.errorDefined) {
        CommonEnv.toast(e.errorDefined);
      } else {
        console.error(e);
      }
    });
  },
  onShow: function onShow() {}
}, {info: {"components":{"bgAnimation":{"path":"./../components/bgAnimation"},"choiseStar":{"path":"./../components/choiseStar"},"starScore":{"path":"./../components/starScore"},"progressBar":{"path":"./../components/progressBar"}},"on":{}}, handlers: {'43-0': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoDaySign();
  })();
}},'43-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.changingStar.apply(_vm, $args || [$event]);
  })();
}},'43-2': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.changeTab('day');
  })();
}},'43-3': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.changeTab('tomorrow');
  })();
}},'43-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.changeTab('week');
  })();
}},'43-5': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.changeTab('month');
  })();
}},'43-6': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.changeTab('year');
  })();
}}}, models: {}, refs: undefined });
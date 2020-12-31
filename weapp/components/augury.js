"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _CommonEnv = _interopRequireDefault(require('./../js/class/CommonEnv.js'));

var _urlTool = _interopRequireDefault(require('./../js/lib/urlTool.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: ["d", "tab", "originStep"],
  mixins: [_test["default"]],
  data: {
    step: 1,
    type: '',
    text: '',
    defaultNextDay: null,
    isPickedTime: false,
    rcdConfig: {
      love: [{
        name: '感情发展',
        icon: 'jurassic_heliuxiangdai.png',
        selected: false
      }, {
        name: '桃花何时来',
        icon: 'taohua.png',
        selected: false
      }, {
        name: '我的真心',
        icon: 'xin.png',
        selected: false
      }, {
        name: '分手的方法',
        icon: 'broken-heart.png',
        selected: false
      }, {
        name: '如何化解争吵',
        icon: 'unhealthy.png',
        selected: false
      }, {
        name: '复合的可能性',
        icon: 'hezuo_gongshi.png',
        selected: false
      }],
      money: [{
        name: '财务状况',
        icon: 'caiwu_1.png',
        selected: false
      }, {
        name: '投资的状况',
        icon: 'touzi.png',
        selected: false
      }, {
        name: '采购的策略',
        icon: 'caigou.png',
        selected: false
      }],
      work: [{
        name: '工作运程',
        icon: 'yunshu.png',
        selected: false
      }, {
        name: '事业决策',
        icon: 'juecebaogao.png',
        selected: false
      }, {
        name: '发展前景提点',
        icon: 'qianjingyuce.png',
        selected: false
      }],
      study: [{
        name: '学业运势',
        icon: 'drxx18.png',
        selected: false
      }, {
        name: '学业提升方向',
        icon: 'xueyeguihua.png',
        selected: false
      }, {
        name: '与老师相处',
        icon: 'jiaoshi_banji.png',
        selected: false
      }, {
        name: '与同学相处',
        icon: 'xuexi-icon.png',
        selected: false
      }]
    }
  },
  computed: {
    nextDay: function nextDay() {
      if (this.defaultNextDay) {
        return this.defaultNextDay.Format('MM月dd日hh时mm分');
      } else {
        return '';
      }
    },
    remind: function remind() {
      if (this.defaultNextDay) {
        return this.defaultNextDay.Format('hh时mm分');
      } else {
        return '';
      }
    }
  },
  methods: {
    closeRecord: function closeRecord(isDiscuss) {
      this.step = 1;
      this.isPickedTime = false; //   if(isDiscuss){
      //       apiService.gotoSkipNote().then(ret => {
      //         this.$store.dispatch('login');
      //         this.$emit('closeRecord')
      //     });
      //   }

      this.$store.dispatch('login');
      this.$emit('closeRecord');
    },
    pickTime: function pickTime() {
      this.BUS.$emit('openPickerTime');
    },
    disPickTime: function disPickTime() {
      this.isPickedTime = false;
    },
    choiseTag: function choiseTag(item) {
      this.resetRdcConfig(); //   item.selected = !item.selected;

      this.rcdConfig[this.type].forEach(function (e) {
        if (e.name == item.name) {
          e.selected = !e.selected;
        }
      });
    },
    resetRdcConfig: function resetRdcConfig() {
      var _this = this;

      ['love', 'work', 'money', 'study'].forEach(function (t) {
        _this.rcdConfig[t].forEach(function (e) {
          e.selected = false;
        });
      });
    },
    joinRdcConfig: function joinRdcConfig() {
      var ret = '';
      this.rcdConfig[this.type].forEach(function (e) {
        if (e.selected) {
          ret += e.name + '&' + e.icon + '@';
        }
      });
      return ret;
    },
    getRdcConfig: function getRdcConfig() {
      var ret = '';
      this.rcdConfig[this.type].forEach(function (e) {
        if (e.selected) {
          ret = e.name;
        }
      });
      return ret;
    },
    orderingAugury: function orderingAugury() {
      var _this2 = this;

      var tag = this.joinRdcConfig();

      if (!tag) {
        _CommonEnv["default"].toast('您还没有选择标签喔~');

        return;
      }

      _apiService["default"].orderingAugury('augury', this.type, tag, this.text).then(function (ret) {
        return _CommonEnv["default"].awaitime(500).then(function (rr) {
          return ret;
        });
      }).then(function (ret) {
        var title = _this2.getRdcConfig();

        _this2.closeRecord();

        _this2.resetRdcConfig();

        _urlTool["default"].gotoHrefWithParam('/star_tarot/dist/getCard.html?order_id=' + ret.insertId + '&title=' + title);
      })["catch"](function (e) {
        console.error(e);

        _CommonEnv["default"].toast('保存失败，请稍后再试试吧~');
      });
    },
    gotoNext: function gotoNext(t) {
      this.type = t;
      this.step = 2;
    },
    gotoBack: function gotoBack() {
      this.isPickedTime = false;
      this.step = 1;
    },
    getNextDay: function getNextDay() {
      this.defaultNextDay = new Date(Number(this.d) + 24 * 60 * 60 * 1000);
      return new Date(Number(this.d) + 24 * 60 * 60 * 1000).Format('MM月dd日');
    },
    getNowDay: function getNowDay() {
      return new Date().Format('MM月dd日');
    }
  },
  created: function created() {
    this.d = this.d || Date.now();
    this.defaultNextDay = new Date(Number(this.d) + 24 * 60 * 60 * 1000);
  },
  onShow: function onShow() {
    var _this3 = this;

    this.BUS.$on('TimePicked', function (v) {
      _this3.defaultNextDay = new Date(_this3.defaultNextDay.Format('yyyy-MM-dd') + ' ' + v);
      _this3.isPickedTime = true;
    });
  }
}, {info: {"components":{},"on":{}}, handlers: {'60-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeRecord.apply(_vm, $args || [$event]);
  })();
}},'60-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'60-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeRecord.apply(_vm, $args || [$event]);
  })();
}},'60-3': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('love');
  })();
}},'60-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('money');
  })();
}},'60-5': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('work');
  })();
}},'60-6': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('study');
  })();
}},'60-7': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.closeRecord(true);
  })();
}},'60-8': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'60-9': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.gotoBack.apply(_vm, $args || [$event]);
  })();
}},'60-10': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.orderingAugury.apply(_vm, $args || [$event]);
  })();
}},'60-11': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.choiseTag(item);
  })();
}},'60-12': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.orderingAugury.apply(_vm, $args || [$event]);
  })();
}},'60-13': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.closeRecord(true);
  })();
}}}, models: {'3': {
      type: "input",
      expr: "text",
      handler: function set ($v) {
      var _vm=this;
        _vm.text = $v;
      
    }
    }}, refs: undefined });
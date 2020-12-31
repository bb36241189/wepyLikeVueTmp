"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _CommonEnv = _interopRequireDefault(require('./../js/class/CommonEnv.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  props: {
    d: Number,
    tab: String,
    originStep: Number,
    editData: Object
  },
  data: {
    step: 1,
    type: '',
    text: '',
    defaultNextDay: null,
    isPickedTime: false,
    rcdConfig: {
      love: [{
        name: '看电影',
        icon: 'dianying.png',
        selected: false
      }, {
        name: '打电话',
        icon: 'lianxi.png',
        selected: false
      }, {
        name: '发信息',
        icon: 'lianxi_1.png',
        selected: false
      }, {
        name: '送礼物',
        icon: 'liwu.png',
        selected: false
      }, {
        name: '去冒险',
        icon: 'maoxian.png',
        selected: false
      }, {
        name: '约吃饭',
        icon: 'tubiao-.png',
        selected: false
      }],
      money: [{
        name: '做规划',
        icon: 'guihua.png',
        selected: false
      }, {
        name: '做盘点',
        icon: 'pandian.png',
        selected: false
      }, {
        name: '售卖',
        icon: 'shoumailingyang.png',
        selected: false
      }, {
        name: '人脉',
        icon: 'tianjiarenmai.png',
        selected: false
      }],
      work: [{
        name: '安排',
        icon: 'anpai.png',
        selected: false
      }, {
        name: '干活',
        icon: 'ganhuo.png',
        selected: false
      }, {
        name: '汇报',
        icon: 'huibao.png',
        selected: false
      }, {
        name: '开会',
        icon: 'kaihui.png',
        selected: false
      }],
      play: [{
        name: '打球',
        icon: 'ball.png',
        selected: false
      }, {
        name: '酒吧',
        icon: 'jiuba.png',
        selected: false
      }, {
        name: '唱歌',
        icon: 'KTV.png',
        selected: false
      }, {
        name: '泡汤',
        icon: 'paozao.png',
        selected: false
      }, {
        name: '推拿',
        icon: 'Massage.png',
        selected: false
      }, {
        name: '咖啡',
        icon: 'shangwutubiao-.png',
        selected: false
      }, {
        name: '游泳',
        icon: 'youyong.png',
        selected: false
      }, {
        name: '游戏',
        icon: 'youxi.png',
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
    },
    remind2: function remind2() {
      if (this.defaultNextDay) {
        return this.defaultNextDay.Format('hh:mm');
      } else {
        return '00:00';
      }
    },
    getNextDay: function getNextDay() {
      this.defaultNextDay = new Date(Number(this.d) + 24 * 60 * 60 * 1000);
      return new Date(Number(this.d) + 24 * 60 * 60 * 1000).Format('MM月dd日');
    },
    getNowDay: function getNowDay() {
      return new Date(this.d).Format('MM月dd日');
    }
  },
  methods: {
    closeRecord: function closeRecord(isDiscuss) {
      var _this = this;

      console.log('closeRecord');
      this.step = 1;
      this.isPickedTime = false;

      if (isDiscuss) {
        _apiService["default"].gotoSkipNote().then(function (ret) {
          _this.$store.dispatch('login');

          _this.$emit('closeRecord');
        })["catch"](function (e) {
          console.error(e);
        });
      } else {
        this.$store.dispatch('login');
        this.$emit('closeRecord');
      }
    },
    pickTime: function pickTime(e) {
      console.log('pickTime', e.$wx.detail.value, this.defaultNextDay.Format('yyyy-MM-dd') + ' ' + e.$wx.detail.value);
      this.defaultNextDay = new Date(this.defaultNextDay.Format('yyyy/MM/dd') + ' ' + e.$wx.detail.value + ':00');
      this.isPickedTime = true; //   this.BUS.$emit('openPickerTime');
    },
    disPickTime: function disPickTime() {
      console.log('disPickTime');
      this.isPickedTime = false;
    },
    choiseTag: function choiseTag(item) {
      console.log('choiseTag', item); //   item.selected = !item.selected;

      this.rcdConfig[this.type].forEach(function (e) {
        if (e.name == item.name) {
          e.selected = !e.selected;
        }
      });
    },
    renderEditData: function renderEditData() {
      var tags = this.editData.tag.split('@');
      this.rcdConfig[this.editData.type].forEach(function (e) {
        tags.forEach(function (ee) {
          if (ee.indexOf(e.name) > -1) {
            e.selected = true;
          }
        });
      });
      this.text = this.editData.text;
      this.type = this.editData.type;
    },
    resetRdcConfig: function resetRdcConfig() {
      var _this2 = this;

      ['love', 'work', 'money', 'play'].forEach(function (t) {
        _this2.rcdConfig[t].forEach(function (e) {
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
    saveNote: function saveNote() {
      var _this3 = this;

      var tag = this.joinRdcConfig(),
          promise;

      if (!tag) {
        _CommonEnv["default"].toast('您还没有选择标签喔~');

        return;
      }

      if (this.editData) {
        promise = _apiService["default"].updateNote(this.editData.note_id, this.text, tag, this.isPickedTime ? 1 : 0, this.tab == 'tomorrow' ? this.defaultNextDay.getTime() : Date.now());
      } else {
        promise = _apiService["default"].saveNote(this.tab, this.type, tag, this.text, this.isPickedTime ? 1 : 0, this.tab == 'tomorrow' ? this.defaultNextDay.getTime() : Date.now());
      }

      promise.then(function () {
        _this3.closeRecord();

        _this3.resetRdcConfig();

        _this3.editData && _this3.BUS.$emit('editedNote', Object.assign({}, _this3.editData, {
          text: _this3.text,
          tag: tag,
          notice_time: _this3.tab == 'tomorrow' ? _this3.defaultNextDay.getTime() : Date.now()
        }));
        !_this3.editData && _this3.BUS.$emit('savedNote');
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
    }
  },
  ready: function ready() {
    console.log('record:created', 'editData:', this.editData, this.d, this.originStep, this.BUS);

    if (this.originStep) {
      this.step = this.originStep;
    }

    !this.d && (this.d = Date.now());
    this.defaultNextDay = new Date(Number(this.d) + 24 * 60 * 60 * 1000);

    if (this.editData) {
      this.renderEditData();
      this.step = 2;

      if (this.editData.notice) {
        this.isPickedTime = true;
        this.tab = 'tomorrow';
        this.defaultNextDay = new Date(Number(this.editData.notice_time));
      }
    }
  },
  onShow: function onShow() {//   this.BUS.$on('TimePicked',v => {
    //       this.defaultNextDay = new Date(this.defaultNextDay.Format('yyyy-MM-dd') + ' ' + v);
    //       this.isPickedTime = true;
    //   })
  }
}, {info: {"components":{},"on":{}}, handlers: {'23-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeRecord.apply(_vm, $args || [$event]);
  })();
}},'23-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'23-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closeRecord.apply(_vm, $args || [$event]);
  })();
}},'23-3': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('love');
  })();
}},'23-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('money');
  })();
}},'23-5': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('work');
  })();
}},'23-6': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.gotoNext('play');
  })();
}},'23-7': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.closeRecord(true);
  })();
}},'23-8': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'23-9': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.gotoBack.apply(_vm, $args || [$event]);
  })();
}},'23-10': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.saveNote.apply(_vm, $args || [$event]);
  })();
}},'23-11': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.pickTime.apply(_vm, $args || [$event]);
  })();
}},'23-12': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.disPickTime();
  })();
}},'23-13': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.choiseTag(item);
  })();
}},'23-14': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.saveNote.apply(_vm, $args || [$event]);
  })();
}},'23-15': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.closeRecord(true);
  })();
}}}, models: {'0': {
      type: "input",
      expr: "text",
      handler: function set ($v) {
      var _vm=this;
        _vm.text = $v;
      
    }
    }}, refs: undefined });
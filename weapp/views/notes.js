"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _urlTool = _interopRequireDefault(require('./../js/lib/urlTool.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  name: "notes",
  mixins: [_test["default"]],
  data: {
    notes: null,
    dateSection: null,
    goTop: false,
    offset: 0,
    //月份偏移
    showBottomPop: false,
    nowHandleIndex: -1
  },
  computed: {
    getCurrMonthFormat: function getCurrMonthFormat() {
      var now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + Number(this.offset), 1).Format('yyyy年MM月');
    }
  },
  watch: {
    '$store.state.userInfo': function $storeStateUserInfo(v) {
      this.getNotes(0);
    }
  },
  methods: {
    reBuildNotes: function reBuildNotes(notes) {
      var ret = [];

      var _loop = function _loop(i) {
        var tags = notes[i].tag.split('@');
        var tags2 = [];
        tags.forEach(function (e) {
          if (e) {
            tags2.push({
              name: e.split('&')[0],
              icon: e.split('&')[1]
            });
          }
        });
        ret.push(Object.assign(notes[i], {
          tags: tags2,
          datatime: new Date(Number(notes[i].time)).Format('MM-dd hh:mm'),
          noticetimeFormat: new Date(Number(notes[i].notice_time)).Format('MM-dd hh:mm')
        }));
      };

      for (var i = 0; i < notes.length; i++) {
        _loop(i);
      }

      return ret;
    },
    reBuildNote: function reBuildNote(note) {
      var tags = note.tag.split('@');
      var tags2 = [];
      tags.forEach(function (e) {
        if (e) {
          tags2.push({
            name: e.split('&')[0],
            icon: e.split('&')[1]
          });
        }
      });
      Object.assign(note, {
        tags: tags2,
        datatime: new Date(Number(note.time)).Format('MM-dd hh:mm'),
        noticetimeFormat: new Date(Number(note.notice_time)).Format('MM-dd hh:mm')
      });
    },
    editedNote: function editedNote(note) {
      for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].note_id == note.note_id) {
          Object.assign(this.notes[i], note);
          this.reBuildNote(this.notes[i]);
        }
      }
    },
    doneItem: function doneItem(item) {
      console.log(item);

      if (item.tab == "augury") {
        _apiService["default"].getAuguryOrder(item.note_id, true).then(function (ret) {
          if (ret.length && ret[0].card_nums.length && ret[0].status == 1) {
            var cards = ret[0].card_nums.split(',');

            _urlTool["default"].gotoHrefWithParam('/star_tarot/dist/tarotAnswer.html', {
              title: item.tag.split('&')[0],
              order_id: ret[0].foresee_id,
              prev: cards[0],
              now: cards[1],
              next: cards[2],
              outer: true
            });
          } else if (ret.length) {
            _urlTool["default"].gotoHrefWithParam('/star_tarot/dist/getCard.html', {
              title: item.tag.split('&')[0],
              order_id: ret[0].foresee_id,
              outer: true
            });
          }
        })["catch"](function (e) {
          console.error(e);
        });
      }
    },
    gotoPrevMonth: function gotoPrevMonth() {
      this.offset--;

      if (this.judgeIsCrossTheBorder()) {
        this.offset++;
        return;
      }

      this.getNotes(this.offset);
    },
    gotoNextMonth: function gotoNextMonth() {
      this.offset++;

      if (this.judgeIsCrossTheBorder()) {
        this.offset--;
        return;
      }

      this.getNotes(this.offset);
    },
    judgeIsCrossTheBorder: function judgeIsCrossTheBorder() {
      var now = new Date();
      var prefix = new Date(now.getFullYear(), now.getMonth() + Number(this.offset), 1).getTime();
      var suffix = new Date(now.getFullYear(), now.getMonth() + Number(this.offset), 32);
      suffix = suffix.getTime() - (suffix.getDate() - 1) * 24 * 60 * 60 * 1000;

      if (suffix <= Number(this.dateSection.minTime) || prefix > this.dateSection.maxTime) {
        return true;
      } else {
        return false;
      }
    },
    doShowBottomPop: function doShowBottomPop(item, index) {
      console.log('doShowBottomPop', item, index);
      this.nowHandleIndex = index;
      this.showBottomPop = true;
    },
    deletedNote: function deletedNote() {
      this.notes.splice(this.nowHandleIndex, 1);
      this.showBottomPop = false;
    },
    handleScroll: function handleScroll(e) {
      if (this.handleScroll.beforeScrollTop && this.handleScroll.beforeScrollTop < e.target.scrollTop) {
        if (e.target.scrollTop > 5) {
          this.goTop = true;
        }
      } else {
        if (e.target.scrollTop < 5) {
          this.goTop = false;
        }
      }

      this.handleScroll.beforeScrollTop = e.target.scrollTop;
    },
    getNotes: function getNotes() {
      var _this = this;

      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return _apiService["default"].getNotes(offset).then(function (ret) {
        _this.notes = _this.reBuildNotes(ret[0]);
        _this.dateSection = ret[1][0];
      })["catch"](function (e) {
        console.error(e);
      });
    }
  },
  created: function created() {
    var _this2 = this;

    this.BUS.$on('savedNote', function () {
      _this2.getNotes(0);
    });

    if (!_apiService["default"].token) {
      this.BUS.$emit('openLogin');
    } else {
      this.getNotes(0);
    }
  }
}, {info: {"components":{"choiseStar":{"path":"./../components/choiseStar"},"bgAnimation":{"path":"./../components/bgAnimation"},"bottomPopBtn":{"path":"./../components/bottomPopBtn"}},"on":{"42-5":["closePop","deleted","editedNote"]}}, handlers: {'42-0': {"scroll": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleScroll.apply(_vm, $args || [$event]);
  })();
}},'42-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.gotoPrevMonth.apply(_vm, $args || [$event]);
  })();
}},'42-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.gotoNextMonth.apply(_vm, $args || [$event]);
  })();
}},'42-3': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.doneItem(item);
  })();
}},'42-4': {"tap": function proxy (item, index) {
    var _vm=this;
  return (function () {
    _vm.doShowBottomPop(item,index);
  })();
}},'42-5': {"closePop": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showBottomPop = false;
  })();
}, "deleted": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.deletedNote.apply(_vm, $args || [$event]);
  })();
}, "editedNote": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.editedNote.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });
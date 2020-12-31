"use strict";

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: ["shade1", "shade2", "cancel", "item"],
  mixins: [_test["default"]],
  data: {
    a: 1
  },
  computed: {},
  methods: {
    closePop: function closePop() {
      this.$emit('closePop');
    },
    deleteNote: function deleteNote() {
      var _this = this;

      _apiService["default"].deleteNote(this.item.note_id, this.item.tab).then(function (ret) {
        _this.$emit('deleted');
      })["catch"](function (e) {
        console.error(e);
      });
    },
    editNote: function editNote() {
      var _this2 = this;

      this.BUS.$emit('editNote', this.item);
      this.BUS.$on('editedNote', function (data) {
        _this2.$emit('editedNote', data);

        _this2.closePop();

        _this2.BUS.$off('editedNote');
      }); //   this.closePop();
    }
  },
  created: function created() {
    console.log('bottomPopBtn');
  },
  onShow: function onShow() {}
}, {info: {"components":{},"on":{}}, handlers: {'62-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closePop.apply(_vm, $args || [$event]);
  })();
}},'62-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    ;
  })();
}},'62-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.deleteNote.apply(_vm, $args || [$event]);
  })();
}},'62-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.editNote.apply(_vm, $args || [$event]);
  })();
}},'62-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.closePop.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });
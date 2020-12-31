"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  methods: {
    onValuesChange: function onValuesChange(picker, values) {
      if (this.date != values[2]) {
        this.date = values[2];
      }

      if (this.month != values[1]) {
        this.month = values[1];
        this.renderDate(picker);
      }

      if (this.year != values[0]) {
        this.year = values[0];
      }
    },
    closePopup: function closePopup() {
      this.popupVisible = false;
      this.BUS.$emit('DatePicked', this.year + '-' + this.month + '-' + this.date);
    },
    renderDate: function renderDate(picker) {
      var _this$slots$4$values;

      var dayNum = 32 - new Date(this.year, Number(this.month) - 1, 32).getDate();
      var v = [];

      for (var i = 1; i <= dayNum; i++) {
        v.push(i < 10 ? "0" + i : String(i));
      }

      !picker && (_this$slots$4$values = this.slots[4].values).push.apply(_this$slots$4$values, v);
      picker && picker.setSlotValues(2, v);
    }
  },
  watch: {// month(v){
    //   this.renderDate();
    // }
  },
  data: {
    popupVisible: false,
    year: '1949',
    month: '01',
    date: '01',
    slots: [{
      flex: 1,
      values: [],
      className: "slot1",
      defaultIndex: 0,
      textAlign: "center"
    }, {
      divider: true,
      content: "-",
      className: "slot2"
    }, {
      flex: 1,
      values: [],
      className: "slot3",
      defaultIndex: 0,
      textAlign: "center"
    }, {
      divider: true,
      content: "-",
      className: "slot4"
    }, {
      flex: 1,
      values: [],
      className: "slot5",
      defaultIndex: 0,
      textAlign: "center"
    }]
  },
  onShow: function onShow() {
    var _this = this;

    this.BUS.$on("openPickerDate", function (dateStr) {
      _this.popupVisible = true;
      var d = dateStr.split('-');

      if (dateStr) {
        _this.year = d[0];
        _this.slots[0].defaultIndex = _this.slots[0].values.indexOf(_this.year);
        _this.month = d[1];
        _this.slots[2].defaultIndex = _this.slots[2].values.indexOf(_this.month);
        _this.date = d[2];
        _this.slots[4].defaultIndex = _this.slots[4].values.indexOf(_this.date);
      }
    });
    this.BUS.$on("setDate", function (dateStr) {
      var d = dateStr.split('-');
      _this.year = d[0];
      _this.month = d[1];
      _this.date = d[2];
    });
  },
  created: function created() {
    var now = new Date();

    for (var i = 1949; i <= Number(now.getFullYear()); i++) {
      this.slots[0].values.push(String(i));
    }

    for (var _i = 1; _i <= 12; _i++) {
      this.slots[2].values.push(_i < 10 ? "0" + _i : String(_i));
    }

    this.renderDate();
  }
}, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined });
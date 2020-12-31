"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ajax = _interopRequireDefault(require('./class/ajax.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by Administrator on 2018/1/30 0030.
 */
var logurl = 'http://nqobaxsg.cn:3002/';
var host = 'https://nqobaxsg.cn/xiaoxiong/';

function ApiService() {
  this.token = wx.getStorageSync('token');
}

ApiService.prototype = {
  constructor: ApiService,
  serviceLog: function serviceLog(route, data) {
    return _ajax["default"].post({
      url: logurl + route,
      data: data
    });
  },
  guid: function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  getStarInfo: function getStarInfo(star) {
    var self = this;
    return _ajax["default"].get({
      url: host + 'starInfo',
      data: {
        star: star
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  tokenLogin: function tokenLogin() {
    var self = this;
    return _ajax["default"].post({
      url: host + 'tokenLogin',
      data: {
        token: this.token
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  starLogin: function starLogin(phone, code, starName) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'starLogin',
      data: {
        phone: phone,
        code: code,
        starName: starName
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  starLoginWxMiniPro: function starLoginWxMiniPro(starName) {
    var _this = this;

    return new Promise(function (r, j) {
      wx.cloud.callFunction({
        name: 'openapi',
        data: {
          action: 'loginWithOpenid',
          body: {
            starName: starName
          }
        },
        success: function success(res) {
          r(res.result); // console.log(`[subDailyWeatherCloudFn] => OK => ${res}`)
        },
        fail: function fail(err) {
          j(err); // console.log(`[subDailyWeatherCloudFn] => Fail => ${err}`)
        }
      });
    })["catch"](function (e) {
      return Promise.reject(_this.wrapperError(e, {}));
    });
  },
  sendValideCode: function sendValideCode(phone) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'sendValideCode',
      data: {
        phone: phone
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  getAuguryOrder: function getAuguryOrder(note_id, include_nouse) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'getAuguryOrder',
      data: {
        token: this.token,
        note_id: note_id,
        include_nouse: include_nouse
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  updateUserInfo: function updateUserInfo(sex, nickname, birth_day) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'updateUserInfo',
      data: {
        sex: sex,
        nickname: nickname,
        birth_day: birth_day,
        token: this.token
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  orderingAugury: function orderingAugury(tab, type, tag, text) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'orderingAugury',
      data: {
        token: this.token,
        tab: tab,
        type: type ? type : '',
        tag: tag ? tag : '',
        text: text ? text : ''
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  updateNote: function updateNote(note_id, text, tag, notice, time) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'updateNote',
      data: {
        token: this.token,
        note_id: note_id,
        tag: tag,
        text: text,
        notice: notice,
        time: time
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  saveNote: function saveNote(tab, type, tag, text, notice, time) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'saveNote',
      data: {
        token: this.token,
        tab: tab,
        type: type,
        tag: tag,
        text: text,
        notice: notice,
        time: time
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  deleteNote: function deleteNote(note_id, tab) {
    var self = this;
    return _ajax["default"].post({
      url: host + 'deleteNote',
      data: {
        token: this.token,
        note_id: note_id,
        tab: tab
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  getDaySign: function getDaySign() {
    var self = this;
    return _ajax["default"].post({
      url: host + 'getDaySign',
      data: {
        token: this.token
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  getNotes: function getNotes() {
    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var self = this;
    return _ajax["default"].post({
      url: host + 'notes',
      data: {
        token: this.token,
        offset: offset
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  gotoSkipNote: function gotoSkipNote() {
    var self = this;
    return _ajax["default"].post({
      url: host + 'gotoSkipNote',
      data: {
        token: this.token
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  getSimpleTarotCardInfo: function getSimpleTarotCardInfo(cards) {
    var self = this;
    return _ajax["default"].get({
      url: host + 'getSimpleTarotCardInfo',
      data: {
        cards: cards
      }
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  getHotAugury: function getHotAugury() {
    var self = this;
    return _ajax["default"].get({
      url: host + 'hot_augury',
      data: {}
    }).then(function (ret) {
      return ret;
    })["catch"](function (e) {
      return Promise.reject(self.wrapperError(e, {}));
    });
  },
  wrapperError: function wrapperError(e, errorDefind) {
    if (Object.prototype.toString.call(e) === '[object Undefined]') {
      e = {};
    } else if (Object.prototype.toString.call(e) === '[object String]') {
      e = {
        message: e
      };
    }

    if (e.errorNo === 'SA003' || e.errorNo === 'SA002' || e.errorNo === 'A0002' || e.errorNo === 'UC011') {
      e.errorDefind = '登录超时';
    } else if (e.errorNo === 'ATS007') {
      e.errorDefind = '你已经登录其他账号';
    } else if (e.errorNo === 'ATC001') {
      e.errorDefind = '你还没有登录';
    } else if (e.message) {
      e.errorDefind = e.message;
    } else if (e.msg) {
      e.errorDefind = e.msg;
    }

    if (e.errorNo && errorDefind && errorDefind[e.errorNo]) {
      e.errorDefind = errorDefind[e.errorNo];
    }

    if (!e.errorDefind) {
      e.errorDefind = '网络异常';
    }

    console.warn(e);
    return e;
  }
};

var _default = new ApiService();

exports["default"] = _default;
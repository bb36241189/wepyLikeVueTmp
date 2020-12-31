"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apiService = _interopRequireDefault(require('./../js/apiService.js'));

var _eventHub = _interopRequireDefault(require('./../common/eventHub.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by Administrator on 2018/9/13 0013.
 */
var _default = {
  state: {
    starInfo: null,
    cStar: null,
    //本地存储的星座选择信息的恢复
    userInfo: null,
    //用户信息
    nowTab: 'day' //星座运势的哪一个tab页

  },
  mutations: {
    changeStarInfo: function changeStarInfo(state, v) {
      state.starInfo = v;
    },
    changeCStar: function changeCStar(state, v) {
      state.cStar = v;
    },
    changeUserInfo: function changeUserInfo(state, v) {
      state.userInfo = v;
    },
    changeNowTab: function changeNowTab(state, v) {
      state.nowTab = v;
    }
  },
  done: function done(scope) {
    var _this = this;

    _eventHub["default"].$on('$store:change', scope['$store:change:eventHandler'] = function (v) {
      Object.assign(scope.$store.state, v);
      Object.assign(_this.state, v); // console.log('eventBus:$store:change',scope.$store)
    });
  },
  disDone: function disDone(scope) {
    _eventHub["default"].$off('$store:change', scope['$store:change:eventHandler']);
  },
  commit: function commit(k, v) {
    if (this.mutations[k]) {
      this.mutations[k](this.state, v);

      _eventHub["default"].$emit('$store:change', this.state);
    }
  },
  dispatch: function dispatch(k, v) {
    if (this.actions[k]) {
      this.actions[k]({
        commit: this.commit.bind(this)
      }, v);
    }
  },
  getters: {
    doubleCount: function doubleCount(state) {
      return state.count * 2;
    }
  },
  actions: {
    loadStarInfo: function loadStarInfo(_ref, starKey) {
      var commit = _ref.commit;
      return _apiService["default"].getStarInfo(starKey).then(function (ret) {
        commit('changeStarInfo', ret);
      })["catch"](function (e) {
        console.error(e);
      });
    },
    login: function login(_ref2) {
      var commit = _ref2.commit;
      return _apiService["default"].tokenLogin().then(function (ret) {
        if (!ret.code) {
          commit('changeUserInfo', ret);
        } else {
          return Promise.reject(ret);
        }
      })["catch"](function (e) {
        if (e.code && e.code == 103) {
          wx.removeStorageSync('token');
          delete _apiService["default"].token;
        } else {
          console.error(e);
        }
      });
    }
  }
};
exports["default"] = _default;
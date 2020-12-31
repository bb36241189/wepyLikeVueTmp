"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  mixins: [_test["default"]],
  data: {
    currentRoute: ''
  },
  methods: {},
  watch: {
    '$route.path': function $routePath(v) {
      console.log('watch:$router', v);
      this.currentRoute = v;
    }
  },
  created: function created() {
    console.log('routerView:created', this.$router);
    this.$router.push('/starInfo');
  }
}, {info: {"components":{"bgAnimation":{"path":"./../components/bgAnimation"},"auguryIntro":{"path":"./../views/auguryIntro"},"mine":{"path":"./../views/mine"},"notes":{"path":"./../views/notes"},"starInfo":{"path":"./../views/starInfo"}},"on":{}}, handlers: {}, models: {}, refs: undefined });
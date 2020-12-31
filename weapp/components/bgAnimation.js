"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(1));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: ["score", "color", 'externalClasses'],
  mixins: [_test["default"]],
  data: {
    frameIndex: 0,
    meteorPosition: {
      x: 750
      /*1334/*window.screen.height*/
      ,
      y: 0,
      tx: -0.5,
      ty: 0.5
    },
    stars: null
  },
  computed: {},
  watch: {
    'meteorPosition.y': function meteorPositionY() {
      this.frameIndex++;
      var v = this.meteorPosition;
      setTimeout(function () {
        v.x += v.tx;
        v.y += v.ty;

        if (v.y > 1334
        /*window.screen.height*/
        ) {
            v.y = -200;

            if (v.x > 750
            /*1334/*window.screen.height*/
            || v.x < 0) {
              v.x = Math.random() * 750
              /*1334/*window.screen.height*/
              * 2;
            }
          }
      }, 20);

      if (this.frameIndex % 3 != 0) {
        return;
      }

      this.stars.forEach(function (st) {
        if (st.isUp) {
          st.opacity < 1 && (st.opacity += 0.05);
          st.opacity >= 1 && (st.isUp = false);
        } else {
          st.opacity > 0 && (st.opacity -= 0.05);
          st.opacity <= 0 && (st.isUp = true);
        }
      });
    }
  },
  methods: {
    randomStar: function randomStar() {
      var num = Math.floor(Math.random() * 50);
      this.stars = [];

      for (var i = 0; i < num; i++) {
        var w = Math.random() * 0.5;
        this.stars.push({
          x: Math.random() * 750
          /*1334/*window.screen.height*/
          ,
          y: Math.random() * 1334
          /*window.screen.height*/
          ,
          opacity: Math.random(),
          isUp: Math.random() > 0.5,
          //是不是正在变亮
          width: w,
          height: w
        });
      }
    }
  },
  created: function created() {
    console.log('bgAnimation created');
    this.meteorPosition.y++;
    this.randomStar();
  },
  mounted: function mounted() {//   this.meteorPosition.y ++;
    //   this.randomStar();
  }
}, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined });
import eventHub from '../common/eventHub';
import store from '../store/store';
import router from '../router/router';


Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


export default {
  data: {
    mixin: 'MixinText',
    sysInfo: {},
    custom: 0,
    img_url: 'https://nqobaxsg.cn/star-info/dist/img/',
    customBar: 0,
    $store: store,
    $router: router,
    $route: router.route
  },
  methods: {
    getSysInfo() {
      return this.sysInfo;
    },
    getSafeArea() {
      let sys = this.getSysInfo();
      if (!sys.safeArea) {
        sys.safeArea = {
          bottom: 667,
          height: 667,
          left: 0,
          right: 375,
          top: 0,
          width: 375
        }
      }
      var rate = 750 / sys.safeArea.width;
      return {
        bottom: sys.safeArea.bottom * rate,
        height: sys.safeArea.height * rate,
        left: sys.safeArea.left * rate,
        right: sys.safeArea.right * rate,
        top: sys.safeArea.top * rate,
        width: sys.safeArea.width * rate,
        bs: sys.safeArea.top > 30 ? sys.safeArea.top : 0
      }
    },
  },
  computed: {
    safeArea() {
      return this.getSafeArea();
    },
    isiOS() {
      // return false;
      return this.sysInfo.system ? this.sysInfo.system.toLowerCase().indexOf('ios') > -1 : true;
    }
  },
  detached(){
    store.disDone(this);
    router.disDone(this);
  },
  created() {
    this.BUS = eventHub;
    store.done(this);
    router.done(this);
    // this.$store.done(this);
    // this.$router.done(this);
    wx.getSystemInfo({
      success: e => {
        // Object.assign(this.sysInfo,e);
        this.sysInfo = e;
        // if(this.sysInfo.version && this.sysInfo.version < '7.0.9'){
        //   wx.showToast({
        //     title: '当前微信版本过低，请升级微信版本',
        //     icon: 'none',
        //     duration: 2000
        //   });
        // }
        this.statusBar = e.statusBarHeight; //状态栏高度
        let custom = wx.getMenuButtonBoundingClientRect();//菜单按钮
        this.custom = custom;
        this.customBar = (custom.bottom + custom.top) / 2;
      }
    });
  }
}
 
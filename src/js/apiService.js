/**
 * Created by Administrator on 2018/1/30 0030.
 */
import ajaxService from './class/ajax';
const logurl = 'http://nqobaxsg.cn:3002/';
const host = 'https://nqobaxsg.cn/xiaoxiong/';
function ApiService() {
    this.token = wx.getStorageSync('token');
}
ApiService.prototype = {
    constructor: ApiService,
    serviceLog(route, data) {
        return ajaxService.post({
            url: logurl + route,
            data: data
        });
    },
    wrapperError: function (e, errorDefind) {
        if (Object.prototype.toString.call(e) === '[object Undefined]') {
            e = {};
        } else if (Object.prototype.toString.call(e) === '[object String]') {
            e = { message: e };
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
            e.errorDefind = errorDefind[e.errorNo]
        }
        if (!e.errorDefind) {
            e.errorDefind = '网络异常';
        }
        console.warn(e);
        return e;
    }
};
export default new ApiService();

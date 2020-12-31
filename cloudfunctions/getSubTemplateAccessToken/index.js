
//timerGetAccessToken
const cloud = require('wx-server-sdk')
const APPID = 'wxf1aa9b99116f1912'
const APPSECRET = '3ca7640057e7220d3e86b2c6953003a8'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const coll_token = db.collection('accessToken');
const rq = require('request-promise')


exports.main = async (event, context) => {
  try {
    let res = await rq({
      method: 'GET',
      uri: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET,
    });
    res = JSON.parse(res)
    let resUpdate = await coll_token.doc('ACCESS_TOKEN').update({
      data: {
        token: res.access_token
      },
      success: function(res) {
        console.log(res)
      }
    })
  } catch (e) {
    console.error(e)
  }
}
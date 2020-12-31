const cloud = require('wx-server-sdk');
const templateMessage = require('templateMessage.js');
require('dateFormat.js');
const rp = require('request-promise');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {

  const db = cloud.database();
  let today = new Date();
  today.setDate(today.getDate() - 1);
  const yesterday = today.Format('yyyy-MM-dd');
  try {
    const AllUserWeatherData = await db
      .collection('sub_daily_weather_user')
      .where({
        done: false,
        date: yesterday
      }).limit(30).get();


      // for(let i = 0;i<AllUserWeatherData.data.length;i++) {
      //   let userWeatherData = AllUserWeatherData.data[i];
        
      // }

    const sendPromises = AllUserWeatherData.data.map(async userWeatherData => {
      try {
        if (true) {

          let sendTemplateData = {
            'thing2': {
              value: "点击立即签到"
            },
            'thing1': {
              value: "每日签到",
            },
            'number3': {
              value: 1,
            }
          }
          let getToken = await db.collection("accessToken").doc("ACCESS_TOKEN").get();
          let token = getToken.data.token;
          let curData = {
            'touser': userWeatherData.touser,
            'page': "pages/index",
            'data': sendTemplateData,
            'templateId': "7eCLeK2WmsTi6zB5S7k2f4E9A0IDPXxozVTeHZQYbDA",
          }
          console.log('------------token-----------', token)
          console.log('----------curData-----------', curData)
          await templateMessage.sendTemplateMsg(token, curData);
          await db
            .collection('sub_daily_weather_user')
            .doc(userWeatherData._id)
            .remove();
          // .update({
          //   data: {
          //     done: true,
          //   },
          // });
          return userWeatherData.touser;
        }
      } catch (e) {
        return e;
      }
    });
    return Promise.all(sendPromises);
  } catch (err) {
    console.log(err);
    return err;
  }
};
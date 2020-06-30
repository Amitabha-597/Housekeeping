// pages/Launchpage/Launchpage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isShowLoginBox: true
  },
  goCustomer() {
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
    wx.navigateTo({
      url: '/pages/myhome/myhome',
    })
  },
  // userLogin: function () {
  //   var self = this;

  //   wx.login({
  //     success(res) {
  //       // console.log('小程序登录：', res);
  //       let code = res.code;

  //       wx.setStorageSync('code', code)

  //       wx.getSetting({
  //         success(res) {
  //           // console.log('获取用户当前设置：', res);
  //           let scopeUserInfo = res.authSetting["scope.userInfo"];
  //           if (scopeUserInfo) {
  //             // 已经授权则隐藏授权登录框
  //             self.setData({
  //               isShowLoginBox: false
  //             });

  //             wx.getUserInfo({
  //               success(res) {
  //                 console.log('获取用户信息：', res);
  //                 let ivs=res.iv
  //                 let encryptedDatas= res.encryptedData
  //                 let userInfo = res.userInfo;
  //                 let rawData = res.rawData;
  //                 wx.setStorageSync('userInfo', userInfo);

  //                 if (userInfo) {
  //                   app.$request('/login/login', 'POST', {
  //                     code: wx.getStorageSync('code'),
  //                     iv:ivs,
  //                     encryptedData:encryptedDatas
  //                   }).then(function (result) {
  //                     let data = result.data;
  //                     console.log(result);

  //                     if (data.code === 200) {
  //                       wx.setStorageSync('token', data.data.token)
  //                       wx.setStorageSync('session_key', data.data.session_key)
  //                       wx.setStorageSync('openid', data.data.openid)
  //                       wx.setStorageSync('points', data.data.points)
  //                       wx.setStorageSync('sex', data.data.sex)
  //                       wx.setStorageSync('mobile', data.data.mobile)
  //                       wx.setStorageSync('realname', data.data.realname)
  //                     }
  //                   })
  //                   self.setData({
  //                     isShowLoginBox: false
  //                   })
  //                 } else {
  //                   return false
  //                 }
  //               }
  //             })
  //           }
  //         }
  //       })
  //     }
  //   });
  // },
  goWriter() {
    wx.navigateTo({
      url: '/pages/servicePersonal/Login/Login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.userLogin()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
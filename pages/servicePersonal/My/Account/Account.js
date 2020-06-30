// pages/servicePersonal/My/Account/Account.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usrinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.$request('/staff_login/me', 'POST', {
    }).then(res => {
      console.log(res);

      this.setData({
        usrinfo: res.data
      })

    })
  },


})
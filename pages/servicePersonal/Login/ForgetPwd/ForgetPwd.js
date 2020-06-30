// pages/servicePersonal/Login/Login.js
Page({
  data: {
    inputValue: null,
    showPwd: false,
    sendTime: '获取验证码',
    sendColor: '#363636',
    snsMsgWait: 60,
    from:{
      tel:null,
      
    }
  },

  clearInput: function (res) {
    this.setData({
      'inputValue': ''
    })
  },
  switch1Change(e) {
    this.setData({
      showPwd: e.detail.value
    })
  },
  ConsentAgreement() {

    this.setData({
      ConsentAgreement: !this.data.ConsentAgreement
    })
  },
  sendCode: function () {
    // 60秒后重新获取验证码
    console.log(this.data.snsMsgWait);

    var inter = setInterval(function () {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#363636',
          sendTime: '重新获取',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
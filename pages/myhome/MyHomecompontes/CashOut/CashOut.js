// pages/myhome/MyHomecompontes/Recharge/Recharge.js
const app = getApp()

Page({


  data: {
    balance: '',
    moneys: '',
    selectPay: false,
    arrMoney: ['500', '400', '300', '200', '100'],
    navIndex: 0
  },
  monerChange(e) {
    console.log(e.detail.value);
  },
  changeMoney(e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index,
      moneys: e.currentTarget.dataset.moneys
    })
  },
  selectPay() {
    this.setData({
      selectPay: !this.data.selectPay
    })
  },
  Tixian() {
    let moneyss = this.data.moneys
    app.$request('/personal/recharge', 'POST', {
      money: moneyss
    }).then(res => {
    console.log(res.msg.trade_no);
      app.$request('/buy/payment', 'POST', {
        trade_no: res.msg.trade_no,
        type: 3,
        method: 1,
        openid: wx.getStorageSync('openid'),
      }).then(res => {
        wx.requestPayment({
          timeStamp: res.data.sign.timeStamp,
          nonceStr: res.data.sign.nonceStr,
          package: res.data.sign.package,
          signType: res.data.sign.signType,
          paySign: res.data.sign.paySign,
          success(res) {
            console.log(res);
            // wx.navigateTo({
            //   url: 'pages/myhome/MyHomecompontes/MyOrder/MyOrder',
            // })
          },
          fail(res) {}
        })


      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      balance: options.moneys
    })

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
// pages/myhome/MyHomecompontes/Recharge/Recharge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: '',
    money: '',
    selectPay: false,
    arrMoney: ['500', '400', '300', '200', '100'],
    navIndex: 0
  },
  changeMoney(e) {
    console.log(e.currentTarget.dataset.money)
    this.setData({
      money: e.currentTarget.dataset.money,
      navIndex: e.currentTarget.dataset.index
    })
  },
  selectPay() {
    this.setData({
      selectPay: !this.data.selectPay
    })
  },
  moneych(e) {
    this.setData({
      money: e.detail.value
    })

  },
  Recharge() {
    console.log(1);
    let moneys = this.data.money
    app.$request('/personal/recharge', 'POST', {
      money: moneys
    }).then(res => {
      app.$request('/buy/payment', 'POST', {
        trade_no: res.msg.trade_no,
        type:2,
        method: 1,
        openid: wx.getStorageSync('openid'),
      }).then(res => {
        console.log(res.data.sign);


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
  onLoad: function (options) {
    this.setData({
      balance: options.moneys
    })

  }



  // app.$request('/buy/payment', 'POST', {
  //   trade_no: e.currentTarget.dataset.trade_no,
  //   type: 1,
  //   method: 1,
  //   openid: wx.getStorageSync('openid'),
  // }).then(res => {
  //   console.log(res.data.sign);


  //   // if (res.code == 1) {
  //   //   wx.showToast({
  //   //     title: res.msg,
  //   //     icon: 'success',
  //   //     duration: 2000
  //   //   })

  //   // }
  //   wx.requestPayment({
  //     timeStamp: res.data.sign.timeStamp,
  //     nonceStr: res.data.sign.nonceStr,
  //     package: res.data.sign.package,
  //     signType: res.data.sign.signType,
  //     paySign: res.data.sign.paySign,
  //     success (res) { 
  //       console.log(res);
  //     wx.navigateTo({
  //       url: 'pages/myhome/MyHomecompontes/MyOrder/MyOrder',
  //     })
  //     },
  //     fail (res) { }
  //   })


  // })
})
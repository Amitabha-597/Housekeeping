// pages/index/Navitem/DowCenter/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    SettleInfrom: {}
  },
  Pay() {
   
    console.log(this.data.SettleInfrom);
    let SettleInfrom = this.data.SettleInfrom

    SettleInfrom.other_photo = JSON.stringify(SettleInfrom.other_photo)
    app.$request('/shop/settle', 'POST', SettleInfrom).then(res => {
        console.log(res.data.trade_no)
        app.$request('/buy/payment', 'POST', {
          trade_no: res.data.trade_no,
          type: 4,
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

              wx.navigateTo({
                url: '/pages/index/Navitem/DowCenter/pay/Paysuccess/Paysuccess',
              })
              
            },
            fail(res) {}
          })


        })
      },
      err => {
        wx.showToast({
          title: err.msg,
          icon: 'none'
        })
      }
    )

  },
  onLoad: function (options) {
    this.setData({
      SettleInfrom: JSON.parse(options.shoplist)
    })

  },
})
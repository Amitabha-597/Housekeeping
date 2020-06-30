// pages/myhome/MyHomecompontes/MyOrder/OrderDetalis/OrderDetalis..js
const app = getApp()
const URlI = getApp().globalData.URl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URlI: URlI,
    showCancelOrder: false,
    date: '请选择时间',
    total: '',
    disabled: true,
    waitforpay: {},
    order_norea: '',
    Coupon: [],
    Reason: [{
        text: '我不需要了',
        value: '我不需要了'
      },
      {
        text: '信息填写错误,需要重新下单',
        value: '信息填写错误,需要重新下单'
      },
      {
        text: '商家未接单',
        value: '商家未接单'
      },
      {
        text: '其他原因',
        value: '其他原因'
      },
    ]

  },
  //支付
  PayNow(e) {
    app.$request('/buy/payment', 'POST', {
      trade_no: e.currentTarget.dataset.trade_no,
      type: 1,
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
          wx.navigateTo({
            url: '/pages/myhome/MyHomecompontes/MyOrder/MyOrder',
          })
        },
        fail(res) {}
      })


    })


  },
  //时间选择
  Selecttime: function (e) {
    // console.log(e.detail);
    this.setData({
      date: e.detail.dateString
    })
  },
  CancelOrder() {
    this.setData({
      showCancelOrder: !this.data.showCancelOrder
    })
  },

  //取消订单
  Reason(e) {

    app.$request('/order/cancel', 'POST', {
      order_no: this.data.order_norea,
      reason: e.currentTarget.detail
    }).then(res => {
      console.log(res.data);
      if (res.code == 1) {
        this.setData({
          showCancelOrder: false
        })
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack({})
        }, 1000);
       
      }
    })
  },
  onLoad: function (options) {
    let ordernos = Number(options.ordernos)
    this.setData({
      URlI: URlI,
      order_norea: ordernos
    })
    // let ordernos = Number(2020052049983482)

    app.$request('/order/orderInfo', 'POST', {
      order_no: ordernos
    }).then(res => {
      console.log(res);

      let money = Number(res.data.tips);
      let tips = Number(res.data.money);
      let totals = money + tips

      this.setData({
        total: totals,
        waitforpay: res.data
      })
    })

  },


})
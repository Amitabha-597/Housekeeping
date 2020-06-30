// pages/myhome/MyHomecompontes/MyOrder/OrderDetalis/OrderDetalis..js
const app = getApp()
const URL = getApp().globalData.URl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRefund: false,
    URL: '',
    evadata: {}
  },

  toApplyRefund(e) {
    
    let orderno =e.currentTarget.dataset.orderno
    wx.navigateTo({
      url: '/pages/myhome/MyHomecompontes/MyOrder/OrderDetalis/waitforevaluation/ApplyRefund/ApplyRefund?orderno='+orderno,
    })

  },
  onLoad: function (options) {
    this.setData({
      URL: URL
    })
    let ordernos = Number(options.ordernos)
    app.$request('/order/orderInfo', 'POST', {
      order_no: ordernos
    }).then(res => {
      console.log(res.data);
      this.setData({
        evadata: res.data
      })
    })
  }
})
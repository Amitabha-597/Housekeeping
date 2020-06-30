// pages/servicePersonal/orderdetails/orderdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order_no =options.ordernos
    app.$request('/staff_order/orderInfo', 'POST', {
      order_no:order_no
    }).then(res => {
      this.setData({
        orderinfo: res.data
      })

    })
  },

})
// pages/myhome/MyHomecompontes/MyOrder/OrderDetalis/OrderDetalis..js
const app = getApp()
const URlI = getApp().globalData.URl  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URlI:'',
    waitforservice: [],




  },

  Confirmorder(e){
    console.log(e.currentTarget.dataset.trade_no);
  
    app.$request('/order/confirm', 'POST', {
      order_no:e.currentTarget.dataset.order_no
     
    }).then(res=>{
      console.log(res);
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
       
      })
      
    },err=>{
      console.log(err);
      wx.showToast({
        title: err.msg,
        icon: 'none ',
        duration: 2000
      })
    }
    )
   

  },

  onLoad: function (options) {
    this.setData({
      URlI:URlI
    })
    let ordernos = Number(options.ordernos)
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
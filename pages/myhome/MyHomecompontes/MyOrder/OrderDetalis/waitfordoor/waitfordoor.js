// pages/myhome/MyHomecompontes/MyOrder/OrderDetalis/OrderDetalis..js
const app = getApp()
const URlI = getApp().globalData.URl  
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
    total:'',
    waitfordoor:{}
   



  },
  Txsm() {

    setTimeout(function () {
      wx.showToast({
        title: '提醒上门成功',
        icon: 'success',
        duration: 2000
      })
    }, 2000);
  },
  Alreadyhome(e){
    console.log(e.currentTarget.dataset.orderno);
    app.$request('/order/door', 'POST', {
      order_no:e.currentTarget.dataset.orderno
      
    }).then(res => {
      console.log(res.data);
      if(res.coed==1){
        wx.showToast({
          title: '已确认服务员上门',
          icon: 'success',
          duration: 2000
        })
      }
    }
    
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      URlI:URlI
    })
    let ordernos = Number(options.ordernos)
    // let ordernos = Number(2020052134272744)

    app.$request('/order/orderInfo', 'POST', {
      order_no:ordernos
    }).then(res => {
      console.log(res);
      let money = Number(res.data.tips);
      let tips = Number(res.data.money);
      let  totals = money+tips
      this.setData({
        total:totals,
        waitfordoor: res.data
      })
    })

  },
})
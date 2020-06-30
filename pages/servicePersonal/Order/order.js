// pages/servicePersonal/Order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    writeIndoorlust:[]
  },
  //员工已到达
  reachDoor(e){
    console.log(e.currentTarget.dataset.orderno);
  let   orderid= e.currentTarget.dataset.orderno
    app.$request('/staff_order/arrive', 'POST', {
      order_no:orderid
    }).then(res => {
      if(res.code==1){
        wx.showToast({
          title: '已开始服务',
          icon: 'none',
          duration: 2000
        })
      }
      
    })
    
  },
  //开始服务
  startService(e){
    console.log(e.currentTarget.dataset.orderno);
   let orderid= e.currentTarget.dataset.orderno
    app.$request('/staff_order/start', 'POST', {
      order_no:orderid
    }).then(res => {
      console.log(res);
    if(res.code==1){
      wx.showToast({
        title: '已开始服务',
        icon: 'none',
        duration: 2000
      })
    }
      
    })
    
  },
  //结束服务
  serviceCompletent(e){
    console.log(e.currentTarget.dataset.orderno);
    let orderid= e.currentTarget.dataset.orderno
    app.$request('/staff_order/end', 'POST', {
      order_no:orderid
    }).then(res => {
      if(res.code==1){
        wx.showToast({
          title: '已结束服务',
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  },
  //提醒评价
  remindEva(){
    wx.showToast({
      title: '提醒评价成功',
      icon: 'none',
      duration: 2000
    })
  },
  //查看订单
  seeOrder(e){
  let   orderid= e.currentTarget.dataset.orderno
  wx.navigateTo({
    url: '../orderdetails/orderdetails?ordernos='+orderid,
  })
    
  },
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.selectindex);
    this.setData({
      currentIndex:options.selectindex
    })
    
    app.$request('/order/orderList', 'POST', {
      page:1,
      pz:999,
      status:1
    }).then(res => {
     this.setData({
      writeIndoorlust:res.data.list
     })
    })
  },

  
})
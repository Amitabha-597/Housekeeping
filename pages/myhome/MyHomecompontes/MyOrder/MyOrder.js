// pages/myhome/MyHomecompontes/MyOrder/MyOrder.js
const URlI = getApp().globalData.URl
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
   
    orderlistA: [], //待付款
    orderlistb: [], //待上门
    orderlistc: [], //待服务
    orderlistd: [], //待评价



  },
  Daigaijia(){

    wx.showToast({
      title:'此订单无详情',
      icon: 'none',
      duration: 2000
    })
  },
  startSeerview(e) {
    app.$request('/staff_order/start', 'POST', {
      order_no: e.currentTarget.dataset.order_no
    }).then(res => {
      console.log(res);

    
    })
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
  toOrderDetalis(e) {
    let OrderType = e.currentTarget.dataset.ordertypes
    let ordernos = e.currentTarget.dataset.ordernos
    console.log(ordernos);

    wx.navigateTo({
      url: './OrderDetalis/' + OrderType + '?ordernos=  ' + ordernos
    })
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 5
      this.setData({
        currentIndex: currentPageIndex
      })
      this.getList()
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
    this.getList()
  },
  txshngm() {
    wx.showToast({
      title: '提醒上门成功！',
      icon: 'success',
      duration: 2000
    })
    this.getList()
  },

  getList() {
    //我的订单
    //全部
    app.$request('/order/orderList', 'POST', {
      page: 1,
      pz: 999,
      status: 0
    }).then(res => {
      // console.log(res.data);

      this.setData({
        orderlist: res.data.list
      })
    })
    //待付款
    app.$request('/order/orderList', 'POST', {
      page: 1,
      pz: 999,
      status: 1
    }).then(res => {
      console.log(res);

      this.setData({
        orderlistA: res.data.list
      })
    })
    //待上门
    app.$request('/order/orderList', 'POST', {
      page: 1,
      pz: 999,
      status: 2
    }).then(res => {
      console.log(res.data.list);

      this.setData({
        orderlistb: res.data.list
      })
    })

    // 待服务
    app.$request('/order/orderList', 'POST', {
      page: 1,
      pz: 999,
      status: 3
    }).then(res => {
      console.log(res.data.list);
      this.setData({
        orderlistc: res.data.list
      })
    })

    //待评价
    app.$request('/order/orderList', 'POST', {
      page: 1,
      pz: 999,
      status: 2
    }).then(res => {
      console.log(res.data.list);
      this.setData({
        orderlisteva: res.data.list
      })
    })
  },




  //生命周期
  onLoad: function (options) {
    let selectIndex = options.ordertype
    if (selectIndex !== undefined) {
      this.setData({
        currentIndex: selectIndex
      })
    }
    this.getList()

  },
  onShow: function () {
    this.getList()
  },
  //下拉刷新
  onPullDownRefresh: function () {
    //wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getList()
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }

})
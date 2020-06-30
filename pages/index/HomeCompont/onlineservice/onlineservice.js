const app = getApp()
// pages/index/HomeCompont/onlineservice/onlineservice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //聊天用户信息
    item_id: '',

    userevaluation: {},
    currentIndex: 0,
    selcontent: {},
    richText: [], //富文本
    userevaluation: [],

    item_ids: ''
  },
  todea() {
    // let type_id =  this.data.type_id

    wx.navigateTo({
      url: "/pages/index/HomeCompont/ConfirmOrder/index?item_id=" + this.data.item_ids
    })
  },

  //swiper切换时会调用
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


    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })









    this.setData({
      item_ids: options.item_id,
    })



    if (options.type_id == undefined) {
      this.setData({
        item_id: options.item_id
      })
    } else {
      this.setData({
        item_id: options.type_id
      })
    }

    //服务详情、项目详情
    app.$request('/shop/itemInfo', 'POST', {
      item_id: this.data.item_id
    }).then(res => {
      // console.log(res);

      this.setData({
        selcontent: res.data
      })
    })
    //项目富文本详情
    app.$request('/shop/itemText', 'POST', {
      item_id: this.data.item_id
    }).then(res => {
      this.setData({
        richText: res.data.content
      })
    })
    //店铺评价列表
    app.$request('/shop/evaluate', 'POST', {
      shop_id: this.data.item_id,
      status: '',
      page: 1,
      type_id: '',
      pz: 999
    }).then(res => {
      // console.log(res);

      this.setData({
        userevaluation: res.data.list
      })
    })
  },


})
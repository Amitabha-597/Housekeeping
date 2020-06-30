// pages/index/Navitem/Train/Train.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    onlinelist: '',
    offlinList: []

  },
  toVideo(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/Navitem/Train/Trainvideo/Trainvideo?id=' + id,
    })
  },
  toOfflineTrain(e) {
    var id = e.currentTarget.dataset.id
    console.log(id);

    wx.navigateTo({
      url: '/pages/index/Navitem/Train/OfflineTrain/OfflineTrain?id=' + id,

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
    app.$request('/train/onlineIndex', 'POST', {
      page: 1,
      pz: 99999,

    }).then(res => {
      console.log(res);
      this.setData({
        
        onlinelist: res.data.list
      })
    })
    //线下培训列表
    app.$request('/train/offlineIndex', 'POST', {
      page: 1,
      pz: 10,

    }).then(res => {
      console.log(res.data.list)
      this.setData({
        offlinList: res.data.list
      })
    })

  },


})
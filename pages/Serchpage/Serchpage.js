const app = getApp()
const URl = getApp().globalData.URl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    URl: '', //地址
    serchValue: '',
    serchData: [], //历史记录列表
    shoplist: [], //店铺列表
    waiterlist: [], //员工列表
    itemlist:[]

  },
  //清除历史记录
  cleanHistory() {
    wx.removeStorageSync('SerchHistory')
    this.setData({
      serchData: []
    })
  },
  //搜索
  Serch(e) {
    if (e.detail.value != '') {
      this.setData({
        userInfo: wx.getStorageSync("userInfo")
      })

      app.$request('/index/search', 'POST', {
        name: e.detail.value
      }).then(res => {
        console.log(res.data);

        this.setData({
          shoplist: res.data.shop,
          waiterlist: res.data.staff,
          itemlist: res.data.item,

        })
      })
      //历史记录-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      let Historylist = this.data.serchData
      Historylist.push(e.detail.value)
      let Historylists = [...new Set(Historylist)] //数组去重
      this.setData({
        serchData: Historylists
      })
      wx.setStorageSync('SerchHistory', Historylists)
      //历史记录-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

    }
  },
  //清除内容
  cleanValue() {
    this.setData({
      serchValue: ''
    })

  },
  onCancel() {
    wx.navigateBack({})
  },
  //搜索历史 再搜索
  HistorySerch(e) {
    this.setData({
      serchValue: e.currentTarget.dataset.historydata
    })
  },
  //店铺详情
  toservicedetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/servicedetails/servicedetails?id=' + id,
    })

  },
  //员工详情
  toWaiterdetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/waiterdetails/waiterdetails?id=' + id,
    })
   
    
  },
   //预约项目
  toonLineservice(e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/onlineservice/onlineservice?item_id=' + id,
    })
  },







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(URl);
    this.setData({
      URl: URl
    })

    let SerchHistory = wx.getStorageSync('SerchHistory')
    if (SerchHistory != '') {
      this.setData({
        serchData: SerchHistory
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
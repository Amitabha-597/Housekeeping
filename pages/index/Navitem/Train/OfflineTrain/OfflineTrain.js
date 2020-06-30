// pages/index/Navitem/Train/OfflineTrain/OfflineTrain.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Offlist:{}


  },
  signup(e) {
    console.log(e.currentTarget.dataset.i);
    console.log(e);
    
    app.$request('/train/addIn', 'POST', {
      id:e.currentTarget.dataset.id
    }).then(res => {
      wx.showToast({
        title: '报名成功',
        icon: 'success',
        duration: 2000
      })
    
    },err=>{
      wx.showToast({
        title: err.msg,
        icon: 'none',
        duration: 2000
      })
    }
    )
  },

 







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let id=options.id
    app.$request('/train/offlineInfo', 'POST', {
      id:id
    }).then(res => {
      console.log(res.data)
      this.setData({
        Offlist:res.data
      })
    })

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
// pages/index/Navitem/Apply/Applycomp/AddExp/AddExp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conentLength: 0,
    workexpfrom: {
      startime: '',
      endtime: '',
      content: ''
    }

  },
  Startime(e) {
    // console.log(e.detail.value);
    let startime = 'workexpfrom.startime'
    this.setData({
      [startime]: e.detail.value
    })
  },
  Endtime(e) {
    let endtime = 'workexpfrom.endtime'
    // console.log(e.detail.value);
    this.setData({
      [endtime]: e.detail.value
    })
  },
  Maxlength(e) {
    let conten = 'workexpfrom.content'
    this.setData({
      [conten]: e.detail.value,
      conentLength: e.detail.value.length
    })



  },
  ServiceTypeSave() {
    // console.log(this.data.workexpfrom);
    let workExp = this.data.workexpfrom
    for (let i in workExp) {
      if (workExp[i] == '') {
        wx.showToast({
          title: '请填写全部内容',
          icon: 'none',
          duration: 2000
        })
      }
    }console.log(workExp);
    
    let workExps=JSON.stringify(workExp)
    var pages = getCurrentPages();

    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

    prevPage.setData({

      'applyFrom.job_data': `[${workExps}]`

    })
    wx.navigateBack({
      data:workExps
    })
  },
  ServiceTypeCancel() {
    wx.navigateTo({
      url: '../../Apply',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
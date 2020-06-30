// pages/index/Navitem/DowCenter/ServiceType/ServiceType.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SelectionList: [{
        itemName: '清洁清洗1'
      },


    ],
    CandidateList: [
    ]

  },
  delItem(e) {
    let key = Number(e.currentTarget.dataset.item)
    let SelectionList = this.data.SelectionList
    SelectionList.splice(key, 1)
    this.setData({
      SelectionList: SelectionList
    })
  },

  Repeat(arr) {
    //Set数据结构，它类似于数组，其成员的值都是唯一的
    return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
    console.log(1);
  },
  pushForSelection(e) {
    let item = e.currentTarget.dataset.item
    let SelectionLists = this.data.SelectionList
    SelectionLists.push(item)


    this.setData({
      SelectionList: SelectionLists
    })


  },
  ServiceTypeSave() {
    wx.navigateTo({
      url: '../DowCenter',
    })
  },
  ServiceTypeCancel() {
    wx.navigateTo({
      url: '../DowCenter',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.$request('/index/serviceType', 'POST', {}).then(res => {
      console.log(res);

      this.setData({
        CandidateList: res.data
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
// pages/index/Navitem/News/NewsDetail/NewsDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsde: {},
    contentInfo:{},
    timer:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.$request('/news/info', 'POST', {
      id: options.id
    }).then(res => {
      this.setData({
        timer:Number(res.data.add_time),
        newsde: res.data,
        contentInfo: res.data.content.replace('<img ', '<img style="max-width:100%;height:auto;display:block;margin:20rpx 20rpx;"') 
      })
    })
  },
})
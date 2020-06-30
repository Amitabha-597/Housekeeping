// pages/activity/Actcomponent/groupdetails/groupdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupdetails: {},
    collageUser: {}
  },
  collageSub(e) {
    console.log(e.currentTarget.dataset.id);
    app.$request('/activity/collageSub', 'POST', {
      id:e.currentTarget.dataset.id
    }).then(res => {
      console.log(res.data);
     
    },
    err=>{
      console.log(err.msg);
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
    app.$request('/activity/collageInfo', 'POST', {
        id: options.id
      }).then(res => {
        // console.log(res.data);
        this.setData({
          groupdetails: res.data
        })
      }),
      app.$request('/activity/collageUser', 'POST', {
        id: options.id
      }).then(res => {
        // console.log(res.data);
        this.setData({
          collageUser: res.data
        })
      })
  },
})
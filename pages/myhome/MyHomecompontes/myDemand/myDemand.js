// pages/myhome/MyHomecompontes/myDemand/myDemand.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collagelist:[]
  },
  toDemandDetails() {

    wx.navigateTo({
      url: '../DemandDetails/DemandDetails',
    })

  },
  toDemandInfo(e){
console.log(e.currentTarget.dataset.id);
wx.navigateTo({
  url: '../DemandDetails/DemandDetails?id='+e.currentTarget.dataset.id,
})

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.$request('/demand/index', 'POST', {
      page:1,
      pz:999,
      status:null
    }).then(res => {
      console.log(res);
     this.setData({
      collagelist:res.data.list
     })
    })
  },

 
})
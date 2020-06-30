// pages/activity/Actcomponent/groupdetails/groupdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packageInfo: {},
    packagefrom: {
    
    }



  },
  collageSub(e) {
    console.log(e.currentTarget.dataset.id);
   wx.navigateTo({
     url: '/pages/activity/Actcomponent/Packagedetails/ConfirmOrder/index?itemid='+e.currentTarget.dataset.id,
   })
  },



  onLoad: function (options) {
    console.log(options);


    app.$request('/activity/packageInfo', 'POST', {
      id: options.id
    }).then(res => {
      console.log(res.data);
      this.setData({
        packageInfo: res.data
      })
    })
  },

})
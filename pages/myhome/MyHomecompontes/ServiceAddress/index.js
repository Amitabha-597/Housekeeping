// pages/myhome/MyHomeComs/ServiceAddress/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Select: '',
    adresslist: []
  },
  changeAdress(e) {
    console.log(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/myhome/MyHomecompontes/ChangeAddress/ChangeAddress?addres=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  DeltAddress(e) {
    console.log(e);
    
    let adressID = e.currentTarget.dataset.id
    app.$request('/personal/delAddress', 'POST', {
      id: adressID
    }).then(res => {
      if (res.code == 1) {
        app.$request('/personal/address', 'POST', {
          page: 1,
          pz: 999
        }).then(res => {
          this.setData({
            adresslist: res.data.list
          })
        })
      }
    })
  },
  defualAdress(e) {

    let adressID = e.currentTarget.dataset.id
    app.$request('/personal/defaultAddress', 'POST', {
      id: adressID
    }).then(res => {
      if (res.code == 1) {
        app.$request('/personal/address', 'POST', {
          page: 1,
          pz: 999
        }).then(res => {
          this.setData({
            adresslist: res.data.list
          })
        })
      }
    })
  },
  selectaddress(e) {
    if (this.data.Select == "true") {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; // 当前页面
      var prevPage = pages[pages.length - 2]; // 上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      //不需要页面更新
      console.log();

      prevPage.setData({
        address_id: e.currentTarget.dataset.id
      })
      wx.navigateBack({
        // address_id:
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(options);
    this.setData({
      Select: options.Select
    })

    app.$request('/personal/address', 'POST', {
      page: 1,
      pz: 999
    }).then(res => {
      this.setData({
        adresslist: res.data.list
      })
    })
  },
  onShow: function () {
    app.$request('/personal/address', 'POST', {
      page: 1,
      pz: 999
    }).then(res => {
      this.setData({
        adresslist: res.data.list
      })
    })
  },
})
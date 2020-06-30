const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    bottomShow: true,
    latitudes: null, //纬度
    longitudes: null, //经度
    selectsevertypes: null,
    severtypeselect: null, //服务类型选择
    shopSelect: null,
    select: 1,
    shoplist: [],
    typeshow: false,
    serviceType: []
  },
  //店铺大类型
  selectType(e) {
    let selectindex = e.currentTarget.dataset.index
    this.setData({
      select: selectindex
    })
    if (selectindex == 5) {
      this.setData({
        typeshow: !this.data.typeshow,
        selectsevertypes: 5,
        bottomShow: false
      })
      return
    }
    if (selectindex == 2) {
      let that = this
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const latitude = res.latitude //纬度，范围为 -90~90，负数表示南纬
          const longitude = res.longitude //经度，范围为 -180~180，负数表示西经
          app.$request('/index/goldShop', 'POST', {
            pz: 999,
            page: 1,
            order: selectindex,
            lat: latitude,
            long: longitude
          }).then(res => {
            that.setData({
              shoplist: res.data.list
            })
          })

        }
      })
      return
    }
    app.$request('/index/goldShop', 'POST', {
      pz: 999,
      page: 1,
      order: selectindex,
      lat: 30.79589,
      long: 103.90256
    }).then(res => {

      this.setData({
        shoplist: res.data.list
      })
    })
  },
  // 服务类型筛选
  severType(e) {
    this.setData({
      shopSelect: null,
      severtypeselect: e.currentTarget.dataset.index
    })


    app.$request('/index/goldShop', 'POST', {
      pz: 999,
      page: 1,
      shop_type: 1,
      order: this.data.selectsevertypes,
      type_id: e.currentTarget.dataset.severid
    }).then(res => {
      this.setData({
        shoplist: res.data.list
      })
    })
  },
  //金牌店铺筛选
  shopType(e) {
    let shopTypeid = e.currentTarget.dataset.shoptype
    this.setData({
      shopSelect: shopTypeid
    })
    app.$request('/index/goldShop', 'POST', {
      pz: 999,
      page: 1,
      shop_type: shopTypeid
    }).then(res => {
      this.setData({
        shoplist: res.data.list
      })
    })
  },



  seeShop() {
    this.setData({
      typeshow: !this.data.typeshow,
      bottomShow: true
    })

  },

  // 店铺详情
  toservicedetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/servicedetails/servicedetails?id=' + id,
    })

  },


  onLoad: function (options) {
    console.log(options.typeid);
    let typeid = options.typeid
    if (typeid) {
      // 首页金牌店铺列表
      app.$request('/index/goldShop', 'POST', {
        pz: 999,
        page: 1,
        order: 5,
        type_id: typeid
      }).then(res => {
        this.setData({
          shoplist: res.data.list
        })
      })

    }else{
       // 首页金牌店铺列表
    app.$request('/index/goldShop', 'POST', {
      pz: 999,
      page: 1,
    }).then(res => {
     

      this.setData({
        shoplist: res.data.list
      })
    })

    app.$request('/index/serviceType', 'POST', {}).then(res => {
      this.setData({
        serviceType: res.data
      })
    })
    }

   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {}
})
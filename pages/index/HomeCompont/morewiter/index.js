// pages/index/HomeCompont/Goldwiter/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectsevertyes:1,
    latitudes: null, //纬度
    longitudes: null, //经度
    showsevertype: false,
    severtypebth:null,//服务类型按钮
    selecttypes: 1, //大类型筛选
    severtype: null, //服务类型筛选


    
    waiterlist: [],
    typebtn: [],

  },
  toWaiterdetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/waiterdetails/waiterdetails?id=' + id,
    })

  },
  showfwtype(e) {
    // console.log(e.currentTarget.dataset.selecttype);
    let selecttype = e.currentTarget.dataset.selecttype
    this.setData({
      selecttypes: selecttype
    })
  if(selecttype == 2){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        
        const latitude = res.latitude //纬度，范围为 -90~90，负数表示南纬
        const longitude = res.longitude //经度，范围为 -180~180，负数表示西经
        this.setData({
          latitudes: latitude,
          longitudes: longitude
        })
      }
    })
  }
    if (selecttype == 5) {
      this.setData({
        severtypebth:selecttype,
        showsevertype: !this.data.showsevertype
      })
      return
    }

    app.$request('/index/goldStaff', 'POST', {
      pz: 999,
      page: 1,
      order: selecttype,
      long: this.data.longitudes,
      lat: this.data.latitudes,
    }).then(res => {
      this.setData({
        waiterlist: res.data
      })
    })
  },
  //服务类型筛选
  selectsevertype(e) {
    console.log(e.currentTarget.dataset.severtype);
    this.setData({
      selectsevertyes:e.currentTarget.dataset.severtype
    })
    app.$request('/index/goldStaff', 'POST', {
      pz: 999,
      page: 1,
      order: this.data.severtypebth,
      type_id: e.currentTarget.dataset.severtype
    }).then(res => {
      this.setData({
        waiterlist: res.data.list
      })
    })
  },
  //隐藏服务类型
  heidsevertype() {
    this.setData({
      showsevertype: !this.data.showsevertype
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.$request('/index/goldStaff', 'POST', {
      pz: 999,
      page: 1
    }).then(res => {
      this.setData({
        waiterlist: res.data.list
      })
    })
    app.$request('/index/serviceType', 'POST', {}).then(res => {
      this.setData({
        typebtn: res.data
      })
    })

  },

})
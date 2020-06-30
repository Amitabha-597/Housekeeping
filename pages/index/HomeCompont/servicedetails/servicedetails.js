// pages/index/HomeCompont/servicedetails/servicedetails.js
const app = getApp()
import {
  hexMD5
  } from "../../../../utils/md5"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopids: "",
    total: "",
    desc:'',
    currentIndex: 0,
    shopInfo: {},
    shopSwiper: [],
    shopSwipers: [],
    waiterlist: [],
    serviceItems: [],
    userevaluation: []
  },
  toWaiterDetails(e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/waiterdetails/waiterdetails?id=' + id,
    })
  },
  toonLineservice(e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/onlineservice/onlineservice?item_id=' + id,
    })
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // console.log(options.id); 
    this.setData({
      shopids:options.id
    })
    var shop_id = options.id
    //页面数据
    let query = 'app_id=aminmbfnhcrfnoesheoi&app_key=fpfqFCldavpHcEwkGGgwypIheGGnirxp&random=123456'

    let sign = hexMD5(query).toUpperCase()
    wx.request({
      url: 'https://wuhua.mrhkj.com/wuhuaapi/shop/info',
      method:'POST',
      header:{
      'sign': sign,
      'random': '123456',
      'openid': wx.getStorageSync('openid'),
      'token': wx.getStorageSync('token')
      },
      data:{
        shop_id: shop_id
      },
      success:success
    })
    function success(res){
      that.setData({
        shopInfo: res.data.data,
        desc:res.data.data.desc
      })
    }
    // let a = await success()
   
    // app.$request('/shop/info', 'POST', {
    //   shop_id: shop_id
    // }).then(res => {
    //   console.log(res.data.desc);
    //   this.data.shopInfo.desc = res.data.desc
    //   this.setData({
    //     shopInfo: res.data,
    //     desc:res.data.desc
    //   })
    // })
    //店铺轮播图
    app.$request('/shop/banner', 'POST', {
      shop_id: shop_id
    }).then(res => {
    console.log(res);
      this.setData({
        shopSwiper: res.data.list
      })
    })
    //店铺员工
    app.$request('/shop/user', 'POST', {
      shop_id: shop_id,
      page: 1,
      pz: 9999
    }).then(res => {
    
      
      this.setData({
        waiterlist: res.data.list
      })
    })
    //服务项目

    app.$request('/shop/item', 'POST', {
      shop_id: shop_id,
      page: 1,
      pz: 999
    }).then(res => {
      console.log(res.data.list);
      this.setData({
        serviceItems: res.data.list
      })
    })
    //店铺评价列表
    app.$request('/shop/evaluate', 'POST', {
      shop_id: shop_id,
      status: '',
      page: 1,
      type_id: '',
      pz: 999
    }).then(res => {
      // console.log(res);
      
      this.setData({
        userevaluation: res.data.list,
        total: res.data.total
      })
    })
  },



})
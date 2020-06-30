const app = getApp()
Page({

  data: {
    userInfo: {},
    region: ['广东省', '广州市', '梅州'],
    swiperimg: [], //轮播
    // tablistLess: [
    //   {
    //     img: 'more',
    //     name: "更多",
    //     tabEvent: 'showMore'
    //   },

    // ],
    shortlist: false,
  
    shortlist: [],
    tablist: [{
        img: 'tabicon05',
        name: "就业申请",
        url: '/pages/index/Navitem/Apply/Apply'
      },
      {
        img: 'tabicon06',
        name: "就业培训",
        url: '/pages/index/Navitem/Train/Train'
      },
      {
        img: 'tabicon07',
        name: "优惠活动",
        url: '/pages/activity/activity'
      },
      {
        img: 'tabicon12',
        name: "商家入驻",
        url: '/pages/index/Navitem/DowCenter/DowCenter'
      }
    ],
    


    sefvertype: [],


    sefvertypelist: [],
    shoplist: [],
    waiterlist: []
  },
  //搜索页跳转
  toSerchPage(){
wx.navigateTo({
  url: '/pages/Serchpage/Serchpage',
})
  },
  toWaiterdetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/waiterdetails/waiterdetails?id=' + id,
    })

  },


  ToShop(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "/pages/shop/shop?typeid="+e.currentTarget.dataset.id,
    })
  },








  Call() {
    wx.makePhoneCall({
      phoneNumber: '13119695852' //仅为示例，并非真实的电话号码
    })
  },
  toservicedetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/HomeCompont/servicedetails/servicedetails?id=' + id,
    })

  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  Shouqi() {

   this.setData({
    shortlist:!this.data.shortlist
    })

console.log(this.data.shortlist);
if(this.data.shortlist){
  this.setData({
    sefvertype:this.data.sefvertypelist
  })
}else{
  this.setData({
    sefvertype:this.data.sefvertypelist.slice(0, 3)
  })
}


   



  },


  NavEvent(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  onLoad() {










    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
    //首页banner图
    app.$request('/index/banner', 'POST', {
      pz: 999
    }).then(res => {
      this.setData({
        swiperimg: res.data.list
      })
    })
    // 首页金牌店铺列表
    app.$request('/index/goldShop', 'POST', {
      pz: 999,
      page: 1,
      shop_type: 2
    }).then(res => {
      this.setData({
        shoplist: res.data.list
      })
    })

    //服务类型列表
    app.$request('/index/serviceType', 'POST', {}).then(res => {
      let severlist = res.data
      let severlistb = severlist.slice(0, 3)
      this.setData({
        sefvertype:severlistb ,
        sefvertypelist: severlist
      })
    })
    // 首页金牌员工列表
    app.$request('/index/goldStaff', 'POST', {
      pz: 5,
      page: 1
    }).then(res => {
      this.setData({
        waiterlist: res.data.list
      })
    })

  },

})
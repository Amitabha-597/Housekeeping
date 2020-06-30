const app = getApp();
Component({
  properties: {
    selected: {
      type: String,//类型
      value: ''//默认值
    }
  },
  data: {
    color: "#666666",
    selectedColor: "#222222",
    list: [{
        pagePath: "/pages/index/index",
        iconPath: "/assets/image/tabbar/home.png",
        selectedIconPath: "/assets/image/tabbar/homecheck.png",
        text: "首页",
        isSpecial: false
      }, {
        pagePath: "/pages/shop/shop",
        iconPath: "/assets/image/tabbar/shop.png",
        selectedIconPath: "/assets/image/tabbar/shopcheac.png",
        text: "店铺",
        isSpecial: false
      }, {
        pagePath: "/pages/add/add",
        iconPath: "/assets/image/tabbar/add.png",
        selectedIconPath: "/assets/imgs/tabbar/add.png",
        text: "",
        isSpecial: true
      },
      {
        pagePath: "/pages/activity/activity",
        iconPath: "/assets/image/tabbar/activity.png",
        selectedIconPath: "/assets/image/tabbar/activitycc.png",
        text: "活动",
        isSpecial: false
      },
      {
        pagePath: "/pages/myhome/myhome",
        iconPath: "/assets/image/tabbar/myhome.png",
        selectedIconPath: "/assets/image/tabbar/myhomecheck.png",
        text: "我的",
        isSpecial: false
      }
    ],
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX,
    h: false
  },
  methods: {
    switchTab(e) {
      console.log(e)
      const dataset = e.currentTarget.dataset
      const path = dataset.path
      const index = dataset.index
      // console.log(dataset.path, getCurrentPages()[getCurrentPages().length - 1].route)
      if (dataset.path == `/${getCurrentPages()[getCurrentPages().length - 1].route}`){

      }else{
        //如果是特殊跳转界面
        if (this.data.list[index].isSpecial) {
          wx.navigateTo({
            url: path
          })
        } else {
          //正常的tabbar切换界面
          wx.redirectTo({
            url: path
          })
        }
      }
    }
  },

})
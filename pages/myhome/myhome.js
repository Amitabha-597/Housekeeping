const URlI = getApp().globalData.URl
const app = getApp()
Page({
  data: {
    isShowLoginBox: false, //获取用户信息
    userinfo: {},
    URlI: '',
    tabCard: [{
      icon: 'payment',
      msg: '待付款',
      orderType: 1

    }, {
      icon: 'daishangm',
      msg: '待上门',
      orderType: 2

    }, {
      icon: 'sever',
      msg: '待服务',
      orderType: 3

    }, {
      icon: 'evaluate',
      msg: '待评价',
      orderType: 4

    }],
    navList: [{
        icon: 'balance',
        name: '余额',
        url: '/pages/myhome/MyHomecompontes/Balance/Balance'
      },
      {
        icon: 'xuqiu',
        name: '我的需求',
        url: '/pages/myhome/MyHomecompontes/myDemand/myDemand'
      },
      {
        icon: 'pingtuan',
        name: '我的拼团',
        url: '/pages/myhome/MyHomecompontes/MyCollage/MyCollage'
      },
      {
        icon: 'youhui',
        name: '我的优惠券',
        url: '/pages/myhome/MyHomecompontes/MyCoupon/MyCoupon'
      },
      {
        icon: 'shop',
        name: '商家入驻',
        url: '/pages/index/Navitem/DowCenter/DowCenter'
      },
      {
        icon: 'adress',
        name: '服务地址',
        url: '/pages/myhome/MyHomecompontes/ServiceAddress/index'
      },
      {
        icon: 'kefu',
        name: '联系我们',
        url: '/pages/myhome/MyHomecompontes/ContactUs/ContactUs'
      },


    ]
  },
  toMyOrder(e) {
    let ordertype = e.currentTarget.dataset.ordertype
    wx.navigateTo({
      url: './MyHomecompontes/MyOrder/MyOrder?ordertype=' + ordertype + ' ',
    })
  },
  goMyInfo() {
    wx.navigateTo({
      url: '/pages/myhome/MyHomecompontes/MyInfo/MyInfo',
    })
  },




  onLoad: function () {
    this.userLogin()
    this.setData({
      URlI: URlI
    })
    // app.$request('/login/me', 'POST', {

    // }).then(res => {
    //   console.log(res);
    //  this.setData({
    //   userinfo:res.data
    //  })
    // })



    //  console.log( wx.getStorageSync("userInfo"));
    let userinfos = wx.getStorageSync("userInfo")



    this.setData({

      userinfo: userinfos

    })


  },



  userLogin: function () {
    var self = this;

    wx.login({
      success(res) {
        // console.log('小程序登录：', res);
        let code = res.code;

        wx.setStorageSync('code', code)

        wx.getSetting({
          success(res) {
            // console.log('获取用户当前设置：', res);
            let scopeUserInfo = res.authSetting["scope.userInfo"];
            if (scopeUserInfo) {
              // 已经授权则隐藏授权登录框
              self.setData({
                isShowLoginBox: false
              });

              wx.getUserInfo({
                success(res) {
                  // console.log('获取用户信息：', res);
                  let ivs = res.iv
                  let encryptedDatas = res.encryptedData
                  let userInfo = res.userInfo;
                  let rawData = res.rawData;
                  wx.setStorageSync('userInfo', userInfo);

                  if (userInfo) {
                    app.$request('/login/login', 'POST', {
                      code: wx.getStorageSync('code'),
                      iv: ivs,
                      encryptedData: encryptedDatas
                    }).then(function (result) {
                      let data = result;
                      // console.log(result);

                      if (data.code === 1) {
                        wx.setStorageSync('token', data.data.token)
                        wx.setStorageSync('session_key', data.data.session_key)
                        wx.setStorageSync('openid', data.data.openId)
                        wx.setStorageSync('points', data.data.points)
                        wx.setStorageSync('sex', data.data.sex)
                        wx.setStorageSync('mobile', data.data.mobile)
                        wx.setStorageSync('realname', data.data.realname)
                      }
                    })
                    self.setData({
                      isShowLoginBox: false
                    })
                  } else {
                    return false
                  }
                }
              })
            } else {
              self.setData({
                isShowLoginBox: true
              })
            }
          }
        })
      }
    });
  },
  onShow: function () {

  }
})
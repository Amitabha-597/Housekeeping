const app = getApp()

Page({

  data: {

    item_idAAL: '',
    xiaofei: 0,
    discount: 0, //优惠券
    price: 0,
    showPayMode: false,
    address: {},
    address_id: null,
    packageSubfrom: {
      item_id: '',
      address_id: '',
      tips: '0',
      subscribe_time: '',
      method: 1,
      remark: '',
    },
    PayMode: [{
        text: '微信支付',
        value: '1'
      },
      {
        text: '余额支付',
        value: '2'
      },
    ],

  },
  onPickerChange: function (e) {
    console.log(e.detail);
    let subscribe_time = 'packageSubfrom.subscribe_time'
    this.setData({
      date: e.detail.dateString,
      [subscribe_time]: e.detail.dateString
    })
  },
  //提交订单


  submitorder() {
    this.data.packageSubfrom.address_id = this.data.address_id
    app.$request('/activity/packageSub', 'POST', this.data.packageSubfrom)
      .then(res => {
          console.log(res);
          if (res.code == 1) {
            
          
 
            app.$request('/buy/payment', 'POST', {
              trade_no:res.data.trade_no,
              type: 1,
              method: this.data.packageSubfrom.method,
              openid: wx.getStorageSync('openid'),
            }).then(res => {
              console.log(res.data.sign);
        
        
              wx.requestPayment({
                timeStamp: res.data.sign.timeStamp,
                nonceStr: res.data.sign.nonceStr,
                package: res.data.sign.package,
                signType: res.data.sign.signType,
                paySign: res.data.sign.paySign,
                success(res) {
                  console.log(res);
                  wx.navigateTo({
                    url: '/pages/myhome/MyHomecompontes/MyOrder/MyOrder',
                  })
                },
                fail(res) {}
              })
        
        
            })

          }else{
            wx.showToast({
              title: res.msg,
            })
          }














        },
        error => {
          console.log(error);
          wx.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000
          })
        }
      )
  },


  showPayMode(e) {
    this.setData({
      showPayMode: true
    })

  },
  selectPaymode(e) {
    console.log(e);
    let method = 'packageSubfrom.method'
    this.setData({
      [method]:e.detail.value,
      showPayMode: false
    })

  },






  //xaiofei
  xaiofei(e) {
    console.log(e.detail.value);
    let tips = 'packageSubfrom.tips'
    this.setData({
      [tips]: e.detail.value
    })
  },
  remarkContent(e){
    let remark = 'packageSubfrom.tips'
    this.setData({
      [remark]: e.detail.value
    })
  },

  toaddlist() {
    wx.navigateTo({
      url: '/pages/myhome/MyHomecompontes/ServiceAddress/index',
    })
  },
  getaddress() {
    app.$request('/personal/address', 'POST', {
      page: 1,
      pz: 999
    }).then(res => {
      console.log(res);
      if (this.data.address_id) {
        console.log('0000000000000000000')

        res.data.list.map(item => {
          if (item.id == this.data.address_id) {
            
            this.setData({
              address: item
            })
          }
        })
      } else {
        console.log('1111111111111111111')
        res.data.list.map(item => {
          if (item.is_default == '1') {
            this.setData({
              address: item,
              address_id: item.id
            })
          }
        })
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item_id = 'packageSubfrom.item_id'
    this.setData({
      [item_id]: Number(options.itemid),
      item_idAA: Number(options.itemid)
    })
    //订单详情
    this.conentapi()

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getaddress()
    this.conentapi()
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    console.log(currPage.data)
  },


  conentapi() {
    console.log(this.data.item_idAA);
    
    app.$request('/shop/itemInfo', 'POST', {
      item_id: this.data.item_idAA
    }).then(res => {
      console.log(Number(res.data.money));
      this.setData({
        itemlist: res.data,
        price: Number(res.data.money)
      })
    })

    console.log(this.data.address_id);


    app.$request('/personal/address', 'GET', {
      id: this.data.address_id
    }).then(res => {
      console.log(res);


    })

  }









})
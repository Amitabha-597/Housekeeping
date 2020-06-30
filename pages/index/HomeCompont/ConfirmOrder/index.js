// pages/index/HomeCompont/ConfirmOrder/index.js
const app = getApp()

Page({

  data: {

    itemidshow: true,
    item_id: '',
    Paymethod: '1',
    address_id: null,
    coupon_ids: '',
    xiaofei: 0,
    desc: '',
    waiters: '',
    discount: null, //优惠券
    price: 0,

    showPayMode: false,
    showCoupon: false,
    forIndex: 0,
    address: {},
    itemlist: {},


    orderfrom: {
      address_id: '',
      tips: 0,
      subscribe_time: '',
      staff_id: '',
      type_id: ''
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
    Coupon: [],
  },
  onPickerChange: function (e) {
    let subscribe_time = 'orderfrom.subscribe_time'
    this.setData({
      date: e.detail.dateString,
      [subscribe_time]: e.detail.dateString
    })
  },
  //提交订单


  submitorder() {

    if (this.data.item_id != '') {
      let data = {
        item_id: this.data.itemlist.id,
        address_id: this.data.orderfrom.address_id,
        tips: 0,
        coupon_id: this.data.coupon_ids,
        subscribe_time: this.data.orderfrom.subscribe_time,
        method: this.data.Paymethod
      }
      app.$request('/order/ordinary', 'POST', data)
        .then(res => {
          
            if (res.code == 1) {

              app.$request('/buy/payment', 'POST', {
                trade_no: res.data.trade_no,
                type: 1,
                method: 1,
                openid: wx.getStorageSync('openid'),
              }).then(res => {
                wx.requestPayment({
                  timeStamp: res.data.sign.timeStamp,
                  nonceStr: res.data.sign.nonceStr,
                  package: res.data.sign.package,
                  signType: res.data.sign.signType,
                  paySign: res.data.sign.paySign,
                  success(res) {
                    wx.navigateTo({
                      url: '/pages/myhome/MyHomecompontes/MyOrder/MyOrder',
                    })
                  },
                  fail(res) {}
                })


              })









            }
          



          },
          error => {
            if(error.code == 4){
      
              this.setData({
                desc: '',
                discount: '',
                coupon_ids: ''
              })
            }
            wx.showToast({
              title: error.msg,
              icon: 'none',
              duration: 2000
            })
          }
        )
    }

    let orderfrom = this.data.orderfrom
    if (orderfrom.type_id != '') {
      app.$request('/order/customized', 'POST', orderfrom)
        .then(res => {
            if (res.code == 1) {
              wx.showToast({
                title: '待商家接单',
                icon: 'success',
                duration: 2000
              })
            }
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }, 2000);

          },
          error => {
            wx.showToast({
              title: error.msg,
              icon: 'none',
              duration: 2000
            })
          }
        )
    }





  },


  showPayMode(e) {
    this.setData({
      showPayMode: true
    })

  },
  showCoupon() {
    this.setData({
      showCoupon: true
    })
  },

  close: function () {
    this.setData({
      showSelectWaiter: false,
      showPayMode: false

    })
  },
 
  selectPaymode(e) {
    this.setData({
      Paymethod: e.detail.value
    })
    this.close()
  },
  //选择优惠券
  selectCoupon(e) {
    let id = e.detail.value
    let desc = e.detail.desc
    let discount = e.detail.discount
    this.setData({
      desc: desc,
      discount: discount,
      coupon_ids: id
    })

    this.close()
  },
  toaddlist() {
    wx.navigateTo({
      url: '/pages/myhome/MyHomecompontes/ServiceAddress/index?Select='+true,
    })
  },
  getaddress() {
    app.$request('/personal/address', 'POST', {
      page: 1,
      pz: 999
    }).then(res => {
      if (this.data.address_id) {
        res.data.list.map(item => {
          if (item.id == this.data.address_id) {
            let address_id = 'orderfrom.address_id'
            this.setData({
              [address_id]: item.id,
              address: item
            })
          }
        })
      } else {
        res.data.list.map(item => {
          if (item.is_default == 1) {
            let address_id = 'orderfrom.address_id'
            this.setData({
              [address_id]: item.id,
              address: item
            })
          }
        })
      }
    })
  },

  onShow(){

this.getaddress()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let staff_id = 'orderfrom.staff_id'
    this.setData({
      [staff_id]: app.globalData.staffid
    })
    if (options.type_id) {
      let type_id = 'orderfrom.type_id'
      this.setData({
        item_id: options.type_id,
        itemidshow: false,
        [type_id]: options.type_id
      })
    }

    if (options.item_id) {

      this.setData({
        item_id: options.item_id

      })

      //订单详情
      app.$request('/shop/itemInfo', 'POST', {
        item_id: options.item_id
      }).then(res => {

        this.setData({
          itemlist: res.data,
          price: Number(res.data.money)
        })
      })

    }







    this.getaddress()
    this.datacontent()
  },

  datacontent() {

    //优惠券
    app.$request('/personal/coupon', 'POST', {
      page: 1,
      pz: 999,
      status: 1
    }).then(res => {
      this.setData({
        Coupon: res.data.list
      })
    })

  },
})
// pages/myhome/MyHomecompontes/MyOrder/OrderDetalis/waitforevaluation/EvaluateOrder/EvaluateOrder.js
const app = getApp()
const URL = getApp().globalData.URl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: '',
    evadata: {},
    isAdonymous: false, //是否匿名
    evaSuccess: true,
    describeOn: 0,
    describeNot: 5,
    LogisticsOn: 0,
    LogisticsNot: 5,
    AttitudeOn: 0,
    AttitudeNot: 5,
    evafrom: {
      order_no: '',
      is_adonymous: 2,
      content: '',
      star: null,
      describe_star: null,
      service_star: null,
      img_path: []
    }
  },


  Evacontents(e) {
    // console.log(e.detail.value);
    let content = "evafrom.content"
    this.setData({
      [content]: e.detail.value
    })
  },
  Stars(e) {
    // console.log(e.currentTarget.dataset.starnum);
    let star = "evafrom.star"
    this.setData({
      [star]: e.currentTarget.dataset.starnum
    })

  },
  showSuccess() {
    console.log(this.data.evafrom);
    app.$request('/order/evaluate', 'POST',
      this.data.evafrom
    ).then(res => {
      console.log(res);
      if (res) {
        this.setData({
          evaSuccess: !this.data.evaSuccess
        })
        setTimeout(() => {
          this.setData({
            evaSuccess: !this.data.evaSuccess
          })
        }, 2000);
      }
    }, err => {
      console.log(err);
      wx.showToast({
        title: err.msg,
        icon: 'none',
        duration: 2000
      })
    })












  },
  //匿名
  Adonymous() {
    this.setData({
      isAdonymous: !this.data.isAdonymous
    })
    if (!this.data.isAdonymous) {
      this.data.evafrom.is_adonymous = 1
      let is_adonymous = 'is_adonymousevafrom.is_adonymous'
      this.setData({
        [is_adonymous]: 1
      })
    } else {
      let is_adonymous = 'is_adonymousevafrom.is_adonymous'
      this.setData({
        [is_adonymous]: 1
      })
    }
  },
  describeStar: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var startOn;
    if (in_xin == 'star') {
      startOn = Number(e.currentTarget.id)
    } else {
      startOn = Number(e.currentTarget.id) + this.data.describeOn
    }
    this.setData({
      describeOn: startOn,
      describeNot: 5 - startOn
    })
  },
  Logistics(e) {
    var starType = e.currentTarget.dataset.in;
    var startOn;
    if (starType == 'star') {
      startOn = Number(e.currentTarget.id)
    } else {
      startOn = Number(e.currentTarget.id) + this.data.LogisticsOn
    }
    let service_star = "evafrom.service_star"
    this.setData({
      [service_star]: startOn,
      LogisticsOn: startOn,
      LogisticsNot: 5 - startOn
    })
  },
  Attitude(e) {
    var starType = e.currentTarget.dataset.in;
    var startOn;
    if (starType == 'star') {
      startOn = Number(e.currentTarget.id)
    } else {
      startOn = Number(e.currentTarget.id) + this.data.AttitudeOn
    }
    let describe_star = "evafrom.describe_star"
    this.setData({
      [describe_star]: startOn,
      AttitudeOn: startOn,
      AttitudeNot: 5 - startOn
    })
  },
  onLoad: function (options) {
    console.log(options.orderno);
    let order_no = 'evafrom.order_no'
    this.setData({
      [order_no]: options.orderno
    })
    this.setData({
      URL: URL
    })
    let ordernos = Number(options.orderno)
    app.$request('/order/orderInfo', 'POST', {
      order_no: ordernos
    }).then(res => {
      console.log(res.data);
      this.setData({
        evadata: res.data
      })
    })


  }
})
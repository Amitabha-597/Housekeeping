// pages/myhome/MyHomecompontes/MyOrder/OrderDetalis/OrderDetalis..js
const app = getApp()
const URL = getApp().globalData.URl
const uploadsImgURl = getApp().globalData.uploadsImgURl
import {
  hexMD5
} from "../.././../../../../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: '',
    showSuccess: true,
    Reasons: '',
    showRefund: false,
    refundfrom: {
      order_no: '',
      reason: '',
      content: '',
      img: []
    },
    Refund: [{
        id: 1,
        text: '服务质量差',
        value: '服务质量差',
        type: 'warn',
      },
      {
        id: 2,
        text: '店铺服务描述与实际严重不符',
        value: '店铺服务描述与实际严重不符'

      },
      {
        id: 3,
        text: '服务人员态度差',
        value: '服务人员态度差'
      },
      {
        id: 4,
        text: '其他原因',
        value: '其他原因'
      },

    ],


  },
  //退款说明
  Contents(e) {
    console.log(e.detail.value);
    let content = 'refundfrom.content'
    this.setData({
      [content]: e.detail.value
    })
  },
  showRefund() {
    this.setData({
      showRefund: !this.data.showRefund
    })

  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    console.log(e)
    let reason = 'refundfrom.reason'
    this.setData({
      [reason]: e.detail.value,
      Reasons: e.detail.value
    })

    this.close()
  },
  RefundSubmit() {
    console.log(this.data.refundfrom);
    let refundfrom = this.data.refundfrom
    refundfrom.img = JSON.stringify(refundfrom.img)
    console.log(refundfrom);

    app.$request('/order/refund', 'POST',
      refundfrom
    ).then(res => {
      console.log(res);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })

    },
    err=>{
      wx.showToast({
        title: err.msg,
        icon: 'none',
        duration: 2000
      })

    }
    )


    // var that = this
    // this.setData({
    //   showSuccess: !this.data.showSuccess
    // })
    // setTimeout(function () {
    //   that.setData({
    //     showSuccess: !that.data.showSuccess
    //   })
    // }, 2000);
  },

  /**
   * 生命周期函数--监听页面加载
   */



  //图片上传
  makeid(length = 8) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },
  RefundImg() {
    let that = this
    let str = this.makeid()

    let query = 'app_id=aminmbfnhcrfnoesheoi&app_key=fpfqFCldavpHcEwkGGgwypIheGGnirxp&random=' + str
    let sign = hexMD5(query).toUpperCase()
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // console.log( res.tempFilePaths);

        // app.$request('/common/uploads_img','POST',{
        //   file:tempFilePaths[0]
        // })
        wx.uploadFile({
          url: uploadsImgURl,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            // 'Content-Type': contentTypes,
            'sign': sign,
            'random': str,
            'openid': wx.getStorageSync('openid'),
          },
          success(res) {
            console.log(res);
            let image = JSON.parse(res.data)
            console.log(image);
            let bannerlist = that.data.refundfrom.img
            bannerlist.push(image.data.src)
            let img = 'refundfrom.img'
            that.setData({
              [img]: bannerlist
            })
          },
          fail(errror) {
            console.log(1, errror)
          }
        })

      }

    })

  },
  // //图片上传











  onLoad: function (options) {
    this.setData({
      URL: URL
    })
    console.log(options);

    let order_no = 'refundfrom.order_no'
    this.setData({
      [order_no]: options.orderno
    })
    this.setData({
      URL: URL
    })
    let ordernoss = Number(options.orderno)
    app.$request('/order/orderInfo', 'POST', {
      order_no: ordernoss
    }).then(res => {
      console.log(res.data);
      this.setData({
        evadata: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/index/Navitem/DowCenter/MoreInfo/MoreInfo.js
const URl = getApp().globalData.URl
import {
  hexMD5
} from "../../../../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MaxLength: 0,
    URl: '',
    shoplista: '',
    shoplistb: {
      logo: '',
      desc: '',
      car_img: '',
      car_side_img: '',
      contacts: '',
      mobile: '',
    }
  },
  makeid(length = 8) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },
  //头像
  Shoplogo() {
    let that = this
    let str = this.makeid()

    let query = 'app_id=aminmbfnhcrfnoesheoi&app_key=fpfqFCldavpHcEwkGGgwypIheGGnirxp&random=' + str
    let sign = hexMD5(query).toUpperCase()
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        wx.uploadFile({
            filePath: tempFilePaths[0],
            name: 'file',
            url: 'https://wuhua.mrhkj.com/wuhuaapi/common/uploads_img',
            header: {
              'sign': sign,
              'random': str,
              'openid': 'sfgasgaslj421132541315'
            },
            success(res) {
              let image = JSON.parse(res.data)
              let logo = 'shoplistb.logo'
              that.setData({
                [logo]: image.data.src
              })

            },
            fail(errror) {
              console.log(errror)
            }
          },

        )
      }

    })

  },
  //介绍
  desccontent(e) {
    console.log(e.detail.value);
    let shoplistb = 'shoplistb.desc'
    this.setData({
      [shoplistb]: e.detail.value
    })
  },
  //身份证正面
  IDcarfA() {
    let that = this
    let str = this.makeid()

    let query = 'app_id=aminmbfnhcrfnoesheoi&app_key=fpfqFCldavpHcEwkGGgwypIheGGnirxp&random=' + str
    let sign = hexMD5(query).toUpperCase()
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        wx.uploadFile({
            filePath: tempFilePaths[0],
            name: 'file',
            url: 'https://wuhua.mrhkj.com/wuhuaapi/common/uploads_img',
            header: {
              'sign': sign,
              'random': str,
              'openid': 'sfgasgaslj421132541315'
            },
            success(res) {
              let image = JSON.parse(res.data)
              let car_img = 'shoplistb.car_img'
              that.setData({
                [car_img]: image.data.src
              })

            },
            fail(errror) {
              console.log(errror)
            }
          },

        )
      }

    })

  },





  //身份证反面
  IDcarfB() {
    let that = this
    let str = this.makeid()

    let query = 'app_id=aminmbfnhcrfnoesheoi&app_key=fpfqFCldavpHcEwkGGgwypIheGGnirxp&random=' + str
    let sign = hexMD5(query).toUpperCase()
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        wx.uploadFile({
            filePath: tempFilePaths[0],
            name: 'file',
            url: 'https://wuhua.mrhkj.com/wuhuaapi/common/uploads_img',
            header: {
              'sign': sign,
              'random': str,
              'openid': 'sfgasgaslj421132541315'
            },
            success(res) {
              let image = JSON.parse(res.data)
              let car_side_img = 'shoplistb.car_side_img'
              that.setData({
                [car_side_img]: image.data.src
              })

            },
            fail(errror) {
              console.log(errror)
            }
          },

        )
      }

    })

  },
  userName(e) {
    console.log(e.detail.value);
    let contacts = 'shoplistb.contacts'
    this.setData({
      [contacts]: e.detail.value
    })
  },

  userTel(e) {
    console.log(e.detail.value);
    let mobile = 'shoplistb.mobile'
    this.setData({
      [mobile]: e.detail.value
    })

  },




  MaxLength(e) {
    let content = e.detail.value
    this.setData({
      Shopintr: content,
      MaxLength: content.length
    })
  },
  ToPay() {
  
    let shoplistb = this.data.shoplistb
    let shoplista = this.data.shoplista
    let shoplist = Object.assign(shoplista, shoplistb);
    for (let i in shoplistb){
      if (this.data.shoplistb[i] == '') {
        wx.showToast({
          title:'有为空的参数',
          icon:'none'
        })
        return 
      }
    }
    wx.navigateTo({
      url: '/pages/index/Navitem/DowCenter/pay/pay?shoplist=' +JSON.stringify(shoplist)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      URl: URl,
      shoplista: JSON.parse(options.shoplista)
    })
  },

})
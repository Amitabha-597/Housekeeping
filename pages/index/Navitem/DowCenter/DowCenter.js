// pages/index/Navitem/DowCenter/DowCenter.js

const URl = getApp().globalData.URl

import {
  hexMD5
} from "../../../../utils/md5.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    severtypelist: [],
    serviceType: [],
    URl: '',
    region: ['省', '市', '区'],
    shop_name:'',
    shoplista: {
      shop_name: '', //店铺名称
      biz_name: '', //企业名称
      shop_addr: '点击选择地址', //店铺地址
      serv_type: '[]', //服务类型
      bus_photo: '', //营业 执照
      other_photo: [], //其他证件
      province: '', //地区省
      city: '', //地区市
      area: '', //地区
      shop_longitude: '', //经度
      shop_dimension: '' //纬度
    }


  },
  typeList(res) {
    console.log(1111,res)
  },




  SelectServiceType() {

    wx.navigateTo({
      url: '/pages/index/Navitem/DowCenter/severtype/severtype'
    })
  },
  bindRegionChange: function (e) {
    console.log(e.detail.value[0]);
    let province = 'shoplista.province'
    let city = 'shoplista.city'
    let area = 'shoplista.area'
    this.setData({
      region: e.detail.value,
      [province]: e.detail.value[0],
      [city]: e.detail.value[1],
      [area]: e.detail.value[2],
    })
  },
  NextStep() {
    let shoplista = JSON.stringify(this.data.shoplista)
    console.log(this.data.shoplista);
    for (let i in this.data.shoplista){
      if (this.data.shoplista[i] == '') {
        wx.showToast({
          title:'有为空的参数',
          icon:'none'
        })
        return false
      }
    }
    wx.navigateTo({
      url: '/pages/index/Navitem/DowCenter/MoreInfo/MoreInfo?shoplista=' + shoplista,
    })
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

  //营业执照
  businesslicense() {
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
              let bus_photo = 'shoplista.bus_photo'
              that.setData({
                [bus_photo]: image.data.src
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

  //其他证件

  Otherdocuments() {
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
              // 'Content-Type': contentTypes,
              'sign': sign,
              'random': str,
              'openid': 'sfgasgaslj421132541315'
            },
            success(res) {
              let image = JSON.parse(res.data)
              console.log(image.data);
              let Licenselist = that.data.shoplista.other_photo
              Licenselist.push(image.data.src)
              let other_photo = 'shoplista.other_photo'
              that.setData({
                [other_photo]: Licenselist
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
  //图片上传


  //店铺名称
  Shopname(e) {
    console.log(e.detail.value);
    // let shop_name = 'shoplista.shop_name'
    this.setData({
      'shoplista.shop_name': e.detail.value
    })
    console.log(this.data.shop_name)
  },

  //企业名称
  Enterprisename(e) {
    // console.log(e.detail.value);
    let biz_name = 'shoplista.biz_name'
    this.setData({
      [biz_name]: e.detail.value
    })
  },
  //店铺地址
  Shopadress() {
    let that = this
    wx.chooseLocation({
      type: 'wgs84',
      success(res) {
        const name = res.name
        const address = res.address
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(name);
        console.log(address);
        console.log(latitude);
        console.log(longitude);
        let shop_addr = 'shoplista.shop_addr'
        let shop_longitude = 'shoplista.shop_longitude'
        let shop_dimension = 'shoplista.shop_dimension'
        that.setData({
          [shop_addr]: address,
          [shop_longitude]: latitude,
          [shop_dimension]: longitude
        })
      }
    })

  },

  onLoad(e) {
    let listfw = e.fwData ? e.fwData : JSON.stringify([])
    let type = JSON.stringify(JSON.parse(listfw).map(item => item.id))
    // console.log(,12312)
    this.setData({
      URl: URl,
      'shoplista.serv_type': type
    })
  }
})
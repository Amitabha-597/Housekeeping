const app = getApp()
const URl = getApp().globalData.URl
import {
  hexMD5
} from "../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sselect: 0,
    taglist: '',
    URl: '',
    adddemand: {
      title: '',
      tag: '1',
      content: '',
      name: "",
      mobile: "",
      addres: ''
    },
    banner: [],
  },
  //地址选择
  selectAddress() {
    var that = this
    wx.chooseLocation({
      type: 'wgs84',
      success(res) {
        var address = "adddemand.addres"
        that.setData({
          [address]: res.address
        })
        // that.data.adddemand.addres	= res.address
      }
    })
  },
  Selecttag(e) {
    console.log(e.currentTarget.dataset.tagid);
    let tag = 'adddemand.tag'
    this.setData({
      [tag]: e.currentTarget.dataset.tagid,
      sselect: e.currentTarget.dataset.index
    })
  },
  Demandtitle(e) {
    this.data.adddemand.title = e.detail.value
  },
  Demandcontent(e) {
    this.data.adddemand.content = e.detail.value
  },
  Demandname(e) {
    this.data.adddemand.name = e.detail.value
  },
  Demandmobile(e) {
    this.data.adddemand.mobile = e.detail.value
  },
  Demandaddres(e) {
    this.data.adddemand.addres = e.detail.value
  },


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
  Addbanner() {
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
          url: 'https://wuhua.mrhkj.com/wuhuaapi/common/uploads_img',
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

            // console.log(image);

            let bannerlist = that.data.banner
            bannerlist.push(image.data.src)
            that.setData({
              banner: bannerlist
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









  PublishNow() {


    this.data.adddemand.banner = this.data.banner

    let adddemandlist = this.data.adddemand


    for (let i in adddemandlist) {
      console.log(i, adddemandlist[i])
      if (adddemandlist[i] == '') {
        wx.showToast({
          title: '请把内容填充完整',
          icon: 'none',
          duration: 2000
        })

      }

    }


    app.$request('/demand/release', 'POST', adddemandlist).then(res => {
      console.log(res);
      if (res.code == 1) {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
       wx.navigateTo({
         url: '/pages/index/index',
       })
        }, 3000);
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      URl: URl
    })
    app.$request('/index/serviceType', 'POST', {}).then(res => {
      console.log(res);

      this.setData({
        taglist: res.data
      })
    })

  },


})
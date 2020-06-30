// pages/servicePersonal/Login/register/register.js

const app = getApp()
const URl = getApp().globalData.URl
import {
  hexMD5
} from "../../../../utils/md5.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendTime: '获取验证码',
    sendColor: '#363636',
    snsMsgWait: 60,
    showPwd: false,
    ConsentAgreement: false,
    showSelectShop: false,
    showSelectJob: false,
    shopName: '',
    jobName: [],
    ConsentAgreement: false,
    addressa: '',
    shopList: [],
    jobList: [],
    regfrom: {
      mobile: '',
      pass: '',
      code: '',
      names: '',
      idnum: '',
      idimg: '',
      idcarimg: '',
      certificate: [],
      biz_id: 19,
      addr: '',
      longitude: '',
      dimension: ''


    },
    s_type: [],
    certificate: []

  },
  //手机号
  Mobile(e) {
    // console.log(e.detail.value);
    let mobile = 'regfrom.mobile'
    this.setData({
      [mobile]: e.detail.value
    })
  },
  Yzcode(e) {
    // console.log(e.detail.value);
    let code = 'regfrom.code'
    this.setData({
      [code]: e.detail.value
    })
  },
  //密码
  Password(e) {
    // console.log(e.detail.value);
    let pass = 'regfrom.pass'
    this.setData({
      [pass]: e.detail.value
    })
  },

  //姓名
  userName(e) {
    // console.log(e.detail.value);
    let names = 'regfrom.names'
    this.setData({
      [names]: e.detail.value
    })
  },
  //身份证号
  Idnum(e) {
    console.log(e.detail.value);
    let idnum = 'regfrom.idnum'
    this.setData({
      [idnum]: e.detail.value
    })
  },
  //清空身份证号
  clearInputID() {
    let idnum = 'regfrom.idnum'
    this.setData({
      [idnum]: ''
    })
  },
  close: function () {
    this.setData({
      showSelectShop: false,
      showSelectJob: false
    })
  },
  ShowShopSelect() {
    this.setData({
      showSelectShop: !this.data.showSelectShop
    })
  },
  ShowJobSelect() {
    this.setData({
      showSelectJob: !this.data.showSelectJob
    })
  },
  ShowShop(e) {
    let biz_id = 'regfrom.biz_id'
    this.setData({
      [biz_id]: e.detail.value
    })
    app.$request('/staff/shopType', 'POST', {
      id: e.detail.value
    }).then(res => {
      this.setData({
        jobList: res.data.list
      })
    })


    this.setData({
      shopName: e.detail.text,


    })
    this.close()
  },
  ShowJob(e) {
    console.log(e.detail.id);

    let joblist = this.data.jobName
    let typelist = this.data.s_type
    joblist.push(e.detail.value)
    let jobarr = Array.from(new Set(joblist))

    typelist.push(e.detail.id)
    let typearr = Array.from(new Set(typelist))
    console.log(typearr);
    this.setData({
      jobName: jobarr,
      s_type: typearr

    })
    this.close()
  },
  sendCode: function () {
    var inter = setInterval(function () {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#363636',
          sendTime: '重新获取',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
  },
  ShowPwd(e) {
    this.setData({
      showPwd: e.detail.value
    })
  },
  ConsentAgreement() {
    this.setData({
      ConsentAgreement: !this.data.ConsentAgreement
    })
  },
  Register() {
    if (this.data.ConsentAgreement) {
    console.log(this.data.s_type)
    this.data.regfrom.s_type = JSON.stringify(this.data.s_type)
    this.data.regfrom.certificate = JSON.stringify(this.data.certificate)
    this.data.regfrom.pass = hexMD5(this.data.regfrom.pass).toUpperCase()
    console.log(this.data.regfrom);

    let registerlist = this.data.regfrom
    app.$request('/staff_login/register', 'POST', registerlist).
    then(res => {
      console.log(res);
      if (res.code == 1) {
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
      }
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/servicePersonal/Login/Login',
        })
      }, 4000);
    }, error => {
      console.log(error);
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 2000
      })
    })}else{
      wx.showToast({
        title: '是否同意用户协议',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getLocation() {
    let that = this
    wx.chooseLocation({
      // type: 'wgs84',
      success(res) {
        console.log(res.longitude); //经度
        console.log(res.latitude); //纬度
        const address = res.address
        let addrs = 'regfrom.addr'
        let longitudes = 'regfrom.longitude'
        let dimensions = 'regfrom.dimension'



        that.setData({
          addressa: address,
          [addrs]: res.address,
          [longitudes]: res.longitude,
          [dimensions]: res.latitude

        })
      },
      fail(res) {
        console.log(res)
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
    app.$request('/staff/shop', 'POST', this.data.regfrom).then(res => {
      this.setData({
        shopList: res.data.list
      })
    })
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
  //身份证正面

  IdcardA() {
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
            console.log(image.data.src);
            let idimg = 'regfrom.idimg'
            that.setData({
              [idimg]: image.data.src
            })
          },
          fail(errror) {
            console.log(errror)
          }
        })
      }

    })

  },
  IdcardB() {
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
            console.log(image.data.src);
            let idcarimg = 'regfrom.idcarimg'
            that.setData({
              [idcarimg]: image.data.src
            })
          },
          fail(errror) {
            console.log(errror)
          }
        })
      }

    })

  },

  ZhengshuA() {
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
            console.log(image.data.src);

            let certificate = that.data.certificate
            certificate.push(image.data.src)

            that.setData({
              certificate: certificate
            })
          },
          fail(errror) {
            console.log(errror)
          }
        })
      }

    })

  },
  //图片上传



})
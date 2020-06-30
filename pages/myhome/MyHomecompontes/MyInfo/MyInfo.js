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
    autographLength: 0,
    code:'',
    userinfo:{
      nickname:"",
      avatar_url:"",
      mobile:'',
      gender:'',
      sign:"",
     
    }
  },
  //签名长度
  autograph(e) {
    this.data.userinfo.sign = e.detail.value
   
    this.setData({
      autographLength: e.detail.cursor,
    })
  },
  changeName(e){
    this.data.userinfo.nickname = e.detail.value
  },
  //a验证码
  codedata(e){

    this.setData({
      code : e.detail.value
    })
  },
  saveMsg(){
    delete(this.data.userinfo["openid"])
    this.data.userinfo.code=this.data.code
    let userinfo  = this.data.userinfo
    app.$request('/login/editInfo', 'POST', userinfo).then(res => {
      if(res.code==1){
        this.onLoad()
      }
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
  changeAvatar(){
    let that =this
    let str = this.makeid()

    let query = 'app_id=aminmbfnhcrfnoesheoi&app_key=fpfqFCldavpHcEwkGGgwypIheGGnirxp&random=' + str
    let sign = hexMD5(query).toUpperCase()
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        
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
            'openid': wx.getStorageSync('openid')
            },
          success(res){
        console.log();

            let image= JSON.parse(res.data)
         console.log(image.data.src);
         that.data.userinfo.avatar_url = image.data.src
          },
          fail(errror){
            console.log(errror)
          }
        },
       
        )
      }
      
    })
    
},
  //图片上传
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      URl:URl,
      autographLength: this.data.userinfo.sign.length
    })
    app.$request('/login/me', 'POST', {
      
    }).then(res => {
     this.setData({
      userinfo:res.data
     })
    })



  },
})
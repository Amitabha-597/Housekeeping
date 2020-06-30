// pages/myhome/MyHomeComs/AddNewAddress/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['请选择地区', '', ''],

    newaddFrom:{
     name:'',
     mobile:'',
     province:' ',
     city:'',
     area:"",
     house_number:"",
     is_default:"0",
     address:""
     
    },
    useraddress: ''
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
    })
    
    this.data.newaddFrom.province= Object.assign(e.detail.value.slice(0,1))
    this.data.newaddFrom.city=  Object.assign(e.detail.value.slice(1,2))
    this.data.newaddFrom.area=  Object.assign(e.detail.value.slice(2,3))

  },
  inputname(e){
    this.data.newaddFrom.name = e.detail.value
  },
  inputmobile(e){
    this.data.newaddFrom.mobile = e.detail.value
  },
  houseNumber(e){
    this.data.newaddFrom.house_number = e.detail.value
  },
  //地址默认
  adddefault(event){
      let events=event.detail.value
      if(events){
        this.data.newaddFrom.is_default=1
      }else{
        this.data.newaddFrom.is_default=0
      }
  },
  getAddress() {
    var that = this
    wx.chooseLocation({
      type: 'wgs84',
      success(res) {
        const address = res.address
        that.data.newaddFrom.address = address
        that.setData({
          useraddress: address
        })
      }
    })
  },
  seaveAdd(e) {
    app.$request('/personal/addAddress', 'POST', this.data.newaddFrom).then(res => {
      console.log(res)
     if(res.code==1){
          
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000
      }),
     setTimeout(()=>{
      wx.navigateBack() 
     },1000)
     }else{
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000
      })
     }
    })
  },
  
})
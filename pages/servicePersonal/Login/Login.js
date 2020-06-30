const app = getApp()

import {
  hexMD5
} from "../../../utils/md5.js"
Page({
  data: {
    inputValue: null,
    showPwd: false,
    ConsentAgreement: false,
    loginFrom: {
      mobile: '',
      pass: ''
    }
  },
  loginmobile(e) {
    console.log(e.detail.value);
    let mobile = 'loginFrom.mobile'
    this.setData({
      [mobile]: e.detail.value
    })

  },
  loginpwd(e) {
    console.log(e.detail.value);
    let pass = 'loginFrom.pass'
    this.setData({
      [pass]: e.detail.value
    })

  },
  loginBtn() {
    console.log(this.data.ConsentAgreement);

    if (this.data.ConsentAgreement) {
      console.log(this.data.loginFrom)


      this.data.loginFrom.pass = hexMD5(this.data.loginFrom.pass).toUpperCase()
      console.log(this.data.loginFrom);

      app.$request('/staff_login/login', 'POST', this.data.loginFrom).then(
        res => {
          // console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/servicePersonal/home/home',
              })
            }, 2000);
          }
        },
        err=>{
          console.log(err);
          wx.showToast({
            title: err.msg,
            icon: 'none',
            duration: 2000
          })
          
        }

      )
    } else {
      wx.showToast({
        title: '是否同意用户协议',
        icon: 'none',
        duration: 2000
      })
    }

  },
  clearInput: function (res) {
    let mobile = 'loginFrom.mobile'
    this.setData({
      [mobile]: ""
    })
  },
  switch1Change(e) {
    this.setData({
      showPwd: e.detail.value
    })
  },
  ConsentAgreement() {

    this.setData({
      ConsentAgreement: !this.data.ConsentAgreement
    })
  },

})
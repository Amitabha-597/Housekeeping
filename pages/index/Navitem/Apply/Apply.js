// pages/index/Navitem/Apply/Apply.js
const app = getApp()
Page({



  data: {
    isShowgender: false,
    isShowEducation: false,
    Genders: "请选择性别",
    Education: '请选择学历',
    applyFrom: {
      names: '',
      gender: '',
      education: "",
      mobile: '',
      check_code: "",
      job: [],
      job_data: [{
        starttime: '',
        endtime: '',
        content: ''
      }],



    }


  },
  //用户姓名

  Applynow() {
    console.log(this.data.applyFrom);
    let applyFrom = this.data.applyFrom
    // applyFrom.job = JSON.stringify(applyFrom.job)
    // applyFrom.job_data = JSON.stringify(applyFrom.job_data)
    console.log(applyFrom);
    app.$request('/apply/apply', 'POST', applyFrom).then(res => {
      console.log(res)
    })
  },


  username(e) {
    console.log(e.detail.value);
    let names = 'applyFrom.names'
    this.setData({
      [names]: e.detail.value
    })
  },

  //显示性别
  showGender() {
    this.setData({
      isShowgender: !this.data.isShowgender
    })
  },
  //性别
  Gender(e) {
    let gender = e.currentTarget.dataset.gender
    if (gender == 1) {
      let gender = 'applyFrom.gender'
      this.setData({
        [gender]: e.currentTarget.dataset.gender,
        Genders: '男',
        isShowgender: !this.data.isShowgender
      })
    }
    if (gender == 2) {
      let gender = 'applyFrom.gender'
      this.setData({
        [gender]: e.currentTarget.dataset.gender,
        Genders: '女',
        isShowgender: !this.data.isShowgender
      })
    }


  },
  //显示学历
  showEducation() {
    this.setData({
      isShowEducation: !this.data.isShowEducation
    })
  },
  //学历
  Education(e) {
    let education = 'applyFrom.education'
    this.setData({
      [education]: e.currentTarget.dataset.education,
      Education: e.currentTarget.dataset.education,
      isShowEducation: !this.data.isShowEducation
    })

  },
  //手机号
  Mobile(e) {
    let mobile = 'applyFrom.mobile'
    this.setData({
      [mobile]: e.detail.value
    })
  },
  //验证码
  Yzma(e) {
    let check_code = 'applyFrom.check_code'
    this.setData({
      [check_code]: e.detail.value
    })
  },
  onLoad: function (options) {


  },
  onShow() {
    console.log(this.selectComponent('#jobdata'));
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    console.log(currPage.data);

    let info = currPage.data.applyFrom.job_data
    if (info) {
      this.setData({
        'applyFrom.job_data': JSON.parse(info)
      })
    }

  }

})
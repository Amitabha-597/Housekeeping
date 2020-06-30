// pages/activity/Actcomponent/coupon/coupon.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    couponlist: ['1']
  },
  created() {
    app.$request('/activity/coupon', 'POST', {
      page: 1,
      pz: 999,

    }).then(res => {
      console.log(res.data)
      this.setData({
        couponlist: res.data.list
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    Receive(e) {
      console.log(e.currentTarget.dataset.coupon_id);
      let coupon_id = e.currentTarget.dataset.coupon_id
      app.$request('/activity/receive', 'POST', {
        coupon_id: coupon_id
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
        }

      })

    }
  }
})
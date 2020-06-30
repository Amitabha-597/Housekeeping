// pages/servicePersonal/Components/servicePersonNav/SPtabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    setectNav: {
      type: Number,
      value: null
    },
  
  
  },

  /**
   * 组件的初始数据
   */


  /**
   * 组件的方法列表
   */
  methods: {
    Switchpage(e) {
      let url = e.currentTarget.dataset.url

      wx.navigateTo({
        url: '/pages/servicePersonal/' + url + ''
      })
      this.setData({
        setectNav:e.currentTarget.dataset.index
      })
    }
  
  }
})
// pages/activity/Actcomponent/group/groups.js
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
    groupList: []
  },
  created() {

    app.$request('/activity/collage', 'POST', {
      page:1,
      pz: 9999
    }).then(res => {
      console.log(res.data.list);

      this.setData({
        groupList: res.data.list

      })
    })


  },
  /**
   * 组件的方法列表
   */
  methods: {
    Goandmakeaist(e) {
      // console.log(e.currentTarget.dataset.id);
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/activity/Actcomponent/groupdetails/groupdetails?id=' + id,
      })

    },
  }
})
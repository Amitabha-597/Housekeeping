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
    writerList: [ ]
  },
 
created(){
  app.$request('/activity/package', 'POST', {
    page:1,
    pz: 999
  }).then(res => {
    console.log(res.data.list)
    this.setData({
      groupList: res.data.list
    })
    
  })
},

  /**
   * 组件的方法列表
   */
  methods: {
    topackDetails(e){
      // console.log(e.currentTarget.dataset.id);
      let id= e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/activity/Actcomponent/Packagedetails/Packagedetails?id='+id,
      })
      
        },
  }
})
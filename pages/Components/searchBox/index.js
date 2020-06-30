
// 本组件为搜索组件
// 需要传入addflag   值为true / false （搜索框右侧部分）
// 若显示搜索框右侧部分   需传入右侧图标url以及addhandle函数
const app = getApp().globalData
Page({
  data: {
    // searchflag: false,   //搜索框 取消按钮显示与隐藏
    region: app.region,
  },


  onLoad: function (options) {
   
    
    
  },
 

  /**
   * 组件的方法列表

   */bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    app.region = e.detail.value
  },
  
  methods: {
    
 
    //获得焦点
    getfocus() {
      this.setData({
        searchflag: true,
      })
    },
    //搜索输入
    searchList(e) {
      this.triggerEvent("searchList", e);
    },
    //查询
    endsearchList(e) {

      this.triggerEvent("endsearchList");
    },
    //失去焦点
    blursearch() {
      // console.log('失去焦点')

    },
  
    //清空搜索框
    activity_clear(e) {

      this.triggerEvent("activity_clear");
    },

  }
})

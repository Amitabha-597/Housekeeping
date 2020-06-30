// pages/index/Navitem/DowCenter/severtype/severtype.js
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
    SelectionList: [],
    CandidateList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    delItem(e) {
      let key = Number(e.currentTarget.dataset.item)
      let SelectionList = this.data.SelectionList
      SelectionList.splice(key, 1)
      this.setData({
        SelectionList: SelectionList
      })
    },

 
    pushForSelection(e) {

      let item = e.currentTarget.dataset.item
      let lista = this.data.SelectionList
      let arr = lista.map(item=>item.names)
      console.log(arr, arr.includes(item.names))
      if (!arr.includes(item.names)){
        lista.push(item)
      }
      
      // let listb = [...new Set(lista.push(item))]
      let listb = Array.from(new Set(lista))


      this.setData({
        SelectionList: listb
      })


    },
    ServiceTypeSave() {
      console.log(this.data.SelectionList)
      this.triggerEvent('mytypeList', this.data.SelectionList);
      var pages = getCurrentPages();

      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

      prevPage.setData({

        'shoplista.serv_type': JSON.stringify(this.data.SelectionList.map(item=>item.id))

      })
      wx.navigateBack({
        
      })
    },
    ServiceTypeCancel() {
      wx.navigateTo({
        url: '../DowCenter',
      })
    },
  },
  created() {
    app.$request('/index/serviceType', 'POST', {}).then(res => {
      this.setData({
        CandidateList: res.data
      })
    })
  }
})
// pages/index/HomeCompont/servicedetails/comments/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selecttype: 0,
    currentIndex: 0,
    commentcheck: false,
    iscommentreply: false,
    Huifapjid: '',
    Huifapjcontent: '',
    evalistA: [],
    evalistB: [],
    evalistC: [],
    evalistD: [],
    typelist: [{
        id: 1,
        typename: '清洁清洗'
      },
      {
        id: 2,
        typename: '月嫂'
      }, {
        id: 3,
        typename: '育儿嫂'
      }, {
        id: 4,
        typename: '保姆'
      }, {
        id: 5,
        typename: '日常保洁'
      }, {
        id: 6,
        typename: '油烟机清洗'
      }, {
        id: 7,
        typename: '全屋大扫除'
      }

    ]
  },

  userReply(e) {

    this.setData({
      Huifapjid: e.currentTarget.dataset.id,
      iscommentreply: !this.iscommentreply
    })

  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      Huifapjcontent: e.detail.value
    })
  },
  checktype(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      selecttype: e.currentTarget.dataset.index,

    })

  },
  Huifeva() {
    console.log(1);
    
    this.setData({
      iscommentreply: false
    })
    app.$request('/shop/reply', 'POST', {
      id: this.data.Huifapjid,
      reply_content: this.data.Huifapjcontent
    }).then(res => {
      console.log(res);
    })
  },
  Huifevaqx(){
    this.setData({
      iscommentreply: false
    })
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.$request('/shop/evaluate', 'POST', {
      page: 1,
      pz: 999,
    }).then(res => {
      console.log(res);

      this.setData({
        evalistA: res.data.list
      })
    })
    app.$request('/shop/evaluate', 'POST', {
      page: 1,
      pz: 999,
      status: 1
    }).then(res => {
      console.log(res);

      this.setData({
        evalistB: res.data.list
      })
    })
    app.$request('/shop/evaluate', 'POST', {
      page: 1,
      pz: 999,
      status: 2
    }).then(res => {
      console.log(res);

      this.setData({
        evalistC: res.data.list
      })
    })
    app.$request('/shop/evaluate', 'POST', {
      page: 1,
      pz: 999,
      status: 3
    }).then(res => {
      console.log(res);

      this.setData({
        evalistD: res.data.list
      })
    })
  },
})
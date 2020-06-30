// pages/index/Navitem/Train/Train.js++
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keshi:'',
    palayvideo: '',
    onlinevideo: {},
    currentIndex: 1,
    CatalogSelect: 0,
    CatalogList: []

  },
  CatalogSelect(e) {
    console.log(e.currentTarget.dataset.url);

    this.setData({
      palayvideo: e.currentTarget.dataset.url,
      CatalogSelect: e.currentTarget.dataset.index
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
    console.log(options);

    console.log(options.id);
    let videoid = options.id
    app.$request('/train/onlineInfo', 'POST', {
      id: videoid
    }).then(res => {
      console.log(res.data.video.length);
      this.setData({
        onlinevideo: res.data,
        keshi:res.data.video.length
      })
    })

  },
})
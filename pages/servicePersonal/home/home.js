// pages/servicePersonal/home/home.js
const app = getApp()
var bmap = require('../../../utils/bmap-wx.min');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workcondition: 1,
    currentIndex: 1,
    orders: null,
    orderlist: [], //新服务
    orderlistA: [], //待上门
    orderlistB: [], //服务中
    markers: '',
    latitude: '',
    longitude: '',
    rgcData: {}
  },
  onPullDownRefresh: function () {
   this.content()
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      rgcData: {
        address: '地址：' + data[i].address + '\n',
        desc: '描述：' + data[i].desc + '\n',
        business: '商圈：' + data[i].business
      }
    });
    console.log(this.data.rgcData)
  },
  //开始服务
  startService(e) {
    let orders = e.currentTarget.dataset.ordernos
    app.$request('/staff_order/start', 'POST', {
      order_no: orders
    }).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '开始服务',
          icon: 'none ',
          duration: 2000
        })
        this.content()
      }

    },err=>{
      console.log(err);
      
    })
  },
  // 服务完成、
  serviceComplete(e) {

    let orders = e.currentTarget.dataset.ordernos
    app.$request('/staff_order/end', 'POST', {
      order_no: orders
    }).then(res => {
      console.log(res);
      
      if (res.code == 1) {
        wx.showToast({
          title: '服务已完成',
          icon: 'none ',
          duration: 2000
          
        })
        this.content()
      }

    }, err=>{
      wx.showToast({
        title: err.code,
        icon: 'none ',
        duration: 2000
      })
      
    })
  },


  Arrived(e) {
    let orders = e.currentTarget.dataset.ordernos
    console.log(orders);
    this.setData({
      orders: e.currentTarget.dataset.ordernos
    })
    app.$request('/staff_order/arrive', 'POST', {
      order_no: this.data.orders
    }).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '已到达开始工作',
          icon: 'success',
          duration: 2000
        })
        this.content()
      }

    })


  },


  jieOrder(e) {
    let orders = e.currentTarget.dataset.orderno
    app.$request('/staff_order/receiving', 'POST', {
      order_no: orders
    }).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '接单成功',
          icon: 'success',
          duration: 2000
        })
        this.content()
      }

    })


  },
  workconditionSelect(e) {
    // console.log(e.currentTarget.dataset.id);

    this.setData({
      workcondition: e.currentTarget.dataset.id
    })


  },
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
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'O9vqEyUIZv2ZCN0GttsxoWDYFa4Hixh1'
    });

    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data)
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData[0].address
      });
    }
    // 发起regeocoding检索请求 



    setInterval(() => {
      BMap.regeocoding({
        fail: fail,
        success: success,
        iconPath: '../../img/marker_red.png',
        iconTapPath: '../../img/marker_red.png'
      });
    }, 3000000)
this.content()
  },


content(){










    //新服务
    app.$request('/staff_order/index', 'POST', {
      page: 1,
      pz: 999,
      status: 1
    }).then(res => {
      console.log(res);

      this.setData({
        orderlist: res.data.list
      })

    })
    //待上门
    app.$request('/staff_order/index', 'POST', {
      page: 1,
      pz: 999,
      status: 2
    }).then(res => {
      console.log(res);

      this.setData({
        orderlistB: res.data.list
      })

    })
    //服务中
    app.$request('/staff_order/index', 'POST', {
      page: 1,
      pz: 999,
      status: 3
    }).then(res => {
      console.log(res);

      this.setData({
        orderlistC: res.data.list
      })

    })






},

onShow: function () {
  this.content()
},





})
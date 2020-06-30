//app.js
import $time from './utils/time.js'
import $request from './utils/api.js'

App({
onLaunch: function () {
var that = this;
wx.getSystemInfo({
success: function (e) {
var a = e.model;
if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1) { //是不是包含iphoneX
that.globalData.isIphoneX = true
} else {
that.globalData.isIphoneX = false
}
}
})
},
globalData: {
isIphoneX: false,
region: ['广东省', '广州市', '梅州'],
URl:"https://wuhua.mrhkj.com",
uploadsImgURl:"https://wuhua.mrhkj.com/wuhuaapi/common/uploads_img",
staffid:null
},

$request: $request,
$time:$time
})
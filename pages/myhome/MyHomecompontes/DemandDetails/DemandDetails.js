// pages/myhome/MyHomecompontes/DemandDetails/DemandDetails.js
const app = getApp()
Page({
  data: {
    demanddelist:{}
  },
  onLoad: function (options) {
app.$request('/demand/info', 'POST', {
id:options.id
}).then(res => {
  console.log(res);
 this.setData({
  demanddelist:res.data
 })
})
  },
})
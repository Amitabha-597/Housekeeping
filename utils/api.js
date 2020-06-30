const baseUrl = 'https://wuhua.mrhkj.com/wuhuaapi'

import {
hexMD5
} from "./md5.js"
//随机字符串
function makeid(length = 8) {
var result = ''
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
var charactersLength = characters.length;
for (var i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() * charactersLength))
}
return result
}
let str = makeid()
//参数query
let query = 'app_id=aminmbfnhcrfnoesheoi&app_key=fpfqFCldavpHcEwkGGgwypIheGGnirxp&random=' + str

let sign = hexMD5(query).toUpperCase()
const $request = (url, method = 'POST', data, contentType = 2) => {
let contentTypes = contentType == 1 ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded'
return new Promise(function (resolve, reject) {
wx.request({
url: baseUrl + url,
method: method,
data: data,
header: {
'Content-Type': contentTypes,
'sign': sign,
'random': str,
'openid': wx.getStorageSync('openid'),
'token': wx.getStorageSync('token')
},
success: function (res) {
if (res.data.code == 1) {
  if(res.data.data.token){
    var token = res.data.data.token;
    wx.setStorageSync('token',token)
  }
resolve(res.data)
} else {
reject(res.data)
}
},
fail: function (e) {
reject(e)
}
})
})
}

// 封装的请求方法需要暴露出去
module.exports = $request
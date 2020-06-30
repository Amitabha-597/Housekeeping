const app = getApp()
Page({


    data: {
        userInfo: {}, //聊天用户信息
        showActionsheet: false,
        serviceType: '',
        writer: {},
        groups: []
    },
    callme(e) {
        console.log(e.currentTarget.dataset.tel);
        let tel = e.currentTarget.dataset.tel
        wx.makePhoneCall({
            phoneNumber: tel
        })
    },
    onLoad(option) {

        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        })



        // 首页金牌员工信息
        app.$request('/index/userInfo', 'POST', {
            // id:option.id
            id: option.id
        }).then(res => {
            console.log(res.data.id);
            app.globalData.staffid = res.data.id
            this.setData({
                writer: res.data
            })
        })
        app.$request('/index/serviceType', 'POST', {}).then(res => {
            console.log(res.data)
            this.setData({
                serviceType: res.data
            })
        })

    },
    close: function () {
        this.setData({
            showActionsheet: true
        })
    },
    btnClick(e) {
        var _this = this
        console.log(e.detail.index);
        let type_id = e.detail.index

        wx.navigateTo({
            url: '/pages/index/HomeCompont/ConfirmOrder/index?type_id='+ type_id,
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                acceptDataFromOpenedPage: function (data) {
                    console.log(data)
                },
                someEvent: function (data) {
                    console.log(data)
                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('', {
                    data: 'test'
                })
            }
        });

        this.close()
    },
    showAct() {
        this.setData({
            showActionsheet: true
        })
    },


})
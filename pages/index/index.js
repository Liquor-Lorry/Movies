//index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'Lorry',
    userInfo: {},
    isShow: true
  },
  handleClick(){
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  onLoad: function (options) {
    //console.log(this)

    this.getUserInfo() 
  },
  getUserInfo() {
    //判断用户是否授权
    wx.getSetting({
      success: (data) => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          //用户已授权 显示授权按钮
          this.setData({
            isShow: false
          })
        } else {
          //用户未授权 隐藏授权按钮
          this.setData({
            isShow: true
          })
        }
      }
    })

    // 获取用户登录信息
    wx.getUserInfo({
      success: (data) => {
        //console.log(data)
        //更新data中的userInfo
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: (err) => {
        //console.log(err)
      }
    })
  },
  handleGetUserInfo(data) {
    //console.log(data, '用户点击了')
    //判断用户点击的是否是允许
    if(data.detail.rawData){
      //用户点击的是允许，刷新页面
      this.getUserInfo() 
    }
  }
})

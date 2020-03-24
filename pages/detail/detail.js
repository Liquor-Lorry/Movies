// pages/detail/detail.js

let datas = require('../../datas/list-data.js')

let app = getApp()

Page({
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },
  onLoad: function (options) {
    //console.log(options)
    //获取参数值
    let index = options.index
    //更新data中detailObj的状态值
    this.setData({
      detailObj: datas.list_data[index],
      index
    })

    //根据本地缓存的数据判断用户是否收藏当前文章
    let detatlStorage = wx.getStorageSync('isCollected')
    console.log(detatlStorage)

    //预处理，判断收藏是否为空
    if (!detatlStorage){
      //在缓存中初始化空对象
      wx.setStorageSync('isCollected', {})
    }

    //判断用户是否收藏
    if (detatlStorage[index]){//收藏过
      this.setData({
        isCollected: true
      })
    }

    //监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放')
      //修改isMisicPlay状态值
      this.setData({
        isMusicPlay: true
      })

      //修改app里面的数据
      app.data.isPlay = true
      app.data.pageIndex = index
    })

    //判断音乐是否在播放
    if(app.data.isPlay && app.data.pageIndex === index){
      //修改isMisicPlay状态值
      this.setData({
        isMusicPlay: true
      })
    }

    //监听音乐暂停
    wx.onBackgroundAudioPause(() => {
      console.log('音乐暂停')
      //修改isMisicPlay状态值
      this.setData({
        isMusicPlay: false
      })

      //修改app里面的数据
      app.data.isPlay = false
      //app.data.pageIndex = index
    })
  },
  handleCollection() {
     let isCollected = !this.data.isCollected
     //更新状态
     this.setData({
       isCollected
     })
     //提示用户
     let title = isCollected ? '收藏成功' : '取消收藏'
     wx.showToast({
       title,
       icon: 'success'
     })
     //缓存到本地(保留收藏状态)
     //{1:true, 2:false}
    let { index } = this.data
    //不可行，会覆盖前面的状态
    //let obj = {}
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => {
        let obj = datas.data
        obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('缓存成功')
          }
        })
      }
    })
  },
  handleMusicPlay() {
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })

    //控制音乐播放
    if(isMusicPlay){
      //播放音乐
      let { dataUrl, title } = this.data.detailObj.music
      //console.log(dataUrl, title)
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      //暂停音乐
      wx.pauseBackgroundAudio()
    }
  },
  //点击分享功能
  handleShare() {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到微博', '分享到好友'],
    })
  }
})
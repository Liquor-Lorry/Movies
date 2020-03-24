// pages/movieDetail/movieDetail.js

const app = getApp()
console.log(app)

Page({
  data: {
    movieDetail: {}
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      movieDetail: app.data.moviesArr[options.index]
    })
  }
})
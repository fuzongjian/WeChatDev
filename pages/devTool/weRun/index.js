// pages/devTool/weRun/index.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const werun = require('../../../utils/werun.js')
const util = require('../../../utils/util.js')
import * as echarts from '../../../ec-canvas/echarts.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps: [],
    tabs: ["表格展示", "Echart展示"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    ec:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '微信运动',
      success: ()=>{},
      fail: (err)=>{ console.log(err.errMsg) }
    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    // 登录拿到code
    wx.login({
      success: (res)=>{
        // 拿到运动的encryptedData数据
        wx.getWeRunData({
          success: (re)=>{
            let body = {
              code: res.code,
              encryptedData: re.encryptedData,
              iv: re.iv
            }
            let url = 'http://192.168.50.199:1110/wx/auth'
            wx.request({
              url: url,
              method: 'POST',
              data: body,
              success: (res)=>{
                let datajson = res.data.stepInfoList
                var array = []
                for(var i = 0; i < datajson.length; i ++){
                  var item = datajson[i]
                  var time = item.timestamp
                  time = util.beautifyTime(time * 1000)
                  var obj = {
                    time: time,
                    step: item.step
                  }
                  array.push(obj)
                }
                this.setData({ steps: array })
              },
              fail: (err)=>{
                console.log(err.errMsg)
              }
            })
          }
        })
        console.log(res)
      },
      fail: (err)=>{

      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})